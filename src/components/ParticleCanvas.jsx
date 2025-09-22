import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/animation.js';

export default function ParticleCanvas(){
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const palette = [
      { rgb: [197, 161, 109], glow: [255, 234, 195] },
      { rgb: [173, 137, 86], glow: [239, 208, 156] },
      { rgb: [212, 176, 120], glow: [255, 226, 182] },
      { rgb: [180, 150, 99], glow: [236, 216, 176] },
    ];

    const useReducedMotion = prefersReducedMotion();
    const orbCount = useReducedMotion ? 4 : 10;
    const sparkCount = useReducedMotion ? 12 : 28;

    const orbs = Array.from({ length: orbCount }, () => {
      const tint = palette[Math.floor(Math.random() * palette.length)];
      return {
        xFactor: Math.random(),
        yFactor: Math.random(),
        radiusFactor: 0.18 + Math.random() * 0.16,
        driftX: 0.05 + Math.random() * 0.18,
        driftY: 0.04 + Math.random() * 0.14,
        speed: 0.00018 + Math.random() * 0.00042,
        phase: Math.random() * Math.PI * 2,
        tint,
      };
    });

    const sparks = Array.from({ length: sparkCount }, () => ({
      xFactor: Math.random(),
      yFactor: Math.random(),
      radius: 1 + Math.random() * 1.4,
      twinkleSpeed: 0.001 + Math.random() * 0.002,
      offset: Math.random() * Math.PI * 2,
    }));

    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio, pixelRatio);
    };

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';
      orbs.forEach(orb => {
        const baseX = width * orb.xFactor;
        const baseY = height * orb.yFactor;
        const time = now * orb.speed + orb.phase;
        const cx = baseX + Math.sin(time) * width * orb.driftX;
        const cy = baseY + Math.cos(time * 0.82) * height * orb.driftY;
        const pulse = 0.78 + Math.sin(time * 1.6) * 0.18;
        const radius = Math.min(width, height) * orb.radiusFactor * pulse;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const [r, g, b] = orb.tint.rgb;
        const [gr, gg, gb] = orb.tint.glow;
        gradient.addColorStop(0, `rgba(${gr}, ${gg}, ${gb}, 0.18)`);
        gradient.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, 0.11)`);
        gradient.addColorStop(1, 'rgba(4, 7, 18, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'screen';
      sparks.forEach(spark => {
        const time = now * spark.twinkleSpeed + spark.offset;
        const intensity = 0.35 + 0.45 * Math.sin(time * 2.2);
        const x = width * spark.xFactor;
        const y = height * spark.yFactor;
        ctx.beginPath();
        ctx.arc(x, y, spark.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 199, 132, ${0.06 + intensity * 0.2})`;
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Make the particles a fixed, full-viewport layer so they appear behind the header/nav
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}
