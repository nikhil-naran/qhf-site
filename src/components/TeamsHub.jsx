import React from 'react';
import { TEAM_CATEGORIES, TEAMS } from '../data.js';
import { Link } from 'react-router-dom';

export default function TeamsHub(){
  const allTeams = TEAM_CATEGORIES.map((entry) => ({
    ...entry,
    meta: TEAMS[entry.slug] || {},
  }));

  return (
    <main className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <section className="panel px-6 py-8 sm:px-10 lg:px-12">
          <p className="inline-flex items-center gap-2 border border-rule px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-goldA">Our Teams</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-ink sm:text-5xl">Independent strategies. Shared discipline.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/70 sm:text-base">Six PM teams run independent mandates across global equities, fixed income, commodities, foreign exchange, crypto, and quantitative strategies — each managed within a shared, tightly controlled risk framework. Explore the teams below.</p>
        </section>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allTeams.map((team) => {
            const { meta } = team;
            const isInvestmentTeam = team.slug !== 'marketing';
            const leadName = meta.portfolioManager?.name
              || (meta.coPortfolioManagers?.length ? meta.coPortfolioManagers.map((p) => p.name).join(', ') : null);

            return (
              <Link
                key={team.slug}
                to={`/teams/${team.slug}`}
                className="team-grid-card group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-goldA"
              >
                <div className="flex h-full flex-col gap-5">
                  <div className="flex items-start gap-3.5">
                    <div className="team-logo bg-goldA/10">
                      <span className="text-base font-bold text-goldA">{team.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-ink transition-colors group-hover:text-goldA">{team.name}</h2>
                      {isInvestmentTeam && meta.strategy && (
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60">{meta.strategy}</p>
                      )}
                    </div>
                  </div>

                  <div className={`mt-auto flex items-center border-t border-rule pt-4 text-sm ${isInvestmentTeam ? 'justify-between' : 'justify-end'}`}>
                    {isInvestmentTeam && (
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Leadership</div>
                        <div className="mt-1 font-medium text-ink/80">{leadName || 'To be announced'}</div>
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-goldA">
                      View
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                        <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
