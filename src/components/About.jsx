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
    description: 'We don’t spread ourselves thin. Our portfolio is focused, research-driven, and built around macro-informed conviction.',
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
    <section id="about" ref={ref} className="relative scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="glass rounded-2xl border border-white/10 p-8 shadow-sm">
            <h2 className="text-3xl font-bold">What We Do</h2>
            <p className="mt-3 max-w-3xl text-slate-200/90 leading-relaxed">
              Queen’s Hedge Fund (QHF) is a student-managed North American investment fund based in Kingston, Ontario.
              We run a concentrated, multi-strategy macro-driven portfolio while developing the next generation of
              investors through hands-on training, workshops, research reviews, and live stock pitches.
            </p>
            <p className="mt-6 text-slate-200/80 leading-relaxed">Our members gain experience through:</p>

            <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2">
              {whatWeDoHighlights.map(({ title, description }) => (
                <div
                  key={title}
                  className="group flex h-full min-h-[200px] flex-col rounded-xl border border-white/10 bg-white/5 px-5 py-6 transition duration-300 hover:-translate-y-1 hover:border-goldA/60 hover:bg-white/10"
                >
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-goldA/0 via-goldA/70 to-goldA/0 transition-opacity group-hover:opacity-100"/>
                  <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-slate-200/80 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl border border-white/10 p-8 shadow-sm">
            <h3 className="text-3xl font-bold">Why QHF</h3>
            <p className="mt-4 text-slate-200/80 leading-relaxed">
              QHF is designed for students who want more than just theory; we offer the structure, discipline, and accountability of a real hedge fund environment.
            </p>

            <div className="mt-8 lg:mt-12 grid items-stretch gap-4 sm:grid-cols-2">
              {whyQhfHighlights.map(({ title, description }) => (
                <div
                  key={title}
                  className="group flex h-full min-h-[200px] flex-col rounded-xl border border-white/10 bg-white/5 px-5 py-6 transition duration-300 hover:-translate-y-1 hover:border-goldA/60 hover:bg-white/10"
                >
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-goldA/0 via-goldA/70 to-goldA/0 transition-opacity group-hover:opacity-100"/>
                  <h4 className="mt-3 text-lg font-semibold text-white">{title}</h4>
                  <p className="mt-2 text-sm text-slate-200/80 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
