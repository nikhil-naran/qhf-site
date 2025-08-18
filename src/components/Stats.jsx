import React, { useEffect, useRef } from 'react';
import { revealOnScroll, countTo } from '../lib/animation.js';
import { alumniStats } from '../data.js';

export default function Stats(){
  const aRef = useRef(null);
  const cRef = useRef(null);
  const iRef = useRef(null);

  useEffect(()=>{
    const els = [aRef.current, cRef.current, iRef.current];
    els.forEach((el, idx)=>{
      if (!el) return;
      revealOnScroll(el, { translateY: 18, delay: idx * 120 });
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e => {
          if (e.isIntersecting) {
            if (el === aRef.current) countTo(el.querySelector('.num'), alumniStats.alumniCount, { duration: 1800 });
            if (el === cRef.current) countTo(el.querySelector('.num'), alumniStats.cities, { duration: 1400 });
            if (el === iRef.current) countTo(el.querySelector('.num'), alumniStats.industries, { duration: 1400 });
            io.unobserve(el);
          }
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }, []);

  return (
    <section id="stats" className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-3 md:grid-cols-3">
          <div ref={aRef} className="glass rounded-lg p-6 text-center">
            <div className="text-4xl font-bold num">0</div>
            <div className="mt-2 text-sm text-slate-200">Alumni</div>
          </div>
          <div ref={cRef} className="glass rounded-lg p-6 text-center">
            <div className="text-4xl font-bold num">0</div>
            <div className="mt-2 text-sm text-slate-200">Cities</div>
          </div>
          <div ref={iRef} className="glass rounded-lg p-6 text-center">
            <div className="text-4xl font-bold num">0</div>
            <div className="mt-2 text-sm text-slate-200">Industries</div>
          </div>
        </div>
      </div>
    </section>
  );
}
