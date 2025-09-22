import React, { useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';

function TiltCard({ step, title, children }){
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
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="glass group relative rounded-2xl border border-white/10 p-6 sm:p-7 transition-transform"
    >
      <div ref={innerRef} className="will-change-transform transition-transform">
        <div className="flex items-center gap-4">
          {step && (
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-goldA/40 bg-goldA/10 text-xs font-semibold uppercase tracking-[0.2em] text-goldA/90">
              {step}
            </span>
          )}
          <div className="text-xl font-semibold text-white">{title}</div>
        </div>
        <div className="mt-4 text-sm sm:text-base text-slate-200/90 leading-relaxed">
          {children}
        </div>
        <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-transparent via-goldA/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </div>
  );
}

export default function Philosophy(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);

  const pillars = [
    {
      step: '01',
      title: 'Research',
      points: [
        'We begin with a macroeconomic lens — analyzing global growth, monetary policy, and sector trends.',
        'From there, we narrow into bottom-up fundamentals, favoring companies whose strengths align with our macro regime.',
        'We also incorporate technical indicators to optimize trade timing and risk entry points.',
      ],
    },
    {
      step: '02',
      title: 'Due Diligence',
      points: [
        'Both primary and secondary diligence shape our views.',
        'We test assumptions, identify variant perceptions, and assess risks across multiple scenarios to sharpen conviction and manage downside.',
      ],
    },
    {
      step: '03',
      title: 'Conviction',
      points: [
        'Position sizing reflects both asymmetry and confidence.',
        'Our core holdings align with macro themes and provide stability, while satellite positions capture higher-risk, high-reward opportunities.',
      ],
    },
    {
      step: '04',
      title: 'Monitoring',
      points: [
        'Markets evolve — so does our portfolio.',
        'We continuously review macro indicators, company performance, and exposures to ensure our allocations remain aligned with shifting regimes.',
      ],
    },
  ];

  return (
    <section id="philosophy" ref={ref} className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass relative overflow-hidden rounded-3xl border border-white/10 px-6 py-12 sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_62%)]" />
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-goldA/20 bg-goldA/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-goldA/80">
                Process
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Investment Philosophy</h2>
              <p className="max-w-xl text-base text-slate-200/90 sm:text-lg">
                We run a top-down, macro-driven multi strategy fund with a concentrated portfolio. Our process balances disciplined asset allocation with selective security selection, guided by four core pillars:
              </p>
              <ol className="flex flex-wrap items-center gap-3 text-[0.78rem] font-medium tracking-wide text-slate-100">
                {pillars.map((pillar) => (
                  <li
                    key={`badge-${pillar.title}`}
                    className="flex items-center gap-2 rounded-full border border-goldA/20 bg-white/5 px-3 py-1 backdrop-blur-sm"
                  >
                    <span className="text-xs font-semibold text-goldA/80">{pillar.step}</span>
                    <span className="uppercase text-[0.72rem] text-slate-100/90">{pillar.title}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {pillars.map((pillar) => (
                <TiltCard key={pillar.title} step={pillar.step} title={pillar.title}>
                  <ul className="space-y-2 text-left text-slate-200/90">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-goldA/70" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
