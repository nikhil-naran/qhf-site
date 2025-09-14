import React, { useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';

function TiltCard({ title, children }){
  const innerRef = React.useRef(null);
  const onMove = (e) => {
    const el = innerRef.current; if (!el) return;
    const parent = el.parentElement;
    const r = parent.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width/2)) / r.width;
    const dy = (e.clientY - (r.top + r.height/2)) / r.height;
    // apply rotation to inner wrapper so outer reveal transform is preserved
    el.style.transform = `rotateX(${dy*-6}deg) rotateY(${dx*6}deg)`;
  };
  const onLeave = () => { if (innerRef.current) innerRef.current.style.transform = ''; };
  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave} className="glass rounded-2xl p-6 border border-white/10 transition-transform will-change-transform">
      <div ref={innerRef} className="will-change-transform transition-transform">
        <div className="text-xl font-semibold">{title}</div>
        <div className="mt-2 text-slate-200/90">{children}</div>
        <div className="mt-3 h-[2px] bg-gradient-to-r from-transparent via-goldA to-transparent"/>
      </div>
    </div>
  );
}

export default function Philosophy(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);

  return (
  <section id="philosophy" ref={ref} className="py-20 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Investment Philosophy</h2>
        <p className="mt-2 text-slate-200/90 max-w-2xl">We run a top-down, macro-driven multi strategy fund with a concentrated portfolio. Our process balances disciplined asset allocation with selective security selection, guided by four core pillars:</p>

        <div className="mt-8 space-y-6">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h4 className="font-semibold">1. Research</h4>
            <p className="mt-2 text-slate-200/90">We begin with a macroeconomic lens — analyzing global growth, monetary policy, and sector trends. From there, we narrow into bottom-up fundamentals, favoring companies whose strengths align with our macro regime. We also incorporate technical indicators to optimize trade timing and risk entry points.</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10">
            <h4 className="font-semibold">2. Due Diligence</h4>
            <p className="mt-2 text-slate-200/90">Both primary and secondary diligence shape our views. We test assumptions, identify variant perceptions, and assess risks across multiple scenarios to sharpen conviction and manage downside.</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10">
            <h4 className="font-semibold">3. Conviction</h4>
            <p className="mt-2 text-slate-200/90">Position sizing reflects both asymmetry and confidence. Our core holdings align with macro themes and provide stability, while satellite positions capture higher-risk, high-reward opportunities.</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10">
            <h4 className="font-semibold">4. Monitoring</h4>
            <p className="mt-2 text-slate-200/90">Markets evolve — so does our portfolio. We continuously review macro indicators, company performance, and exposures to ensure our allocations remain aligned with shifting regimes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}