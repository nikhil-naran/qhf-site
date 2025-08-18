import React from 'react';
import { TEAM_CATEGORIES, TEAMS } from '../data.js';
import { Link } from 'react-router-dom';

export default function TeamsHub(){
  return (
    <main className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-4xl font-extrabold">Our Teams</h1>
        <p className="text-slate-300 mt-2 max-w-2xl">Explore QHF’s specialized investment divisions and their research.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_CATEGORIES.map((t)=> {
            const meta = TEAMS[t.slug] || {};
            const blurb = meta.portfolioManager?.bio || 'View portfolio, team, and reports';
            return (
              <Link key={t.slug} to={`/teams/${t.slug}`} className="team-grid-card group">
                <div className="flex items-center gap-4">
                  <div className="team-logo bg-white/5 rounded-md flex items-center justify-center overflow-hidden">
                    <span className="text-xl font-bold text-goldB">{t.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</span>
                  </div>
                  <div>
                    <div className="text-xl font-semibold group-hover:text-goldB transition-colors">{t.name}</div>
                    <div className="text-sm text-slate-300 mt-1">{blurb}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-slate-200/90">Explore →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}