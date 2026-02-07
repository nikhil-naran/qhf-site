import React, { useEffect, useRef } from 'react';
import { revealOnScroll } from '../lib/animation.js';

const whatWeDoHighlights = [
  {
    title: 'Hands-on equity, derivative & macro research',
    description: 'Analyzing real investment conditions using professional frameworks.',
  },
  {
    title: 'Live portfolio discussions',
    description: 'Debating investment ideas and managing a simulated fund.',
  },
  {
    title: 'Professional mentorship',
    description: 'Learning directly from industry leaders.',
  },
  {
    title: 'Career and recruiting support',
    description: 'Preparing members for roles in finance and beyond.',
  },
];

const whyQhfHighlights = [
  {
    title: 'Concentrated, high-conviction investing',
    description: 'We don\'t spread ourselves thin. Our portfolio is focused, research-driven, and built around macro-informed conviction.',
  },
  {
    title: 'Industry advisors',
    description: 'Gain direct insights and mentorship from industry professionals.',
  },
  {
    title: 'Structured training path',
    description: 'From workshops to live stock pitches, members follow a progression designed to build real-world investing skills step by step.',
  },
  {
    title: 'Real accountability',
    description: 'Every decision impacts the fund. Members are responsible for their research and are challenged to defend their ideas in portfolio discussions.',
  },
];

export default function About(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current), []);

  return (
    <section id="about" ref={ref} className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <div className="h-px w-12 bg-goldA/60 mb-6" />
          <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl">About</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="glass rounded-2xl border border-white/[0.07] p-6 sm:p-10">
            <h3 className="text-2xl font-semibold text-white">What We Do</h3>
            <p className="mt-4 max-w-3xl text-slate-200/90 leading-relaxed">
              Queen's Hedge Fund (QHF) is Queen's University's student-managed hedge fund in Kingston, Ontario.
              Our analysts research North American markets, operate a concentrated multi-strategy portfolio, and
              practice institutional-grade risk management while progressing through our training pipeline.
            </p>
            <p className="mt-6 text-slate-200/80 leading-relaxed">Our members gain experience through:</p>

            <div className="mt-6 space-y-4">
              {whatWeDoHighlights.map(({ title, description }) => (
                <div
                  key={title}
                  className="border-l-2 border-goldA/40 pl-5 py-1"
                >
                  <h4 className="text-base font-semibold text-white">{title}</h4>
                  <p className="mt-1 text-sm text-slate-200/80 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl border border-white/[0.07] p-6 sm:p-10">
            <h3 className="text-2xl font-semibold text-white">Why QHF</h3>
            <p className="mt-4 text-slate-200/80 leading-relaxed">
              QHF is designed for students who want more than just theory; by mirroring a professional hedge fund inside Queen's University, we provide the structure, discipline, and accountability required to pitch and manage real investment ideas.
            </p>

            <div className="mt-8 space-y-4">
              {whyQhfHighlights.map(({ title, description }) => (
                <div
                  key={title}
                  className="border-l-2 border-goldA/40 pl-5 py-1"
                >
                  <h4 className="text-base font-semibold text-white">{title}</h4>
                  <p className="mt-1 text-sm text-slate-200/80 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-slate-300">
              Interested in joining Queen's Hedge Fund? <a href="/#join" className="text-goldB hover:text-goldA">Start your application conversation with QHF</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
