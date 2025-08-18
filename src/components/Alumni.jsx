import React, { useEffect, useRef } from 'react';
import { alumniStats, sponsors } from '../data.js';
import { countTo } from '../lib/animation.js';

export default function Alumni(){
  const aRef = useRef(null), cRef = useRef(null), iRef = useRef(null);
  useEffect(()=>{ countTo(aRef.current, alumniStats.alumniCount, {}); countTo(cRef.current, alumniStats.cities, {}); countTo(iRef.current, alumniStats.industries, {}); },[]);
  return (
    <section id="alumni" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Alumni & Outcomes</h2>
        <div className="mt-6 grid sm:grid-cols-3 gap-6">
          <Stat label="Alumni" refEl={aRef} suffix="+" />
          <Stat label="Cities" refEl={cRef} />
          <Stat label="Industries" refEl={iRef} />
        </div>
        <div className="mt-8 glass rounded-2xl p-4 border border-white/10 overflow-hidden">
          <div className="flex items-center gap-10 animate-[scroll_30s_linear_infinite]" style={{ whiteSpace: 'nowrap' }}>
            {sponsors.concat(sponsors).map((s, i)=> (
              <div key={i} className="inline-flex items-center gap-3 opacity-80 hover:opacity-100">
                <div className="w-28 h-10 rounded bg-white/10 border border-white/10" aria-label={`${s.name} logo placeholder`}></div>
                <span className="text-sm text-slate-300">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes scroll { 0%{ transform: translateX(0);} 100%{ transform: translateX(-50%);} }`}</style>
    </section>
  );
}

function Stat({ label, refEl, suffix='' }){
  return (
    <div className="glass rounded-2xl p-6 border border-white/10 text-center">
      <div className="text-4xl font-extrabold"><span ref={refEl}>0</span>{suffix}</div>
      <div className="text-sm text-slate-300 mt-1">{label}</div>
    </div>
  );
}