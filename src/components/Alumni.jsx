import React, { useEffect, useRef } from 'react';
import { revealOnScroll, prefersReducedMotion } from '../lib/animation.js';
import { asset } from '../lib/assets.js';

const placements = [
  { name: 'RBC', logo: asset('logos/rbc.png') },
  { name: 'Questrade', logo: asset('logos/questrade.png') },
  { name: 'TD', logo: asset('logos/td.png') },
  { name: 'Manulife', logo: asset('logos/manulife.png') },
  { name: 'Richardson Wealth', logo: asset('logos/richardson-wealth.png') },
  { name: 'ENGIE Global Markets', logo: asset('logos/engie-global-markets.png') },
  { name: 'Two Sigma', logo: asset('logos/two-sigma.png') },
  { name: 'DWP Capital', logo: asset('logos/dwp-capital.png') },
  { name: 'Blue Owl Capital', logo: asset('logos/blue-owl-capital.png') },
  { name: 'Northleaf', logo: null },
  { name: 'TD Securities', logo: asset('logos/td.png') },
  { name: 'National Bank of Canada Capital Markets', logo: asset('logos/national-bank.png') },
  { name: 'CIBC Capital Markets', logo: asset('logos/cibc.png') },
  { name: 'RBC Capital Markets', logo: asset('logos/rbc-capital-markets.png') },
  { name: 'Orla Mining', logo: null },
  { name: 'Kinross Gold', logo: asset('logos/kinross-gold.jpg') },
  { name: 'PJT Partners', logo: asset('logos/pjt-partners.png') },
  { name: 'Vencora', logo: null },
  { name: 'EY', logo: asset('logos/ey.svg') },
  { name: 'Agnico Eagle Mines Ltd', logo: asset('logos/agnico-eagle.svg') },
  { name: 'CI Global Asset Management', logo: asset('logos/ci-global-asset-management.svg') },
  { name: 'Canadian Natural Resources Ltd (CNRL)', logo: asset('logos/cnrl.svg') },
];

const getInitials = (name = '') => name.replace(/\([^)]*\)/g, '').trim().split(' ')
  .filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join('') || name.slice(0, 2).toUpperCase();

function LogoItem({ company }) {
  return (
    <div className="flex flex-none items-center gap-3.5 px-8 py-8">
      <div className="flex h-11 w-11 flex-none items-center justify-center border border-rule bg-white">
        {company.logo ? (
          <img src={company.logo} alt="" loading="lazy" className="h-full w-full object-contain p-2" />
        ) : (
          <span className="font-mono text-xs font-semibold text-ink/35">{getInitials(company.name)}</span>
        )}
      </div>
      <span className="whitespace-nowrap text-[14px] font-medium text-ink/75">{company.name}</span>
    </div>
  );
}

export default function Alumni() {
  const ref = useRef(null);
  useEffect(() => revealOnScroll(ref.current, { translateY: 16 }), []);
  const reduce = prefersReducedMotion();

  return (
    <section id="alumni" ref={ref} className="border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px w-10 bg-goldA mb-5" />
        <h2 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">Member Placements</h2>
        <p className="mt-4 max-w-2xl text-ink/60">Current and past placements from Queen's Hedge Fund members.</p>
      </div>

      {reduce ? (
        <div className="mx-auto mt-10 max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-4">
            {placements.map((company) => (
              <div key={company.name} className="flex flex-col items-center gap-3 bg-panel px-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center border border-rule bg-white">
                  {company.logo ? (
                    <img src={company.logo} alt="" loading="lazy" className="h-full w-full object-contain p-2" />
                  ) : (
                    <span className="font-mono text-xs font-semibold text-ink/35">{getInitials(company.name)}</span>
                  )}
                </div>
                <span className="text-[13px] font-medium leading-tight text-ink/70">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative mt-10 overflow-hidden border-y border-rule group">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent sm:w-28" />
          <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
            {[...placements, ...placements].map((company, i) => (
              <LogoItem key={`${company.name}-${i}`} company={company} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
