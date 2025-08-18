import React from 'react';
import { Linkedin } from 'lucide-react';

export default function Founders(){
  const founders = [
  { name: 'Anson El Ayari', title: 'Co-Founder', bio: 'Placeholder bio for Anson.', linkedin: '#' },
  { name: 'Nikhil Naran', title: 'Co-Founder', bio: 'Placeholder bio for Nikhil.', linkedin: '#' },
  { name: 'Ava El Ayari', title: 'Co-Founder', bio: 'Placeholder bio for Ava.', linkedin: '#' },
  ];

  return (
    <section id="founders" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Founders</h2>
        <p className="text-slate-300 mt-2 max-w-2xl">Meet the students who started QHF.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {founders.map((f, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-white/10">
              <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-goldA/20 to-goldB/10 flex items-center justify-center text-2xl font-black text-goldB mb-4">
                {f.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div className="font-semibold">{f.name}</div>
              <div className="text-sm text-slate-300">{f.title}</div>
                <p className="mt-3 text-sm text-slate-300">{f.bio}</p>
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
      </div>
    </section>
  );
}
