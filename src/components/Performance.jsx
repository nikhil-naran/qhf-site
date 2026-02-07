import React, { useMemo, useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { perfSeries } from '../data.js';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function buildSeries(a, b, ka, kb) {
  return months.map((m, i) => ({ month: m, [ka]: a[i], [kb]: b[i] }));
}

export default function Performance(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);
  const ca = useMemo(() => buildSeries(perfSeries.canadian.our, perfSeries.canadian.tsx, 'QHF', 'S&P/TSX'), []);
  const us = useMemo(() => buildSeries(perfSeries.us.our, perfSeries.us.sp500, 'QHF', 'S&P 500'), []);

  const reduce = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches || JSON.parse(localStorage.getItem('qhf-reduce-motion') || 'false')
    : false;

  return (
    <section className="py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Our Performance</h2>
        <p className="text-slate-200/90 mt-2">Comparing our funds to standard market indexes (sample data).</p>

        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-4 sm:p-6 border border-white/10">
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Canadian Portfolio vs S&amp;P/TSX Composite</h3>
            <div className="h-52 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ca} margin={{ top: 10, left: 0, right: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="QHF" stroke="#E2C784" dot={false} isAnimationActive={!reduce} />
                  <Line type="monotone" dataKey="S&P/TSX" stroke="#C5A16D" dot={false} isAnimationActive={!reduce} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-2xl p-4 sm:p-6 border border-white/10">
            <h3 className="font-semibold mb-4 text-sm sm:text-base">US Portfolio vs S&amp;P 500</h3>
            <div className="h-52 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={us} margin={{ top: 10, left: 0, right: 10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="QHF" stroke="#E2C784" dot={false} isAnimationActive={!reduce} />
                  <Line type="monotone" dataKey="S&P 500" stroke="#C5A16D" dot={false} isAnimationActive={!reduce} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}