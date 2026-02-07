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
  { name: 'Blue Owl Capital', logo: asset('logos/blue-owl-capital.png') }
];

function LogoItem({ company }) {
  return (
    <div className="marquee-item flex flex-col items-center gap-3 px-6 sm:px-8">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg sm:h-24 sm:w-24">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          loading="lazy"
          className="h-full w-full object-contain p-3 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>
      <span className="text-sm text-slate-300 font-medium text-center leading-tight whitespace-nowrap">{company.name}</span>
    </div>
  );
}

export default function Alumni() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  useEffect(() => revealOnScroll(ref.current, { translateY: 28 }), []);

  const reduce = prefersReducedMotion();

  // If reduced motion, fall back to a static grid
  if (reduce) {
    return (
      <section id="alumni" ref={ref} className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-px w-12 bg-goldA/60 mb-6" />
          <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl">Member Placements</h2>
          <p className="text-slate-300 mt-3 max-w-2xl">Current and past placements from Queen's Hedge Fund members.</p>
          <div className="mt-10 glass overflow-hidden rounded-2xl border border-white/[0.07] p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {placements.map((company) => (
                <div key={company.name} className="flex flex-col items-center gap-3 rounded-xl p-4">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg sm:h-24 sm:w-24">
                    <img src={company.logo} alt={`${company.name} logo`} loading="lazy" className="h-full w-full object-contain p-3" />
                  </div>
                  <span className="text-sm text-slate-300 font-medium text-center leading-tight">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="alumni" ref={ref} className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px w-12 bg-goldA/60 mb-6" />
        <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl">Member Placements</h2>
        <p className="text-slate-300 mt-3 max-w-2xl">Current and past placements from Queen's Hedge Fund members.</p>
        <div className="mt-10">
          <div className="glass overflow-hidden rounded-2xl border border-white/[0.07] py-8 sm:py-10 group">
            <div ref={trackRef} className="marquee-track flex w-max">
              {[...placements, ...placements].map((company, i) => (
                <LogoItem key={`${company.name}-${i}`} company={company} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
