import React from 'react';
import { TEAM_CATEGORIES } from '../data.js';
import { Link } from 'react-router-dom';

export default function TeamsHub(){
  return (
    <main className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-4xl font-extrabold">Our Teams</h1>
        <p className="text-slate-300 mt-2 max-w-2xl">Explore QHF’s specialized investment divisions and their research.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_CATEGORIES.map((t)=> (
            <Link key={t.slug} to={`/teams/${t.slug}`} className="glass rounded-2xl border border-white/10 p-6 hover:-translate-y-1 transition-transform">
              <div className="text-xl font-semibold">{t.name}</div>
              <div className="text-sm text-slate-300 mt-1">View portfolio, team, and reports</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}