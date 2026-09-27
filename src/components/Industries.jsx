import React, { useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';
import { TEAM_CATEGORIES, TEAMS } from '../data.js';
import { Link } from 'react-router-dom';

export default function Industries(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 16 }), []);

  return (
    <section id="teams" ref={ref} className="border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <div className="h-px w-10 bg-goldA mb-5" />
            <h2 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">Our Teams</h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink/70">
              Six PM teams run independent strategies across global equities, fixed income, commodities, foreign exchange, crypto, and quantitative strategies — each managed within a disciplined, tightly controlled risk framework.
            </p>
          </div>
          <div className="relative flex aspect-[4/3] items-center justify-center border border-rule bg-ink/[0.03] sm:aspect-[16/9] lg:aspect-[4/3]">
            <span className="border border-rule bg-paper px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink/45">Team photo placeholder</span>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_CATEGORIES.map((c) => {
            const meta = TEAMS[c.slug] || {};
            return (
              <Link key={c.slug} to={`/teams/${c.slug}`} className="team-grid-card group">
                <div className="flex items-center gap-3.5">
                  <div className="team-logo bg-goldA/10">
                    <span className="text-base font-bold text-goldA">{c.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</span>
                  </div>
                  <div className="text-lg font-semibold text-ink transition-colors group-hover:text-goldA">{c.name}</div>
                </div>
                <div className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-goldA">Explore &rarr;</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
