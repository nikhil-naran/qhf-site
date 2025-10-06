import React, { useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';
import { TEAM_CATEGORIES, TEAMS } from '../data.js';
import { Link } from 'react-router-dom';

export default function Industries(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);

  return (
    <section id="teams" ref={ref} className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Our Teams</h2>
        <p className="text-slate-300 mt-2 max-w-2xl">Explore Queen's Hedge Fund teams to review holdings, portfolio leads, and research highlights.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_CATEGORIES.map((c) => {
            const meta = TEAMS[c.slug] || {};
            const blurb = 'Explore holdings, team leads, and research highlights.';
            return (
              <Link key={c.slug} to={`/teams/${c.slug}`} className="team-grid-card group">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="team-logo bg-white/5 rounded-md flex items-center justify-center overflow-hidden">
                    {meta.iconUrl ? (
                      <img src={meta.iconUrl} alt={`${c.name} icon`} className="w-12 h-12 object-contain" />
                    ) : (
                      <span className="text-xl font-bold text-goldB">{c.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-lg font-semibold transition-colors group-hover:text-goldB sm:text-xl">{c.name}</div>
                    <div className="mt-1 text-sm text-slate-300 leading-relaxed">{blurb}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-slate-200/90">Explore →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
