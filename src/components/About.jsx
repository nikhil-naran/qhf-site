import React, { useEffect, useRef } from 'react';
import { revealOnScroll } from '../lib/animation.js';

const whatWeDoTags = ['Hands-on research', 'Live portfolio discussions', 'Mentorship', 'Career support'];
const whyQhfTags = ['Diversified by strategy', 'Industry advisors', 'Structured training', 'Real accountability'];

export default function About(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current), []);

  return (
    <section id="about" ref={ref} className="scroll-mt-20 border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-12">
          <div>
            <div className="h-px w-10 bg-goldA mb-5" />
            <h2 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">About</h2>
          </div>
          <p className="max-w-2xl text-[15.5px] leading-relaxed text-ink/70">
            A student-managed hedge fund built to mirror the real thing — structure, discipline, and accountability, not just theory.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="border-t-2 border-goldA pt-6">
            <h3 className="text-xl font-semibold text-ink">What We Do</h3>
            <p className="mt-3.5 text-[14.5px] leading-relaxed text-ink/70">
              Independent strategies across global equities, fixed income, commodities, and foreign exchange — each built and owned at the PM level, under institutional-grade risk management.
            </p>
            <div className="mt-4.5 flex flex-wrap gap-2.5">
              {whatWeDoTags.map((tag) => (
                <span key={tag} className="border border-rule px-3.5 py-2 text-[12.5px] font-medium text-ink/70">{tag}</span>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-goldA pt-6">
            <h3 className="text-xl font-semibold text-ink">Why QHF</h3>
            <p className="mt-3.5 text-[14.5px] leading-relaxed text-ink/70">
              Each PM team runs its own strategy — a shared, tightly controlled risk framework ties the fund together, not a shared thesis.
            </p>
            <div className="mt-4.5 flex flex-wrap gap-2.5">
              {whyQhfTags.map((tag) => (
                <span key={tag} className="border border-rule px-3.5 py-2 text-[12.5px] font-medium text-ink/70">{tag}</span>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink/55">
              Interested in joining? <a href="/#join" className="text-goldA hover:text-goldB">Start the conversation</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
