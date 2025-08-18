import React, { useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';
import { TEAM_CATEGORIES } from '../data.js';
import { Link } from 'react-router-dom';

export default function Industries(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);

  return (
    <section id="teams" ref={ref} className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Our Teams</h2>
        <p className="text-slate-300 mt-2 max-w-2xl">Explore QHF’s specialized teams — click any team to view holdings, members, and research.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/teams/${c.slug}`} className="glass rounded-2xl p-6 border border-white/10 team-card">
              <div className="text-xl font-semibold">{c.name}</div>
              <div className="text-sm text-slate-300 mt-1">View team, holdings, and research</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
