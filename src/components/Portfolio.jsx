import React, { useEffect, useRef, useState } from 'react';
import { portfolio as data } from '../data.js';
import Tooltip from './Tooltip.jsx';
import { countTo } from '../lib/animation.js';

export default function Portfolio(){
  const total = data.reduce((a,b)=> a + b.allocation, 0);
  const [hover, setHover] = useState(null);
  const ytdRef = useRef(null);
  useEffect(()=>{ countTo(ytdRef.current, 8, { formatter: (n)=> `${Math.round(n)}%`}); },[]);

  return (
    <section id="portfolio" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Portfolio</h2>
            <p className="text-slate-200/90">Live allocation (sample data)</p>
          </div>
          <div className="glass rounded-xl px-4 py-3 border border-white/10">
            <div className="text-sm text-slate-300">Outperformed benchmark YTD</div>
            <div className="text-2xl font-extrabold"><span ref={ytdRef}>0%</span></div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="space-y-3">
              {data.map((row, idx) => (
                <Bar key={row.ticker} row={row} idx={idx} onHover={setHover} hover={hover}/>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 overflow-x-auto">
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
                {data.map((r)=> (
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
      </div>
    </section>
  );
}

function Bar({ row, idx, onHover, hover }){
  const ref = useRef(null);
  const [w, setW] = useState('0%');
  const [showTip, setShowTip] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting){
          setTimeout(()=> setW(row.allocation + '%'), idx * 80);
        }
      });
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [row.allocation, idx]);

  return (
    <div ref={ref} className="relative" onMouseEnter={()=>{ onHover(row.ticker); setShowTip(true); }} onMouseLeave={()=>{ onHover(null); setShowTip(false); }}>
      <div className="flex justify-between text-sm mb-1"><span className="font-medium">{row.company}</span><span>{row.allocation}%</span></div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: w, background: 'linear-gradient(90deg, #C5A16D, #E2C784)'}}></div>
      </div>
      {showTip && hover===row.ticker && (
        <div className="relative">
          <Tooltip text={`${row.ticker} • ${row.allocation}% • YTD ${row.performance}%`} />
        </div>
      )}
    </div>
  );
}