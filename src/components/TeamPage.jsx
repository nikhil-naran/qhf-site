import React from 'react';
import { useParams } from 'react-router-dom';
import { TEAMS } from '../data.js';

const INITIALS_FALLBACK = (name = '') => name.split(' ').map((part) => part[0]).filter(Boolean).join('').slice(0, 2).toUpperCase();

const AVATAR_SIZES = {
  sm: 'h-12 w-12 sm:h-14 sm:w-14',
  md: 'h-16 w-16 sm:h-20 sm:w-20',
  lg: 'h-20 w-20 sm:h-24 sm:w-24',
};

function PersonAvatar({ person = {}, size = 'md', className = '' }) {
  const classes = AVATAR_SIZES[size] || AVATAR_SIZES.md;
  const src = person.headshot;
  return (
    <div className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-goldA/20 to-goldB/10 text-goldB ${classes} ${className}`}>
      {src ? (
        <img src={src} alt={`${person.name} headshot`} className="headshot-img absolute inset-0 h-full w-full" />
      ) : (
        <span className="relative z-10 font-semibold uppercase tracking-wide text-slate-100">{INITIALS_FALLBACK(person.name)}</span>
      )}
    </div>
  );
}

export default function TeamPage(){
  const { slug } = useParams();
  const team = TEAMS[slug];
  if (!team) {
    return (
      <main className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold">Team not found</h1>
          <p className="text-slate-300 mt-2">Check the URL or pick from the Teams hub.</p>
        </div>
      </main>
    );
  }
  return (
    <main className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:space-y-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {team.iconUrl && (
            <img
              src={team.iconUrl}
              alt={`${team.name} icon`}
              className="h-12 w-12 rounded-md bg-white/5 p-2 sm:h-14 sm:w-14"
            />
          )}
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">{team.name}</h1>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">Holdings, team members, and research &amp; reports.</p>
          </div>
        </header>

        {/* A) Team Portfolio Holdings: hidden for teams that list `members` (e.g., Marketing, Macro) */}
        {!(team.members && team.members.length) && (
          <section className="glass rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Portfolio Holdings</h2>
            <div className="mt-4 space-y-3 sm:hidden">
              {team.holdings.map((r) => (
                <div key={r.ticker} className="glass rounded-xl border border-white/10 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold">{r.ticker}</div>
                      <div className="text-sm text-slate-300">{r.company}</div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                      {r.performance}% YTD
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                    <span>Allocation</span>
                    <span className="font-semibold text-slate-100">{r.allocation}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden sm:block">
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-burgundy/80 backdrop-blur">
                    <tr className="text-left text-slate-300">
                      <th className="py-2">Ticker</th>
                      <th>Company</th>
                      <th className="text-right">Allocation</th>
                      <th className="text-right">YTD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.holdings.map((r)=> (
                      <tr key={r.ticker} className="border-t border-white/5 hover:bg-white/5 focus-within:bg-white/5">
                        <td className="py-2 font-semibold">{r.ticker}</td>
                        <td>{r.company}</td>
                        <td className="text-right">{r.allocation}%</td>
                        <td className="text-right">{r.performance}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* B) The Team */}
        <section className="glass rounded-2xl border border-white/10 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">The Team</h2>
          <div className="mt-4">
            {(() => {
              // Do not show a Portfolio Manager block for teams that explicitly list `members`.
              const hasCoPMs = team.coPortfolioManagers && team.coPortfolioManagers.length;
              const pm = team.portfolioManager || (hasCoPMs ? null : null);
              const showPM = !team.members && (pm || hasCoPMs);
              if (!showPM) return null;
              if (hasCoPMs) {
                return (
                  <>
                    <h3 className="text-lg font-medium">Co-Portfolio Managers</h3>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {team.coPortfolioManagers.map((cpm, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <PersonAvatar person={cpm} size="md" />
                          <div>
                            <div className="font-semibold text-slate-50">{cpm.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              }
              // Fallback single PM
              return (
                <>
                  <h3 className="text-lg font-medium">Portfolio Manager</h3>
                  <div className="mt-3 grid items-center gap-4 sm:grid-cols-[96px_1fr]">
                    <PersonAvatar person={pm} size="lg" />
                    <div>
                      <div className="font-semibold text-slate-50">{pm?.name}</div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
          <div className="mt-6">
            {(() => {
              const usingMembers = !(team.analysts && team.analysts.length) && (team.members && team.members.length);
              const label = usingMembers ? 'Members' : 'Analysts';
              const list = (team.analysts && team.analysts.length) ? team.analysts : (team.members || []);
              return (
                <>
                  <h3 className="text-lg font-medium">{label}</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                    {list.map((a, i)=> (
                      <div key={i} className="glass rounded-xl border border-white/10 p-4">
                        <PersonAvatar person={a} size="md" className="mb-3" />
                        <div className="font-semibold text-slate-50">{a.name}</div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </section>

        {/* C) Research & Reports */}
        <section className="glass rounded-2xl border border-white/10 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Research &amp; Reports</h2>
          <ul className="mt-4 space-y-2">
            {team.reports.map((r, i)=> (
              <li key={i}>
                <a className="underline hover:text-goldB" href={r.url} target="_blank" rel="noreferrer noopener">{r.title}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
