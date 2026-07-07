import { useEffect, useRef } from 'react';

/**
 * Lightweight ambient floating-particle canvas used behind hero sections.
 * Respects prefers-reduced-motion.
 */
export default function ParticleBackground({ color = '#D4AF37', count = 36 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width, height, particles, rafId;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.6,
        speed: Math.random() * 0.35 + 0.08,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      });
      if (!prefersReduced) rafId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
  }, [color, count]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}
