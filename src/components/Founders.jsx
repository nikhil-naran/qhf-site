import React, { useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';
import { Linkedin } from 'lucide-react';

const founders = [
  { name: 'Anson El Ayari', title: 'Co-Founder', bio: '', linkedin: 'https://www.linkedin.com/in/anson-el-ayari/' },
  { name: 'Nikhil Naran', title: 'Co-Founder', bio: '', linkedin: 'https://www.linkedin.com/in/nikhilnaran/' },
  { name: 'Ava El Ayari', title: 'Co-Founder', bio: '', linkedin: 'https://www.linkedin.com/in/ava-el-ayari/' },
];

export default function Founders(){
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 16 }), []);

  return (
    <section id="founders" ref={ref} className="border-b border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px w-10 bg-goldA mb-5" />
        <h2 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">Founders</h2>
        <p className="mt-4 max-w-2xl text-ink/60">The people behind QHF.</p>
        <div className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-3">
          {founders.map((f, i) => (
            <div key={i} className="flex flex-col gap-4 bg-panel p-6">
              <div>
                <div className="font-semibold text-ink">{f.name}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/45">{f.title}</div>
              </div>
              {f.bio && (
                <p className="text-[13px] leading-relaxed text-ink/65">{f.bio}</p>
              )}
              {f.linkedin && (
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${f.name} LinkedIn`}
                  className="mt-auto inline-flex w-fit items-center gap-2 border border-rule px-3 py-2 text-xs font-medium text-ink/70 hover:border-goldA hover:text-goldA transition-colors"
                >
                  <Linkedin size={14} />
                  Connect
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
