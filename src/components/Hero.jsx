import React, { useEffect, useRef } from 'react';
import { revealOnScroll } from '../lib/animation.js';
import { asset } from '../lib/assets.js';
import { PERFORMANCE_2025 } from '../data.js';

const [canadianEquity, americanEquity] = PERFORMANCE_2025.returns;
const [sharpe] = PERFORMANCE_2025.stats;

export default function Hero() {
  const ref = useRef(null);
  useEffect(() => revealOnScroll(ref.current, { translateY: 16, delay: 80 }), []);

  return (
    <header
      id="hero"
      className="relative overflow-hidden border-b border-rule bg-cover bg-no-repeat text-paper"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(18,14,11,0.42) 0%, rgba(18,14,11,0.60) 48%, rgba(15,11,9,0.86) 100%), url('${asset('hero-campus.jpg')}')`,
        backgroundPosition: 'center, 72% 42%',
      }}
    >
      <div className="relative z-[2] mx-auto max-w-7xl px-4 py-24 sm:py-28">
        <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
          Student Managed, Multi-Strategy Investing
        </h1>
        <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-paper/85 sm:text-[17px]">
          PM teams run independent strategies across global equities, fixed income, commodities, foreign exchange, and crypto.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#about" className="btn hero-btn-primary">Learn More</a>
          <a href="#philosophy" className="btn btn-ghost hero-btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' }}>Our Strategy</a>
        </div>

        <div ref={ref} className="reveal mt-12 grid max-w-xl grid-cols-3 border-t border-white/20">
          <Stat value={`+${canadianEquity.return}%`} label="Canadian Equity, FY2025" first />
          <Stat value={`+${americanEquity.return}%`} label="American Equity, FY2025" />
          <Stat value={sharpe.value} label={sharpe.label} />
        </div>
      </div>
    </header>
  );
}

function Stat({ value, label, first = false }) {
  return (
    <div className={`py-6 pr-4 ${first ? '' : 'border-l border-white/20 pl-5'}`}>
      <div className="font-serif text-[1.6rem] font-semibold text-white">{value}</div>
      <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.06em] text-paper/55">{label}</div>
    </div>
  );
}
