import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Detect low-end GPU: fewer cores or pixel ratio == 1 (non-retina) as proxy
const isLowEnd = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
  return cores <= 2;
};

export function BackgroundWebGL() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const lowEnd   = isLowEnd();
    const COUNT    = lowEnd ? 600 : 1200;      // fewer particles on weak devices
    const PR       = Math.min(window.devicePixelRatio, lowEnd ? 1 : 1.5);
    const FPS_CAP  = lowEnd ? 30 : 60;         // 30fps cap on low-end
    const INTERVAL = 1000 / FPS_CAP;

    // Scene
    const scene  = new THREE.Scene();
    scene.fog    = new THREE.FogExp2(0x0a0a0a, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',   // ask browser to use iGPU when possible
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(PR);
    mountRef.current.appendChild(renderer.domElement);

    // Particles
    const geo  = new THREE.BufferGeometry();
    const pos  = new Float32Array(COUNT * 3);
    const scale = new Float32Array(COUNT);

    for (let i = 0; i < COUNT * 3; i++) pos[i]    = (Math.random() - 0.5) * 100;
    for (let i = 0; i < COUNT;     i++) scale[i]  = Math.random();

    geo.setAttribute('position', new THREE.BufferAttribute(pos,   3));
    geo.setAttribute('aScale',   new THREE.BufferAttribute(scale, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
      vertexShader: `
        attribute float aScale;
        varying float vScale;
        void main() {
          vScale = aScale;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (12.0 * aScale) * (1.0 / -mv.z);
          gl_Position  = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vScale;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float a = (0.5 - d) * 2.0;
          vec3 col = mix(vec3(0.53, 0.66, 0.8), vec3(0.3, 0.52, 0.74), vScale);
          gl_FragColor = vec4(col, a * 0.45);
        }
      `,
    });

    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);

    // Mouse — throttled to reduce main-thread pressure
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseUpdate = 0;

    const onMouse = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseUpdate < 32) return; // max 30 updates/s
      lastMouseUpdate = now;
      mouseX = (e.clientX - window.innerWidth  / 2) * 0.05;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };
    document.addEventListener('mousemove', onMouse, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Animation — FPS-capped
    let rafId: number;
    let lastTime = 0;
    let elapsed  = 0;

    const animate = (ts: number) => {
      rafId = requestAnimationFrame(animate);

      // Skip frame if under cap
      const delta = ts - lastTime;
      if (delta < INTERVAL) return;
      lastTime  = ts - (delta % INTERVAL);
      elapsed  += delta * 0.001;

      mesh.rotation.y += 0.0008;
      mesh.rotation.x += 0.0004;
      mesh.position.y  = Math.sin(elapsed * 0.4) * 1.5;

      camera.position.x += (mouseX - camera.position.x) * 0.015;
      camera.position.y += (-mouseY - camera.position.y) * 0.015;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    // Pause when tab hidden
    const onVisChange = () => {
      if (document.visibilityState === 'hidden') {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVisChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVisChange);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-[-1] pointer-events-none opacity-60" />;
}