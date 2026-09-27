import React, { useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';
import { PERFORMANCE_2025 } from '../data.js';

function ReturnCard({ item }) {
  const max = Math.max(item.return, item.benchmark.return) * 1.08;
  return (
    <div className="border-t-2 border-goldA bg-panel p-7">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-goldA">{item.label}</div>
      <div className="my-2 font-serif text-[2.6rem] font-semibold leading-none text-ink">+{item.return}%</div>
      <div className="mt-5 space-y-2.5">
        <div>
          <div className="flex items-baseline justify-between text-[12px]">
            <span className="font-medium text-ink/70">QHF</span>
            <span className="font-mono text-ink/70">{item.return}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full bg-rule">
            <div className="h-full bg-ink" style={{ width: `${(item.return / max) * 100}%` }} />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between text-[12px]">
            <span className="text-ink/50">{item.benchmark.label}</span>
            <span className="font-mono text-ink/50">{item.benchmark.return}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full bg-rule">
            <div className="h-full bg-ink/25" style={{ width: `${(item.benchmark.return / max) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Performance() {
  const ref = useRef(null);
  useEffect(() => revealOnScroll(ref.current, { translateY: 16 }), []);
  const { returns, stats, year } = PERFORMANCE_2025;

  return (
    <section id="performance" ref={ref} className="border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 max-w-2xl">
          <div className="h-px w-10 bg-goldA mb-5" />
          <h2 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">2025 Performance</h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-ink/70">
            Results from our {year.replace('FY', '')} Canadian and American equity portfolios, benchmarked against the S&amp;P/TSX Composite and S&amp;P 500.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
          {returns.map((item) => <ReturnCard key={item.label} item={item} />)}
        </div>

        <div className="mt-px grid grid-cols-2 gap-px border-x border-b border-rule bg-rule sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-panel p-5">
              <div className="font-serif text-2xl font-semibold text-ink">{s.value}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">{s.label}</div>
              {s.sublabel && <div className="mt-0.5 text-[11px] text-ink/40">{s.sublabel}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
