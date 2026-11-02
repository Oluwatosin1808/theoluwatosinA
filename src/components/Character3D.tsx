import React, { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Lightformer,
  useAnimations,
  useGLTF,
  useProgress,
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * Interactive 3D character (react-three-fiber).
 *
 * Interactions:
 *  - gaze:   head + neck bones and eye morphs follow the cursor (with idle wander)
 *  - blink:  procedural `eyesClosed` blink loop
 *  - drag:   horizontal drag rotates the model (touch-action: pan-y keeps scroll)
 *  - click:  smile / squint / nod reaction envelope
 *  - hover:  subtle brow raise + smile so it "acknowledges" the cursor
 */

const MONO = "'Space Mono', monospace";
const MODEL_SRC = '/models/tosin-model.glb';

useGLTF.preload(MODEL_SRC);

// ── shared interaction state ────────────────────────────────────────────────
// DOM handlers write into `inter`, the frame loop reads it. Module-level so
// handlers live outside the Canvas.
type Inter = {
  rotY: number;
  targetRotY: number;
  vel: number;
  dragging: boolean;
  lastX: number;
  moved: number;
  gx: number; // gaze target x (-1..1)
  gy: number; // gaze target y (-1..1, up positive)
  lastMove: number; // performance.now() of last pointer move
  hover: boolean;
  clickAt: number;
};

const inter: Inter = {
  rotY: 0,
  targetRotY: 0,
  vel: 0,
  dragging: false,
  lastX: 0,
  moved: 0,
  gx: 0,
  gy: 0,
  lastMove: -1e9,
  hover: false,
  clickAt: -1e9,
};

// smoothed gaze + idle wander targets
const gaze = { x: 0, y: 0 };
const wander = { x: 0, y: 0, at: 0 };
const smooth = { hover: 0 };

const clamp = (v: number, lo = -1, hi = 1) => (v < lo ? lo : v > hi ? hi : v);
const smoothstep = (t: number) => {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};

// procedural blink (async from anything else — keeps it alive)
const blinkState = { start: -1, next: 1400 + Math.random() * 2600 };
function blinkValue(now: number): number {
  if (blinkState.start < 0) {
    if (now < blinkState.next) return 0;
    blinkState.start = now;
  }
  const e = (now - blinkState.start) / 175; // full blink ~175ms
  if (e >= 1) {
    blinkState.start = -1;
    blinkState.next = now + 2100 + Math.random() * 4300;
    return 0;
  }
  // quick close (first 42%), slower open
  return e < 0.42 ? smoothstep(e / 0.42) : 1 - smoothstep((e - 0.42) / 0.58);
}

// click reaction envelope: fast attack, ~1s decay
function clickEnvelope(now: number): number {
  const el = (now - inter.clickAt) / 1000;
  if (el < 0 || el > 1.05) return 0;
  if (el < 0.09) return el / 0.09;
  if (el < 0.3) return 1;
  return 1 - (el - 0.3) / 0.75;
}

// ── camera framing (matches the old model-viewer orbit: 8° 86° fov 32) ──────
const HEAD_PITCH_SIGN = -1;
const HEAD_YAW_SIGN = 1;

function fitCamera(camera: THREE.PerspectiveCamera, modelSize: THREE.Vector3, vw: number, vh: number) {
  const fov = 32;
  const aspect = vw / Math.max(1, vh);
  const vFit = modelSize.y * 0.5 / Math.tan(THREE.MathUtils.degToRad(fov) * 0.5);
  const hFov = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(fov) * 0.5) * aspect);
  const hFit = Math.max(modelSize.x, modelSize.z) * 0.5 / Math.tan(hFov * 0.5);
  const dist = Math.max(vFit, hFit) * 1.22;
  const theta = THREE.MathUtils.degToRad(8);
  const phi = THREE.MathUtils.degToRad(86);
  camera.fov = fov;
  camera.position.set(
    dist * Math.sin(phi) * Math.sin(theta),
    dist * Math.cos(phi),
    dist * Math.sin(phi) * Math.cos(theta)
  );
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
}

// ── the avatar ──────────────────────────────────────────────────────────────

