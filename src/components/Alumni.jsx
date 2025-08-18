import React, { useEffect, useRef } from 'react';
import { alumniStats, sponsors } from '../data.js';
import { countTo } from '../lib/animation.js';

export default function Alumni(){
  // Reworked as a Placements section (current / past) with partner logos
  const current = [
    { name: 'Questrade', file: '/questrade.png' },
    { name: 'Richardson Wealth', file: '/richardson.png' },
    { name: 'RBC', file: '/rbc.png' }
  ];
  const past = [
    'Summer Interns at Questrade',
    'Analyst placements at RBC',
    'Advisory roles at Richardson Wealth'
  ];

  return (
    <section id="alumni" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Placements — Current & Past</h2>
        <div className="mt-6">
          <div className="glass rounded-2xl p-6 border border-white/10 overflow-hidden">
            <h3 className="text-xl font-semibold mb-4">Current Placements</h3>
            <div className="overflow-hidden">
              {/* marquee wrapper limits visible area to 3 tiles; track is duplicated for seamless looping */}
              <div className="marquee-wrapper">
                <div className="marquee-track" style={{ whiteSpace: 'nowrap' }}>
                  {(
                    [
                      'Questrade','RBC','Richardson Wealth','TD','BMO','CIBC','Scotiabank','Fidelity','Manulife','Sun Life','Brookfield','BlackRock','Morgan Stanley','Goldman Sachs','National Bank','PI Financial','RBC Capital Markets','Desjardins','Crestone','ATB Financial','HSBC','Simplii','Wealthsimple','Interactive Brokers','Vanguard'
                    ]
                  ).concat([
                    'Questrade','RBC','Richardson Wealth','TD','BMO','CIBC','Scotiabank','Fidelity','Manulife','Sun Life','Brookfield','BlackRock','Morgan Stanley','Goldman Sachs','National Bank','PI Financial','RBC Capital Markets','Desjardins','Crestone','ATB Financial','HSBC','Simplii','Wealthsimple','Interactive Brokers','Vanguard'
                  ]).map((name, i) => (
                    <div key={i} className="marquee-item inline-flex items-center gap-3 opacity-95 hover:opacity-100 rounded-lg bg-white/3 border border-white/6">
                      <div className="shrink-0 marquee-logo rounded bg-white/6 border border-white/10 flex items-center justify-center text-sm text-slate-800">{name.split(' ')[0]}</div>
                      <span className="text-sm text-slate-200 px-3 py-2">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}