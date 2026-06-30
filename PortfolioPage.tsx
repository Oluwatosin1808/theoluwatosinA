import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToolItem = {
  name: string;
  icon: string;
  group: string;
};

const roles = ["Product Designer", "No-Code Developer", "Frontend Developer"];

const tools: ToolItem[] = [
  { name: "Figma", icon: "figma", group: "Design" },
  { name: "FigJam", icon: "figjam", group: "Design" },
  { name: "Bubble", icon: "bubble", group: "No-Code / Builders" },
  { name: "Webflow", icon: "webflow", group: "No-Code / Builders" },
  { name: "Framer", icon: "framer", group: "No-Code / Builders" },
  { name: "FlutterFlow", icon: "flutter", group: "No-Code / Builders" },
  { name: "Next.js", icon: "nextdotjs", group: "Frontend" },
  { name: "HTML", icon: "html5", group: "Frontend" },
  { name: "CSS", icon: "css3", group: "Frontend" },
  { name: "JavaScript", icon: "javascript", group: "Frontend" },
  { name: "Airtable", icon: "airtable", group: "Automation & Data" },
  { name: "Make", icon: "make", group: "Automation & Data" },
  { name: "REST APIs", icon: "postman", group: "Automation & Data" }
];

const duplicatedTools = [...tools, ...tools];

export default function PortfolioPage() {
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="portfolio-root">
      <style>{pageStyles}</style>
      <main className="main">
        <header className="hero" id="hero">
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.21, 0.61, 0.35, 1] as const }}
            >
              <p className="intro">Hey, I&apos;m</p>
              <h1 className="name">Oluwatosin</h1>
              <h2 className="role" aria-live="polite">
                <span className="role-wrapper">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roles[roleIndex]}
                      className="role-text"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>
              <p className="supporting">
                I design and build scalable, user-focused digital products from concept to production.
              </p>
              <div className="role-ats">
                Product Designer • No-Code Developer • Frontend Developer
              </div>
              <div className="cta-row">
                <a className="cta primary" href="#work">
                  View Work
                </a>
                <a className="cta secondary" href="#contact">
                  Work With Me
                </a>
              </div>
              <div className="location">
                <span className="location-label">Living in</span>
                <span className="location-value">Nigeria</span>
              </div>
            </motion.div>
            <motion.div
              className="hero-globe"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.21, 0.61, 0.35, 1] as const }}
            >
              <GlobeCanvas />
            </motion.div>
          </div>
        </header>

        <section className="seo-block">
          <p>
            Product Designer and Frontend Developer specializing in UI/UX design, no-code development,
            and modern web applications using Bubble, Webflow, Framer, and Next.js.
          </p>
        </section>

        <section className="tools" id="tools">
          <div className="tools-header">
            <h3>Tools I Work With</h3>
            <p>
              Designing, building, and shipping products using modern tools and frameworks.
            </p>
          </div>
          <div className="carousel">
            <div className="carousel-track">
              {duplicatedTools.map((tool, index) => (
                <div className="tool-card" key={`${tool.name}-${index}`}>
                  <div className="tool-icon" aria-hidden="true">
                    <img
                      src={`https://cdn.simpleicons.org/${tool.icon}/1a1a1a`}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div className="tool-meta">
                    <span className="tool-name">{tool.name}</span>
                    <span className="tool-group">{tool.group}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function GlobeCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let renderer: any;
    let scene: any;
    let camera: any;
    let sphere: any;
    let ring: any;
    let marker: any;
    let frameId = 0;
    let rotationSpeed = 0.002;
    let disposed = false;

    const init = async () => {
      try {
        const THREE = await import("three");
        if (!canvasRef.current || !containerRef.current) {
          return;
        }

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
          alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 3.2);

        const ambient = new THREE.AmbientLight(0xffffff, 0.75);
        const directional = new THREE.DirectionalLight(0xffffff, 0.55);
        directional.position.set(3, 2, 4);
        scene.add(ambient, directional);

        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const texture = new THREE.TextureLoader().load(
          "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
        );
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.9,
          metalness: 0.1
        });
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const markerPosition = latLongToVector3(9.082, 8.6753, 1.02);
        const markerGeometry = new THREE.SphereGeometry(0.035, 18, 18);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: "#f5b94a" });
        marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(markerPosition.x, markerPosition.y, markerPosition.z);
        scene.add(marker);

        const ringGeometry = new THREE.RingGeometry(0.05, 0.085, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: "#f5b94a",
          transparent: true,
          opacity: 0.55,
          side: THREE.DoubleSide
        });
        ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.copy(marker.position);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(ring);

        const resize = () => {
          if (!containerRef.current) return;
          const nextWidth = containerRef.current.clientWidth;
          const nextHeight = containerRef.current.clientHeight;
          renderer.setSize(nextWidth, nextHeight);
          camera.aspect = nextWidth / nextHeight;
          camera.updateProjectionMatrix();
        };

        const observer = new ResizeObserver(resize);
        observer.observe(containerRef.current);

        const animate = () => {
          if (disposed) return;
          sphere.rotation.y += rotationSpeed;
          sphere.rotation.x = -0.2;
          ring.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.08);
          ring.material.opacity = 0.35 + Math.sin(Date.now() * 0.002) * 0.15;
          renderer.render(scene, camera);
          frameId = requestAnimationFrame(animate);
        };

        const handleEnter = () => {
          rotationSpeed = 0.0008;
        };

        const handleLeave = () => {
          rotationSpeed = 0.002;
        };

        containerRef.current.addEventListener("mouseenter", handleEnter);
        containerRef.current.addEventListener("mouseleave", handleLeave);

        animate();
        setReady(true);

        return () => {
          observer.disconnect();
          containerRef.current?.removeEventListener("mouseenter", handleEnter);
          containerRef.current?.removeEventListener("mouseleave", handleLeave);
        };
      } catch (error) {
        setReady(false);
      }
    };

    let cleanup: (() => void) | undefined;
    init().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    return () => {
      disposed = true;
      if (cleanup) cleanup();
      if (frameId) cancelAnimationFrame(frameId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div className="globe-shell" ref={containerRef}>
      <canvas ref={canvasRef} className="globe-canvas" aria-hidden="true" />
      {!ready && <div className="globe-fallback" aria-hidden="true" />}
      <div className="globe-caption">
        <span className="pulse" aria-hidden="true" />
        Nigeria Highlight
      </div>
    </div>
  );
}

