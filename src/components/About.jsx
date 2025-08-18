import React, { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { revealOnScroll } from '../lib/animation.js';

export default function About(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current), []);
  return (
    <section id="about" ref={ref} className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-start">
        <div className="glass rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold">What we do</h2>
          <p className="mt-3 text-slate-200/90">QHF is a student-led investment fund based in Kingston, Ontario. We run a concentrated, fundamentals-driven portfolio while training members through workshops, research reviews, and live pitches.</p>
          <ul className="mt-6 space-y-3">
            {["Hands-on equity research","Live portfolio discussions","Professional mentorship","Career and recruiting support"].map((t,i)=> (
              <li key={i} className="flex items-start gap-3 group">
                <CheckCircle2 className="mt-0.5 flex-shrink-0"/>
                <span className="group-hover:translate-x-0.5 transition-transform">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold">Why QHF</h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {["Concentrated, high-conviction investing","Faculty & alumni advisors","Structured training path","Real accountability"].map((b, i)=> (
                <li key={i} className="px-3 py-2 rounded border border-white/10 hover:border-goldA transition-all hover:-translate-y-0.5">{b}</li>
              ))}
            </ul>
          </div>
          {/* sizzle reel removed */}
        </div>
      </div>
    </section>
  );
}