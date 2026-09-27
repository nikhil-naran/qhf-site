import React, { useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';

const pillars = [
  { step: '01', title: 'Research', point: 'Deep, strategy-specific expertise — not filtered through a single macro view.' },
  { step: '02', title: 'Due Diligence', point: 'Primary and secondary diligence sharpen conviction and manage downside.' },
  { step: '03', title: 'Conviction', point: 'Position sizing reflects asymmetry, sized against a defined risk budget.' },
  { step: '04', title: 'Monitoring', point: 'Continuous review of performance, risk, and exposure.' },
];

export default function Philosophy(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 16 }), []);

  return (
    <section id="philosophy" ref={ref} className="scroll-mt-20 border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 max-w-2xl">
          <div className="h-px w-10 bg-goldA mb-5" />
          <h2 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">Investment Philosophy</h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-ink/70">
            A multi-strategy fund built from the bottom up — each PM team owns a distinct strategy, underwritten by shared, disciplined risk management.
          </p>
        </div>
        <div className="relative mb-2 hidden lg:block" aria-hidden="true">
          <div className="absolute left-[12.5%] right-[12.5%] top-4 h-px bg-rule" />
          <div className="relative grid grid-cols-4">
            {pillars.map((pillar) => (
              <div key={pillar.step} className="flex justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-goldA bg-paper font-mono text-[11px] font-semibold text-goldA">
                  {pillar.step}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-panel p-7">
              <span className="mb-4 block font-serif text-2xl font-semibold text-goldA">{pillar.step}</span>
              <h3 className="text-lg font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-ink/65">{pillar.point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