function latLongToVector3(latitude: number, longitude: number, radius: number) {
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 180) * (Math.PI / 180);
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    z: radius * Math.sin(phi) * Math.sin(theta),
    y: radius * Math.cos(phi)
  };
}

const pageStyles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap');

:root {
  color-scheme: light;
}

* {
  box-sizing: border-box;
}

.portfolio-root {
  font-family: 'Manrope', system-ui, sans-serif;
  background: radial-gradient(circle at 10% 10%, #f8f1e8 0%, #f5f4f0 42%, #eff2f0 100%);
  color: #191919;
  min-height: 100vh;
  padding: 0 1.5rem 5rem;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  padding: 4.5rem 0 2rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  align-items: center;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.intro {
  font-size: 1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #5b5b5b;
  margin: 0;
}

.name {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.role {
  margin: 0;
  font-size: clamp(1.8rem, 3.4vw, 2.6rem);
  font-weight: 600;
  color: #1f1f1f;
}

.role-wrapper {
  display: inline-flex;
  position: relative;
  height: 1.3em;
  min-width: 16ch;
  overflow: hidden;
  align-items: center;
}

.role-text {
  position: absolute;
  left: 0;
  right: 0;
}

.supporting {
  font-size: 1.05rem;
  color: #404040;
  max-width: 480px;
  margin: 0;
  line-height: 1.6;
}

.role-ats {
  font-size: 0.95rem;
  color: #6a6a6a;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cta {
  text-decoration: none;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta.primary {
  background: #f5b94a;
  color: #1b1b1b;
  box-shadow: 0 16px 30px rgba(245, 185, 74, 0.3);
}

.cta.secondary {
  border: 1px solid #1b1b1b;
  color: #1b1b1b;
  background: rgba(255, 255, 255, 0.6);
}

.cta:hover {
  transform: translateY(-2px);
}

.location {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 600;
}

.location-label {
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #6a6a6a;
}

.location-value {
  font-size: 1.1rem;
}

.hero-globe {
  display: flex;
  justify-content: center;
  align-items: center;
}

.globe-shell {
  position: relative;
  width: min(420px, 90vw);
  aspect-ratio: 1 / 1;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
  border-radius: 36px;
  padding: 1.2rem;
  box-shadow: 0 24px 60px rgba(25, 25, 25, 0.12);
  overflow: hidden;
}

.globe-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.globe-fallback {
  position: absolute;
  inset: 1.2rem;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #f5f2ea, #b0c4d4 68%, #6e7e8b 100%);
  animation: float 4s ease-in-out infinite;
}

.globe-caption {
  position: absolute;
  bottom: 1.2rem;
  left: 1.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #4d4d4d;
  background: rgba(255, 255, 255, 0.6);
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

.globe-caption .pulse {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #f5b94a;
  box-shadow: 0 0 0 6px rgba(245, 185, 74, 0.2);
  animation: pulse 2.4s ease-in-out infinite;
}

.seo-block {
  max-width: 760px;
  margin-top: 1.5rem;
  padding: 1rem 0 3.5rem;
  color: #6b6b6b;
  font-size: 0.95rem;
  line-height: 1.6;
}

.tools {
  padding: 2rem 0 4rem;
}

.tools-header h3 {
  margin: 0 0 0.6rem;
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  font-family: 'Bricolage Grotesque', sans-serif;
}

.tools-header p {
  margin: 0 0 2rem;
  max-width: 620px;
  color: #5a5a5a;
}

.carousel {
  overflow: hidden;
  position: relative;
  padding: 0.5rem 0;
}

.carousel-track {
  display: flex;
  gap: 1.2rem;
  width: max-content;
  animation: scroll 18s linear infinite;
}

.carousel:hover .carousel-track {
  animation-play-state: paused;
}

.tool-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 1.2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 18px;
  min-width: 210px;
  box-shadow: 0 10px 24px rgba(25, 25, 25, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.tool-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(245, 185, 74, 0.16);
}

.tool-icon img {
  width: 22px;
  height: 22px;
}

.tool-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.tool-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.tool-group {
  font-size: 0.75rem;
  color: #6b6b6b;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 185, 74, 0.45);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(245, 185, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 185, 74, 0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@media (max-width: 720px) {
  .hero {
    padding: 3.5rem 0 1.5rem;
  }

  .cta-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .globe-shell {
    width: min(360px, 90vw);
  }

  .carousel-track {
    animation-duration: 22s;
  }
}
`;
