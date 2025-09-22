import React from 'react';
import { TEAM_CATEGORIES, TEAMS } from '../data.js';
import { Link } from 'react-router-dom';

const accentGradients = [
  'from-amber-500/25 via-slate-900/35 to-slate-900/5',
  'from-sky-500/25 via-slate-900/35 to-slate-900/5',
  'from-emerald-500/25 via-slate-900/35 to-slate-900/5',
  'from-fuchsia-500/25 via-slate-900/35 to-slate-900/5',
  'from-indigo-500/25 via-slate-900/35 to-slate-900/5',
];

const formatMetric = (value) => (value && value > 0 ? value.toLocaleString('en-CA') : '—');

export default function TeamsHub(){
  const allTeams = TEAM_CATEGORIES.map((entry, index) => ({
    ...entry,
    gradient: accentGradients[index % accentGradients.length],
    meta: TEAMS[entry.slug] || {},
  }));

  const teamsMeta = Object.values(TEAMS || {});
  const totalHoldings = teamsMeta.reduce((acc, team) => acc + (team?.holdings?.length || 0), 0);
  const totalReports = teamsMeta.reduce((acc, team) => acc + (team?.reports?.length || 0), 0);
  const totalLeads = teamsMeta.reduce((acc, team) => {
    const pm = team?.portfolioManager ? 1 : 0;
    const coPM = Array.isArray(team?.coPortfolioManagers) ? team.coPortfolioManagers.length : 0;
    return acc + pm + coPM;
  }, 0);

  const metrics = [
    { label: 'Sector pods', value: formatMetric(TEAM_CATEGORIES.length) },
    { label: 'Holdings tracked', value: formatMetric(totalHoldings) },
    { label: 'Team leads', value: formatMetric(totalLeads) },
    { label: 'Published reports', value: formatMetric(totalReports) },
  ].filter((metric) => metric.value !== '—');

  return (
    <main className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-8 h-56 w-96 -translate-x-1/2 rounded-full bg-goldA/20 blur-3xl" aria-hidden="true"></div>
        <div className="absolute right-16 bottom-0 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" aria-hidden="true"></div>
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <section className="glass relative overflow-hidden rounded-3xl border border-white/10 px-6 py-8 shadow-glass sm:px-10 lg:px-12">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0" aria-hidden="true"></div>
          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <header>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-goldB">Our Teams</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">Specialized pods. Long-term conviction.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200/90 sm:text-base">Every sector pod inside QHF runs a focused research mandate, publishes investment theses, and manages capital with a risk-aware mindset. Explore the pods to see the people, holdings, and reports driving our edge.</p>
            </header>
            {metrics.length > 0 && (
              <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-sm text-slate-200 sm:grid-cols-4 sm:p-6">
                {metrics.map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">{metric.label}</dt>
                    <dd className="text-2xl font-semibold text-goldB">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allTeams.map((team) => {
            const { meta } = team;
            const blurb = meta.portfolioManager?.bio || meta.coPortfolioManagers?.[0]?.bio || 'View portfolio, team, and reports';
            const leadNames = meta.portfolioManager?.name || (Array.isArray(meta.coPortfolioManagers) && meta.coPortfolioManagers.length > 0 ? meta.coPortfolioManagers.map((person) => person.name).join(' · ') : null);

            const holdings = Array.isArray(meta.holdings) ? meta.holdings.slice(0, 3) : [];
            const reportChips = holdings.length === 0 && Array.isArray(meta.reports)
              ? meta.reports.slice(0, 2).map((report) => ({ id: report.title, title: report.title, subtitle: 'Report' }))
              : [];
            const memberChips = holdings.length === 0 && reportChips.length === 0 && Array.isArray(meta.members)
              ? meta.members.slice(0, 2).map((member) => ({ id: member.name, title: member.name, subtitle: 'Team member' }))
              : [];

            const chips = holdings.length > 0
              ? holdings.map((holding) => ({ id: holding.ticker, title: holding.ticker, subtitle: holding.company }))
              : [...reportChips, ...memberChips];

            return (
              <Link
                key={team.slug}
                to={`/teams/${team.slug}`}
                className="team-grid-card group relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-goldB"
              >
                <span className={`absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br ${team.gradient} opacity-80 transition-opacity duration-300 group-hover:opacity-100`} aria-hidden="true"></span>
                <span className="absolute inset-px rounded-[1.05rem] bg-slate-900/60" aria-hidden="true"></span>

                <div className="relative z-10 flex h-full flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="team-logo rounded-xl border border-white/10 bg-white/10">
                      {meta.iconUrl ? (
                        <img src={meta.iconUrl} alt={`${team.name} icon`} className="h-12 w-12 object-contain" />
                      ) : (
                        <span className="text-xl font-bold text-goldB">{team.name.split(' ').map((segment) => segment[0]).slice(0, 2).join('')}</span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-50 transition-colors duration-200 group-hover:text-goldB sm:text-2xl">{team.name}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-200/85">{blurb}</p>
                    </div>
                  </div>

                  {chips.length > 0 && (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {chips.map((chip) => (
                        <div key={chip.id} className="rounded-xl border border-white/10 bg-white/10 p-3 text-left shadow-[0_12px_32px_rgba(2,6,23,0.45)]">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-goldB">{chip.title}</div>
                          {chip.subtitle && <div className="mt-1 text-xs text-slate-200/90">{chip.subtitle}</div>}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between text-sm text-slate-200/80">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Leadership</div>
                      <div className="mt-1 font-medium text-slate-100">{leadNames || 'QHF leadership team'}</div>
                    </div>
                    <span className="inline-flex items-center gap-2 font-semibold text-goldB transition-transform duration-200 group-hover:translate-x-1">
                      Explore
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
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
