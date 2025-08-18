import React from 'react';
import { TEAM_CATEGORIES } from '../data.js';
import { Link } from 'react-router-dom';

export default function Industries(){
  return (
    <section id="industries" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Industries</h2>
        <p className="text-slate-300 mt-2 max-w-2xl">Explore the sectors we cover — click any industry to view team holdings, members, and reports.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/teams/${c.slug}`} className="glass rounded-2xl p-6 border border-white/10 hover:-translate-y-1 transition-transform">
              <div className="text-xl font-semibold">{c.name}</div>
              <div className="text-sm text-slate-300 mt-1">View team, holdings, and research</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
