import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/animation.js';

export default function ParticleCanvas(){
  const canvasRef = useRef(null);
  const layers = 3;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height, raf, particles;

    const setup = () => {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      const count = prefersReducedMotion() ? 30 : 90;
      particles = Array.from({ length: count }).map(()=> ({
        x: Math.random() * (canvas.offsetWidth),
        y: Math.random() * (canvas.offsetHeight),
        z: Math.floor(Math.random()*layers),
        vx: (Math.random()-0.5)*0.12,
        vy: (Math.random()-0.5)*0.12,
      }));
    };

    const draw = () => {
      const reduce = prefersReducedMotion();
      ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight);
      // non-reactive baseline motion: particles drift based on their own velocities and depth
      particles.forEach(p => {
        const depth = (p.z+1);
        p.x += p.vx * depth;
        p.y += p.vy * depth;
        if (p.x < 0) p.x = canvas.offsetWidth; if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight; if (p.y > canvas.offsetHeight) p.y = 0;
        const alpha = 0.25 + p.z*0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2 + p.z*0.6, 0, Math.PI*2);
        ctx.fillStyle = `rgba(226,199,132,${alpha})`;
        ctx.fill();
      });
      if (!reduce){
        ctx.strokeStyle = 'rgba(197,161,109,0.12)';
        for (let i=0;i<particles.length;i++){
          for (let j=i+1;j<particles.length;j++){
            const a = particles[i], b = particles[j];
            const dx = a.x-b.x, dy = a.y-b.y; const d = Math.hypot(dx,dy);
            if (d < 90) { ctx.globalAlpha = 1 - d/90; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.globalAlpha=1; }
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => { setup(); };
    setup(); draw();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  // Make the particles a fixed, full-viewport layer so they appear behind the header/nav
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}
