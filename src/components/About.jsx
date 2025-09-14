import React, { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { revealOnScroll } from '../lib/animation.js';

export default function About(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current), []);
  return (
    <section id="about" ref={ref} className="relative py-20 scroll-mt-24">
  <div className="mx-auto max-w-7xl px-4 grid gap-10 items-start">
        <div className="glass rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold">What We Do</h2>
          <p className="mt-3 text-slate-200/90">Queen’s Hedge Fund (QHF) is a student-managed North American investment fund based in Kingston, Ontario. We run a concentrated, multi-strategy macro-driven portfolio while developing the next generation of investors through hands-on training, workshops, research reviews, and live stock pitches.</p>

          <p className="mt-6 text-slate-200/90">Our members gain experience through:</p>

          <ul className="mt-4 list-disc list-inside space-y-3 text-slate-200/90">
            <li>
              <strong>Hands-on equity, derivative & macro research</strong> – analyzing real investment conditions using professional frameworks.
            </li>
            <li>
              <strong>Live portfolio discussions</strong> – debating investment ideas and managing a simulated fund.
            </li>
            <li>
              <strong>Professional mentorship</strong> – learning directly from industry leaders.
            </li>
            <li>
              <strong>Career and recruiting support</strong> – preparing members for roles in finance and beyond.
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold">Why QHF</h3>
            <p className="mt-4 text-slate-200/90">QHF is designed for students who want more than just theory — we offer the structure, discipline, and accountability of a real hedge fund environment.</p>

            <ul className="mt-4 list-disc list-inside space-y-3 text-slate-200/90">
              <li>
                <strong>Concentrated, high-conviction investing</strong> – We don’t spread ourselves thin. Our portfolio is focused, research-driven, and built around macro-informed conviction.
              </li>
              <li>
                <strong>Industry advisors</strong> – Gain direct insights and mentorship from industry professionals.
              </li>
              <li>
                <strong>Structured training path</strong> – From workshops to live stock pitches, members follow a progression designed to build real-world investing skills step by step.
              </li>
              <li>
                <strong>Real accountability</strong> – Every decision impacts the fund. Members are responsible for their research and are challenged to defend their ideas in portfolio discussions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}