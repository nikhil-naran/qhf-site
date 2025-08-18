import React, { useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';

function TiltCard({ title, children }){
  const onMove = (e) => {
    const el = e.currentTarget; const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width/2)) / r.width;
    const dy = (e.clientY - (r.top + r.height/2)) / r.height;
    el.style.transform = `rotateX(${dy*-6}deg) rotateY(${dx*6}deg)`;
  };
  const onLeave = (e) => { e.currentTarget.style.transform = 'rotateX(0) rotateY(0)'; };
  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave} className="glass rounded-2xl p-6 border border-white/10 transition-transform will-change-transform">
      <div className="text-xl font-semibold">{title}</div>
      <div className="mt-2 text-slate-200/90">{children}</div>
      <div className="mt-3 h-[2px] bg-gradient-to-r from-transparent via-goldA to-transparent"/>
    </div>
  );
}

export default function Philosophy(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);

  return (
    <section id="philosophy" ref={ref} className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Investment Philosophy</h2>
        <p className="mt-2 text-slate-200/90 max-w-2xl">We run a deep-value, concentrated strategy. Three pillars guide our process from research to conviction and ongoing monitoring.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <TiltCard title="Research">Bottom-up fundamentals with a bias for quality cash flows and durable moats.</TiltCard>
          <TiltCard title="Due Diligence">Primary and secondary diligence drive variant perception and risk management.</TiltCard>
          <TiltCard title="Conviction">Position sizing reflects asymmetry and downside scenarios, monitored continuously.</TiltCard>
        </div>
        <div className="mt-10 glass rounded-2xl p-6 border border-white/10">
          <ol className="relative border-l border-white/10 ml-3 pl-6 space-y-4">
            {["Research","Due Diligence","Conviction","Monitoring"].map((step,i)=> (
              <li key={i} className="group">
                <span className="absolute -left-[9px] mt-1 w-4 h-4 rounded-full bg-goldA group-hover:scale-110 transition-transform"/>
                <div className="font-semibold">{step}</div>
                <div className="text-sm text-slate-300">Step {i+1} description with key checks and outputs.</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}