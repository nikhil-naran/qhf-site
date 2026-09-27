import React from 'react';
import { useParams } from 'react-router-dom';
import { TEAMS } from '../data.js';

export default function TeamPage() {
  const { slug } = useParams();
  const team = TEAMS[slug];
  if (!team) {
    return (
      <main className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold text-ink">Team not found</h1>
          <p className="mt-2 text-ink/60">Check the URL or pick from the Teams hub.</p>
        </div>
      </main>
    );
  }

  const hasHoldings = Array.isArray(team.holdings) && team.holdings.length > 0;
  const usingMembers = !(team.analysts && team.analysts.length) && (team.members && team.members.length);
  const rosterList = (team.analysts && team.analysts.length) ? team.analysts : (team.members || []);
  const hasPM = Boolean(team.portfolioManager) || Boolean(team.coPortfolioManagers && team.coPortfolioManagers.length);
  const hasRoster = hasPM || rosterList.length > 0;
  const hasReports = Array.isArray(team.reports) && team.reports.length > 0;

  return (
    <main className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:space-y-10">
        <header>
          <h1 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">{team.name}</h1>
          <p className="mt-2 text-sm text-ink/60 sm:text-base">Strategy, team, and research &amp; reports.</p>
        </header>

        {team.strategy && (
          <section className="panel p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-ink">Strategy</h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink/70">{team.strategy}</p>
          </section>
        )}

        {hasHoldings && (
          <section className="panel p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-ink">Portfolio Holdings</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-rule text-left text-ink/50">
                    <th scope="col" className="py-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em]">Ticker</th>
                    <th scope="col" className="font-mono text-[11px] font-medium uppercase tracking-[0.1em]">Company</th>
                    <th scope="col" className="text-right font-mono text-[11px] font-medium uppercase tracking-[0.1em]">Allocation</th>
                    <th scope="col" className="text-right font-mono text-[11px] font-medium uppercase tracking-[0.1em]">YTD</th>
                  </tr>
                </thead>
                <tbody>
                  {team.holdings.map((r) => (
                    <tr key={r.ticker} className="border-b border-rule">
                      <td className="py-3 font-semibold text-ink">{r.ticker}</td>
                      <td className="text-ink/70">{r.company}</td>
                      <td className="text-right text-ink/70">{r.allocation}%</td>
                      <td className="text-right text-ink/70">{r.performance}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="panel p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold text-ink">The Team</h2>
          {!hasRoster ? (
            <p className="mt-4 text-sm text-ink/55">Roster to be announced.</p>
          ) : (
            <>
              <div className="mt-4">
                {team.coPortfolioManagers && team.coPortfolioManagers.length ? (
                  <>
                    <h3 className="text-base font-medium text-ink">Co-Portfolio Managers</h3>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {team.coPortfolioManagers.map((cpm, idx) => (
                        <span key={idx} className="border border-rule px-4 py-2.5 font-medium text-ink">{cpm.name}</span>
                      ))}
                    </div>
                  </>
                ) : team.portfolioManager ? (
                  <>
                    <h3 className="text-base font-medium text-ink">Portfolio Manager</h3>
                    <div className="mt-3">
                      <span className="border border-rule px-4 py-2.5 font-medium text-ink">{team.portfolioManager.name}</span>
                    </div>
                  </>
                ) : null}
              </div>
              {rosterList.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-base font-medium text-ink">{usingMembers ? 'Members' : 'Analysts'}</h3>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {rosterList.map((a, i) => (
                      <span key={i} className="border border-rule px-4 py-2.5 text-sm font-medium text-ink/85">{a.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {hasReports && (
          <section className="panel p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-ink">Research &amp; Reports</h2>
            <ul className="mt-4 space-y-2">
              {team.reports.map((r, i) => (
                <li key={i}>
                  <a className="text-goldA underline hover:text-goldB" href={r.url} target="_blank" rel="noreferrer noopener">{r.title}</a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
