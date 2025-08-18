import React, { useRef, useEffect, useState } from 'react';
import { revealOnScroll } from '../lib/animation.js';
import { Linkedin, X } from 'lucide-react';

export default function Founders(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);
  const founders = [
  { name: 'Anson El Ayari', title: 'Co-Founder', bio: 'Placeholder bio for Anson.', linkedin: '#' },
  { name: 'Nikhil Naran', title: 'Co-Founder', bio: 'Placeholder bio for Nikhil.', linkedin: '#' },
  { name: 'Ava El Ayari', title: 'Co-Founder', bio: 'Placeholder bio for Ava.', linkedin: '#' },
  ];
  const [selected, setSelected] = useState(null); // will store selected index or null
  const closeBtnRef = useRef(null);

  // focus close button when modal opens
  useEffect(()=>{
    if (selected !== null) {
      // small timeout so element is in DOM
      setTimeout(()=> closeBtnRef.current?.focus(), 50);
      const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [selected]);

  // lock body scroll while modal is open
  useEffect(()=>{
    if (selected !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [selected]);

  return (
    <section id="founders" ref={ref} className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Founders</h2>
        <p className="text-slate-300 mt-2 max-w-2xl">Meet the students who started QHF.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {founders.map((f, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-white/10 team-card">
              <button onClick={()=> setSelected(i)} className="text-left w-full">
                <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-goldA/20 to-goldB/10 flex items-center justify-center text-2xl font-black text-goldB mb-4">
                  {f.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div className="font-semibold">{f.name}</div>
                <div className="text-sm text-slate-300">{f.title}</div>
                <p className="mt-3 text-sm text-slate-300">{f.bio}</p>
              </button>
              {f.linkedin && (
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${f.name} LinkedIn`}
                  className="mt-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-slate-100"
                >
                  <Linkedin size={16} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* modal popup */}
        {selected !== null && (
          (() => {
            const f = founders[selected];
            return (
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`${f.name} details`}
                className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-6"
                onClick={(e)=> { if (e.target === e.currentTarget) setSelected(null); }}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <div className="relative z-10 max-w-3xl w-full glass rounded-2xl p-8 border border-white/10 shadow-glass">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-goldA/20 to-goldB/10 flex items-center justify-center text-3xl font-black text-goldB">
                        {f.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{f.name}</div>
                        <div className="text-sm text-slate-300">{f.title}</div>
                      </div>
                    </div>
                    <button ref={closeBtnRef} aria-label="Close" onClick={()=> setSelected(null)} className="p-2 rounded-full hover:bg-white/5">
                      <X />
                    </button>
                  </div>
                  <div className="mt-6 text-slate-200/90">
                    <p>{f.bio}</p>
                    <p className="mt-4 text-sm text-slate-300">More detailed bio and roles can be shown here. Add education, notable projects, and contact info as needed.</p>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    {f.linkedin && (
                      <a href={f.linkedin} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/6">
                        <Linkedin size={16}/> View on LinkedIn
                      </a>
                    )}
                    <button onClick={()=> setSelected(null)} className="ml-auto btn">Close</button>
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </section>
  );
}
