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
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            <img
              src="/QHF-home.png"
              alt="Queens Hedge Fund"
              loading="eager"
              style={{ clipPath: 'inset(0 0 25% 0)' }}
              className="w-[98%] max-w-none h-auto md:w-[90%] lg:w-[80%] object-contain drop-shadow-2xl"
            />
          </div>
          <TypingParagraph mounted={mounted} />
        </div>
        <div className="mt-10 flex items-center gap-4 justify-center">
          <a href="#about" className={`btn reveal reveal-delay-200 ${mounted ? 'revealed' : ''} text-base md:text-lg`}>Learn More</a>
          <a href="#philosophy" className={`text-slate-200 hover:text-goldB inline-flex items-center gap-2 reveal reveal-delay-300 ${mounted ? 'revealed' : ''} text-base md:text-lg`}>Our Strategy <ArrowRight size={20}/></a>
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

function TypingParagraph({ mounted }){
  const text = 'Empowering students with real-world investment experience and financial expertise.';
  const [display, setDisplay] = useState('');
  const reduce = prefersReducedMotion();

  useEffect(()=>{
    if (!mounted) return;
    if (reduce) { setDisplay(text); return; }
    let i = 0;
    const speed = 28; // ms per char
    const handle = setInterval(()=>{
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(handle);
    }, speed);
    return () => clearInterval(handle);
  }, [mounted, reduce]);

  return (
    <p className={`mt-5 max-w-2xl text-slate-200/90 text-center reveal reveal-delay-100 ${mounted ? 'revealed' : ''} ${!reduce ? 'type-cursor' : ''} text-lg md:text-xl lg:text-2xl leading-relaxed`}>
      {display}
    </p>
  );
}