import React, { useRef, useEffect, useState } from 'react';
import { revealOnScroll } from '../lib/animation.js';
import { Linkedin, X } from 'lucide-react';
import { getHeadshot } from '../lib/headshots.js';

const getInitials = (name = '') => name.split(' ').map((n) => n[0]).filter(Boolean).join('').slice(0, 2).toUpperCase();

const founders = [
  { name: 'Anson El Ayari', title: 'Co-Founder', bio: '', linkedin: 'https://www.linkedin.com/in/anson-el-ayari/' },
  { name: 'Nikhil Naran', title: 'Co-Founder', bio: '', linkedin: 'https://www.linkedin.com/in/nikhilnaran/' },
  { name: 'Ava El Ayari', title: 'Co-Founder', bio: '', linkedin: 'https://www.linkedin.com/in/ava-el-ayari/' },
].map((founder) => ({ ...founder, headshot: getHeadshot(founder.name) }));

function Headshot({ person, className = '', initialsClass = '' }){
  const src = person?.headshot;
  return (
    <div className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-goldA/20 to-goldB/10 text-goldB ${className}`}>
      {src ? (
        <img src={src} alt={`${person.name} headshot`} className="headshot-img absolute inset-0 h-full w-full" />
      ) : (
        <span className={`relative z-10 font-black tracking-widest ${initialsClass}`}>{getInitials(person?.name)}</span>
      )}
    </div>
  );
}

export default function Founders(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);
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
    <section id="founders" ref={ref} className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Founders</h2>
        <p className="text-slate-300 mt-2 max-w-2xl">Meet the students who started QHF.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {founders.map((f, i) => (
            <div key={i} className="glass rounded-2xl border border-white/10 p-5 sm:p-6 team-card">
              <button onClick={()=> setSelected(i)} className="text-left w-full">
                <Headshot person={f} className="mb-4 flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28" initialsClass="text-2xl" />
                <div className="font-semibold">{f.name}</div>
                <div className="text-sm text-slate-300">{f.title}</div>
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
                className="fixed inset-0 z-50"
                onClick={(e)=> { if (e.target === e.currentTarget) setSelected(null); }}
              >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={()=> setSelected(null)} />
                <div className="relative z-10 flex h-full w-full overflow-y-auto">
                  <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-12 md:py-16">
                    <div className="founder-modal glass relative w-full overflow-hidden rounded-3xl border border-white/12 shadow-glass">
                      <div className="founder-modal__glow" aria-hidden="true" />
                      <button
                        ref={closeBtnRef}
                        aria-label="Close"
                        onClick={()=> setSelected(null)}
                        className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 text-slate-100 transition hover:bg-black/30 hover:text-white"
                      >
                        <X />
                      </button>
                      <div className="relative grid gap-10 px-6 pb-10 pt-16 md:grid-cols-[320px_minmax(0,1fr)] md:gap-16 md:px-12 md:pt-20">
                        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
                          <Headshot person={f} className="flex h-28 w-28 items-center justify-center rounded-2xl md:h-32 md:w-32" initialsClass="text-3xl md:text-4xl" />
                          <div>
                            <div className="text-2xl font-semibold text-slate-50 md:text-3xl">{f.name}</div>
                            <div className="mt-1 text-sm uppercase tracking-[0.3em] text-goldB/80">{f.title}</div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center gap-6 md:pr-6">
                          <div className="flex flex-wrap items-center gap-3">
                            {f.linkedin && (
                              <a
                                href={f.linkedin}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/20"
                              >
                                <Linkedin size={16}/> Connect on LinkedIn
                              </a>
                            )}
                            <button onClick={()=> setSelected(null)} className="btn">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
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
