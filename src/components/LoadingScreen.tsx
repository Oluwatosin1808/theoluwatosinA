import React, { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import Character3D from './Character3D';

/**
 * Boot screen — shown while the site (and above all the 8 MB 3D model) loads.
 *
 * The character itself is the hero of the screen: a live <Character3D />
 * follows your cursor while a blocky, pixel-art progress bar tracks the real
 * GLB load via drei's useProgress. Dismisses itself once the model is ready
 * (or after a hard timeout, so a failed download can never trap the visitor).
 */

const MONO = "'Space Mono', monospace";
const CAB = "'Cabinet Grotesk', sans-serif";

const MIN_MS = 2100; // let the model actually show for a beat
const MAX_MS = 9000; // hard cap — never block the site on a stalled asset
const BLOCKS = 40;

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { progress, active } = useProgress();
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const startRef = useRef<number>(performance.now());
  const finishedRef = useRef(false);

  // apply the saved theme early so the boot screen matches the site
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ot-theme');
      if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved);
    } catch {
      /* ignore */
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // dismiss when loaded (with a minimum show) or when the timeout hits
  useEffect(() => {
    const id = window.setInterval(() => {
      if (finishedRef.current) return;
      const elapsed = performance.now() - startRef.current;
      const loaded = progress >= 100 && !active;
      if ((loaded && elapsed >= MIN_MS) || elapsed >= MAX_MS) {
        finishedRef.current = true;
        setPhase('out');
        window.setTimeout(onDone, 700);
      }
    }, 120);
    return () => window.clearInterval(id);
  }, [progress, active, onDone]);

  const pct = Math.max(0, Math.min(100, Math.round(progress)));
  const filled = Math.round((pct / 100) * BLOCKS);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`v2-boot${phase === 'out' ? ' v2-boot--out' : ''}`}
      style={{ fontFamily: MONO }}
    >
      <style>{BOOT_CSS}</style>

      {/* chrome */}
      <div className="v2-boot-top">
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: CAB, fontWeight: 800, fontSize: 19, color: '#e9eaee', letterSpacing: '-.02em' }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, background: '#2f6bff', animation: 'otb-blink 1.6s steps(2) infinite' }} />
          Oluwatosin
        </span>
        <span className="v2-boot-mono">PORTFOLIO · v2.026</span>
      </div>

      {/* the 3D model, live */}
      <div className="v2-boot-stage">
        <span className="v2-boot-corner tl" />
        <span className="v2-boot-corner tr" />
        <span className="v2-boot-corner bl" />
        <span className="v2-boot-corner br" />
        <div className="v2-boot-grid" />
        <Character3D showStatus={false} />
      </div>

      {/* pixel progress */}
      <div className="v2-boot-progress">
        <div className="v2-boot-row">
          <span>loading tosin-model.glb</span>
          <span style={{ color: '#2f6bff' }}>{String(pct).padStart(3, '0')}%</span>
        </div>
        <div className="v2-boot-blocks" aria-hidden="true">
          {Array.from({ length: BLOCKS }, (_, i) => (
            <i key={i} className={i < filled ? 'on' : ''} />
          ))}
        </div>
        <div className="v2-boot-row" style={{ opacity: 0.55 }}>
          <span>{active ? 'streaming assets…' : pct >= 100 ? 'ready' : 'stand by'}</span>
          <span>{active ? 'RECEIVING' : pct >= 100 ? 'OK' : 'IDLE'}</span>
        </div>
      </div>

      <div className="v2-boot-bottom">
        <span>PRODUCT DESIGN · FRONTEND · 3D</span>
        <span style={{ animation: 'otb-blink 1.4s steps(2) infinite' }}>ENTERING…</span>
      </div>
    </div>
  );
}

const BOOT_CSS = `
@keyframes otb-blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes otb-bootfade{from{opacity:0;transform:scale(1.015)}to{opacity:1;transform:none}}
@keyframes otb-grid{from{background-position:0 0}to{background-position:0 44px}}
@keyframes otb-glow{0%,100%{opacity:.75}50%{opacity:1}}
.v2-boot{position:fixed;inset:0;z-index:300;background:#0f1115;color:#e9eaee;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:clamp(16px,3vw,28px) clamp(16px,4vw,40px);animation:otb-bootfade .5s ease both;transition:opacity .65s ease,transform .65s ease;overflow:hidden}
.v2-boot--out{opacity:0;transform:scale(1.02);pointer-events:none}
.v2-boot-top,.v2-boot-bottom{display:flex;justify-content:space-between;align-items:center;width:100%;gap:12px;z-index:2}
.v2-boot-mono{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#757985}
.v2-boot-bottom{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#757985;border-top:1px solid rgba(233,234,238,.12);padding-top:14px}
.v2-boot-stage{position:relative;width:min(88vw,430px);height:min(46vh,400px);border:1px solid rgba(233,234,238,.14);background:radial-gradient(120% 90% at 50% 12%,#1a1d24 0%,#15171d 60%,#0f1115 100%);overflow:hidden;flex:none;margin:clamp(8px,2vh,24px) 0}
.v2-boot-corner{position:absolute;width:14px;height:14px;z-index:3}
.v2-boot-corner.tl{top:-1px;left:-1px;border-top:2px solid #2f6bff;border-left:2px solid #2f6bff}
.v2-boot-corner.tr{top:-1px;right:-1px;border-top:2px solid #2f6bff;border-right:2px solid #2f6bff}
.v2-boot-corner.bl{bottom:-1px;left:-1px;border-bottom:2px solid #2f6bff;border-left:2px solid #2f6bff}
.v2-boot-corner.br{bottom:-1px;right:-1px;border-bottom:2px solid #2f6bff;border-right:2px solid #2f6bff}
.v2-boot-grid{position:absolute;left:-30%;right:-30%;bottom:-4%;height:55%;background-image:linear-gradient(rgba(47,107,255,.34) 1px,transparent 1px),linear-gradient(90deg,rgba(47,107,255,.34) 1px,transparent 1px);background-size:44px 44px;animation:otb-grid 5s linear infinite;transform:perspective(520px) rotateX(64deg);transform-origin:50% 100%;opacity:.5;pointer-events:none;mask-image:linear-gradient(to top,#000 6%,transparent 76%);-webkit-mask-image:linear-gradient(to top,#000 6%,transparent 76%);z-index:1}
.v2-boot-progress{width:min(88vw,430px);z-index:2}
.v2-boot-row{display:flex;justify-content:space-between;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#aeb1bb;margin-bottom:8px}
.v2-boot-blocks{display:grid;grid-template-columns:repeat(${BLOCKS},1fr);gap:3px;margin-bottom:8px}
.v2-boot-blocks i{height:13px;background:rgba(233,234,238,.1);transition:background .12s steps(2),transform .12s steps(2)}
.v2-boot-blocks i.on{background:#2f6bff;transform:scaleY(1.35)}
@media (max-width:520px){
  .v2-boot-blocks i{height:10px}
  .v2-boot-stage{height:min(40vh,340px)}
}
@media (prefers-reduced-motion: reduce){
  .v2-boot,.v2-boot--out{transition:none;animation:none}
  .v2-boot-grid,.v2-boot-blocks i.on{animation:none;transition:none}
}
`;
