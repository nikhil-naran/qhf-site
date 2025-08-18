import React from 'react';
import { useParams } from 'react-router-dom';
import { TEAMS } from '../data.js';

export default function TeamPage(){
  const { slug } = useParams();
  const team = TEAMS[slug];
  if (!team) {
    return (
      <main className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold">Team not found</h1>
          <p className="text-slate-300 mt-2">Check the URL or pick from the Teams hub.</p>
        </div>
      </main>
    );
  }
  return (
    <main className="py-24">
      <div className="mx-auto max-w-7xl px-4 space-y-10">
        <header>
          <h1 className="text-4xl font-extrabold">{team.name}</h1>
          <p className="text-slate-300 mt-2">Holdings, team members, and research &amp; reports.</p>
        </header>

        {/* A) Team Portfolio Holdings */}
        <section className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-semibold">Portfolio Holdings</h2>
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
        </section>

        {/* B) The Team */}
        <section className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-semibold">The Team</h2>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Portfolio Manager</h3>
            <div className="mt-3 grid sm:grid-cols-[96px_1fr] gap-4 items-center">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-goldA/20 to-goldB/10" aria-label="Headshot placeholder" />
              <div>
                <div className="font-semibold">{team.portfolioManager.name}</div>
                <p className="text-sm text-slate-300">{team.portfolioManager.bio}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium">Analysts</h3>
            <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.analysts.map((a, i)=> (
                <div key={i} className="glass rounded-xl p-4 border border-white/10">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-goldA/20 to-goldB/10 mb-3" aria-label="Headshot placeholder" />
                  <div className="font-semibold">{a.name}</div>
                  <p className="text-sm text-slate-300">{a.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* C) Research & Reports */}
        <section className="glass rounded-2xl p-6 border border-white/10">
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