function Avatar({ onMeasure, onReady }: { onMeasure: (size: THREE.Vector3) => void; onReady: () => void }) {
  const { scene, animations } = useGLTF(MODEL_SRC);
  const rootRef = useRef<THREE.Group>(null!);
  // note: useAnimations must be called before our own useFrame so the mixer
  // update is registered first and bones/morphs are overridden after it runs
  const { actions } = useAnimations(animations, rootRef);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const viewport = useThree((s) => s.size);

  // meshes with morph targets + head/neck bones + bind-pose quaternions
  const rigRef = React.useMemo(() => {
    const morphMeshes: THREE.Mesh[] = [];
    const bones: THREE.Bone[] = [];
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && m.morphTargetDictionary && m.morphTargetInfluences) morphMeshes.push(m);
      if ((o as THREE.Bone).isBone) bones.push(o as THREE.Bone);
    });
    // GLTFLoader sanitizes node names (e.g. "mixamorig:Head" → "mixamorig_Head"),
    // so match by the known spellings + a tolerant suffix fallback
    const pick = (key: string) =>
      bones.find((b) => b.name === 'mixamorig:' + key) ||
      bones.find((b) => b.name === 'mixamorig_' + key) ||
      bones.find((b) => b.name === 'mixamorig' + key) ||
      bones.find((b) => b.name.toLowerCase().endsWith('_' + key.toLowerCase())) ||
      bones.find((b) => b.name.toLowerCase() === key.toLowerCase());
    const head = pick('Head');
    const neck = pick('Neck');
    return { morphMeshes, head, neck };
  }, [scene]);
  const rig = rigRef;

  // play the idle clip
  useEffect(() => {
    const clip = animations[0];
    if (!clip) return;
    const action = actions[clip.name];
    action?.reset().play();
  }, [actions, animations]);

  // dev-only debug handle (tree-shaken out of production builds)
  useEffect(() => {
    if (!(import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV) return;
    (window as unknown as Record<string, unknown>).__char3d = {
      inter,
      gaze,
      rig,
      camera,
      modelSize: () => modelSize.current.toArray().map((n) => +n.toFixed(3)),
    };
    return () => {
      delete (window as unknown as Record<string, unknown>).__char3d;
    };
  }, [rig, camera]);

  // center model on origin, measure, frame camera
  const modelSize = useRef(new THREE.Vector3(1, 1, 1));
  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center); // GLTF root starts at 0 → now centered on origin
    scene.updateMatrixWorld(true);
    modelSize.current = size;
    fitCamera(camera, size, viewport.width, viewport.height);
    onMeasure(size);
    onReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  // refit on canvas resize
  useLayoutEffect(() => {
    fitCamera(camera, modelSize.current, viewport.width, viewport.height);
  }, [camera, viewport.width, viewport.height]);

  const setM = React.useCallback(
    (name: string, v: number) => {
      const meshes = rig.morphMeshes;
      for (let i = 0; i < meshes.length; i++) {
        const m = meshes[i];
        const idx = m.morphTargetDictionary![name];
        if (idx !== undefined) m.morphTargetInfluences![idx] = v;
      }
    },
    [rig]
  );

  const euler = React.useMemo(() => new THREE.Euler(), []);
  const quat = React.useMemo(() => new THREE.Quaternion(), []);
  const quatNeck = React.useMemo(() => new THREE.Quaternion(), []);

  useFrame((state, delta) => {
    const now = performance.now();
    const dt = Math.min(delta, 0.05);

    // ── drag rotation (inertia after release)
    if (!inter.dragging && inter.vel !== 0) {
      inter.targetRotY += inter.vel;
      inter.vel *= Math.pow(0.004, dt);
      if (Math.abs(inter.vel) < 2e-4) inter.vel = 0;
    }
    inter.rotY += (inter.targetRotY - inter.rotY) * Math.min(1, dt * 12);
    if (rootRef.current) rootRef.current.rotation.y = inter.rotY;

    // ── gaze target: pointer, or idle wander after ~3s without movement
    let tgx = inter.gx;
    let tgy = inter.gy;
    if (now - inter.lastMove > 3200 && !inter.dragging) {
      if (now >= wander.at) {
        wander.at = now + 1500 + Math.random() * 2600;
        wander.x = (Math.random() * 2 - 1) * 0.55;
        wander.y = (Math.random() * 2 - 1) * 0.3;
      }
      tgx = wander.x;
      tgy = wander.y;
    }
    const k = 1 - Math.exp(-dt * 4.2);
    gaze.x += (tgx - gaze.x) * k;
    gaze.y += (tgy - gaze.y) * k;
    const gx = clamp(gaze.x);
    const gy = clamp(gaze.y);

    smooth.hover += ((inter.hover ? 1 : 0) - smooth.hover) * Math.min(1, dt * 6);
    const hoverS = smooth.hover;
    const clickE = clickEnvelope(now);
    const blinkV = blinkValue(now);

    // ── facial morphs (applied by name; missing on some meshes is fine)
    setM('eyesClosed', blinkV);
    setM('eyeBlinkLeft', blinkV);
    setM('eyeBlinkRight', blinkV);

    setM('browInnerUp', 0.2 * hoverS + 0.1 * clickE);
    setM('browOuterUpLeft', 0.1 * hoverS + 0.14 * clickE);
    setM('browOuterUpRight', 0.1 * hoverS + 0.14 * clickE);
    setM('mouthSmile', 0.14 * hoverS + 0.55 * clickE);
    setM('eyeSquintLeft', 0.28 * clickE);
    setM('eyeSquintRight', 0.28 * clickE);
    setM('cheekSquintLeft', 0.2 * clickE);
    setM('cheekSquintRight', 0.2 * clickE);

    // eyes track the cursor
    const ex = gx * 0.5;
    const ey = gy * 0.45;
    setM('eyesLookUp', Math.max(0, ey));
    setM('eyesLookDown', Math.max(0, -ey));
    if (ex >= 0) {
      setM('eyeLookOutLeft', ex);
      setM('eyeLookInRight', ex);
      setM('eyeLookInLeft', 0);
      setM('eyeLookOutRight', 0);
    } else {
      const v = -ex;
      setM('eyeLookInLeft', v);
      setM('eyeLookOutRight', v);
      setM('eyeLookOutLeft', 0);
      setM('eyeLookInRight', 0);
    }

    // ── head/neck gaze layered on top of the animated pose (post-mixer)
    if (rig.head && rig.neck) {
      const nod = clickE > 0 ? Math.sin((now - inter.clickAt) * 0.02) * 0.09 * clickE : 0;
      euler.set(
        (gy * 0.16 + nod) * HEAD_PITCH_SIGN,
        gx * 0.3 * HEAD_YAW_SIGN,
        gx * 0.05 // slight curious tilt
      );
      quat.setFromEuler(euler);
      rig.head.quaternion.premultiply(quat);
      euler.set(gy * 0.06 * HEAD_PITCH_SIGN, gx * 0.11 * HEAD_YAW_SIGN, 0);
      quatNeck.setFromEuler(euler);
      rig.neck.quaternion.premultiply(quatNeck);
    }

    // subtle breathing sway (on top of the idle clip)
    if (rootRef.current) {
      rootRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.004 * modelSize.current.y;
    }
  });

  return <group ref={rootRef}>{scene ? <primitive object={scene} /> : null}</group>;
}

