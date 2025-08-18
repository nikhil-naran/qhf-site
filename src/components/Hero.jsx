import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas.jsx';
import { prefersReducedMotion } from '../lib/animation.js';

export default function Hero(){
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true"></div>
      <div className="hero-noise"></div>
      <ParticleCanvas />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 w-full">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
          {['Queens','Hedge','Fund'].map((w,i)=> (
            <span key={i} className="inline-block mr-3 align-top">
              <Word word={w} delay={i*120} />
            </span>
          ))}
        </h1>
        <p className="mt-5 max-w-2xl text-slate-200/90">
          Empowering students with real-world investment experience and financial expertise.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <a href="#about" className="btn">Learn More</a>
          <a href="#philosophy" className="text-slate-200 hover:text-goldB inline-flex items-center gap-2">Our Strategy <ArrowRight size={18}/></a>
        </div>
      </div>
    </section>
  );
}

function Word({ word, delay=0 }){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current; if (!el) return;
    const reduce = prefersReducedMotion();
    el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      el.style.transition = reduce? 'none' : `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    });
  }, [delay]);
  return (
    <span ref={ref} className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(110deg, #fff 0%, #fff 38%, #C5A16D 45%, #fff 52%, #fff 100%)', backgroundSize: '250% 100%' }}>
      <span className="[--sh:linear-gradient(110deg,transparent,rgba(255,255,255,0.5),transparent)] bg-[image:var(--sh)] bg-[length:200%_100%] bg-clip-text animate-sheen">
        {word}
      </span>
    </span>
  );
}