// ── error boundary (a broken model shouldn't take the page down) ────────────

class StageErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode; onError: () => void },
  { crashed: boolean }
> {
  state = { crashed: false };
  static getDerivedStateFromError() {
    return { crashed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.crashed ? this.props.fallback : this.props.children;
  }
}

// ── stage (DOM wrapper + canvas) ────────────────────────────────────────────

const chip = {
  show(text: string) {
    const c = document.getElementById('ot-chip');
    if (!c) return;
    c.textContent = text;
    c.dataset.on = '1';
    c.style.opacity = '1';
    c.style.transform = 'translate(-50%,-150%) scale(1)';
  },
  hide() {
    const c = document.getElementById('ot-chip');
    if (!c) return;
    c.dataset.on = '0';
    c.style.opacity = '0';
    c.style.transform = 'translate(-50%,-150%) scale(.6)';
  },
};

export default function Character3D() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [modelSize, setModelSize] = useState<THREE.Vector3 | null>(null);
  const [crashed, setCrashed] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(typeof document !== 'undefined' && !document.hidden);
  const { progress, active } = useProgress();

  const onMeasure = useCallback((s: THREE.Vector3) => setModelSize(s.clone()), []);
  const onReady = useCallback(() => setReady(true), []);

  // pause rendering when off-screen or tab hidden
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // global pointer tracking: gaze everywhere (attenuated outside the stage)
  // + drag rotation deltas + click detection
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = stageRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const nx = (e.clientX - cx) / Math.max(1, r.width * 0.5);
        const ny = -(e.clientY - cy) / Math.max(1, r.height * 0.5);
        // fade gaze to neutral once the cursor is far from the stage
        const ox = Math.max(0, Math.abs(e.clientX - cx) - r.width / 2) / (r.width * 0.85);
        const oy = Math.max(0, Math.abs(e.clientY - cy) - r.height / 2) / (r.height * 0.85);
        const att = 1 - Math.min(1, Math.max(ox, oy));
        inter.gx = clamp(nx) * att;
        inter.gy = clamp(ny) * att;
        inter.lastMove = performance.now();
      }
      if (inter.dragging) {
        const dx = e.clientX - inter.lastX;
        inter.lastX = e.clientX;
        inter.moved += Math.abs(dx);
        inter.targetRotY += dx * 0.0072;
        inter.vel = dx * 0.0055;
      }
    };
    const onUp = () => {
      if (!inter.dragging) return;
      inter.dragging = false;
      setDragging(false);
      if (inter.moved < 6) inter.clickAt = performance.now(); // a tap, not a drag
    };
    const onCancel = () => {
      // touch scroll took over — stop the drag without counting a click
      inter.dragging = false;
      setDragging(false);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    inter.dragging = true;
    inter.lastX = e.clientX;
    inter.moved = 0;
    inter.vel = 0;
    setDragging(true);
  };
  const onPointerEnter = () => {
    inter.hover = true;
    chip.show('drag · click it');
  };
  const onPointerLeave = () => {
    inter.hover = false;
    chip.hide();
  };

  const fallback = (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        color: 'var(--faint)',
      }}
    >
      3D stage offline
    </div>
  );

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label="Interactive 3D character — drag to rotate, click to make it smile"
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        touchAction: 'pan-y', // vertical page scroll still works on touch
        cursor: dragging ? 'grabbing' : 'grab',
        backgroundColor: 'transparent',
      }}
    >
      {!crashed && (
        <StageErrorBoundary fallback={fallback} onError={() => setCrashed(true)}>
          <Canvas
            dpr={[1, 1.75]}
            frameloop={inView && tabVisible ? 'always' : 'never'}
            gl={{
              antialias: true,
              alpha: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.08,
            }}
            camera={{ fov: 32, near: 0.1, far: 80, position: [0.5, 1.2, 7] }}
            style={{ position: 'absolute', inset: 0, touchAction: 'pan-y' }}
          >
            <Suspense fallback={null}>
              <Avatar onMeasure={onMeasure} onReady={onReady} />
              {modelSize && (
                <ContactShadows
                  position={[0, -modelSize.y / 2 + 0.01, 0]}
                  scale={Math.max(modelSize.x, modelSize.z) * 3.2}
                  blur={2.7}
                  far={modelSize.y * 0.9}
                  opacity={0.72}
                  resolution={516}
                  color="#000000"
                />
              )}
            </Suspense>

            {/* studio-style env lighting, baked locally (no network fetch) */}
            <Environment resolution={256} frames={1}>
              <color attach="background" args={['#15181f']} />
              <Lightformer form="rect" intensity={4} color="#ffffff" position={[0, 2.5, 4]} scale={[6, 6, 1]} />
              <Lightformer form="rect" intensity={2} color="#cfe0ff" position={[-4, 1.5, 1]} rotation={[0, Math.PI / 3, 0]} scale={[4, 5, 1]} />
              <Lightformer form="rect" intensity={1.6} color="#ffe4c4" position={[4, 2, -2]} rotation={[0, -Math.PI / 3, 0]} scale={[4, 5, 1]} />
              <Lightformer form="ring" intensity={2} color="#ffffff" position={[0, 5, -3]} rotation={[Math.PI / 2, 0, 0]} scale={4} />
            </Environment>
            <ambientLight intensity={0.4} />
            <directionalLight position={[2.2, 3.4, 3]} intensity={1.1} />
            <directionalLight position={[-3, 1.6, -2.4]} intensity={0.32} color="#9db8ff" />
          </Canvas>
        </StageErrorBoundary>
      )}

      {crashed && fallback}

      {!ready && !crashed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'grid',
            placeItems: 'center',
            pointerEvents: 'none',
            fontFamily: MONO,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--faint)',
                display: 'flex',
                gap: 8,
                alignItems: 'center',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'ot-blink 1.6s infinite' }} />
              loading tosin-model.glb{active ? ` · ${Math.round(progress)}%` : ''}
            </div>
            <div style={{ marginTop: 10, width: 150, height: 2, background: 'var(--line)', position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${Math.max(6, Math.min(100, progress))}%`,
                  background: 'var(--accent)',
                  transition: 'width .3s ease',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
