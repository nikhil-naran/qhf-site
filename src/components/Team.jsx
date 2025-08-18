import React, { useState } from 'react';

const team = [
  { name: 'Ava Chen', title: 'President', imageUrl: '', bio: 'Leads the fund and partnerships. Interned at a Canadian pension plan.' },
  { name: 'Omar Singh', title: 'Head of Research', imageUrl: '', bio: 'Drives deep value research and mentorship.' },
  { name: 'Maya Patel', title: 'Portfolio Manager', imageUrl: '', bio: 'Focus on concentrated, high-conviction positions.' },
  { name: 'Liam O’Reilly', title: 'Risk Lead', imageUrl: '', bio: 'Builds risk frameworks and monitoring dashboards.' },
];

export default function Team(){
  const [modal, setModal] = useState(null);
  return (
    <section id="team" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Team</h2>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((m,i)=> (
            <button key={i} onClick={()=> setModal(m)} className="text-left glass rounded-2xl p-4 border border-white/10 hover:-translate-y-1 transition-transform">
              <div className="h-28 rounded-xl bg-gradient-to-br from-goldA/20 to-goldB/10 flex items-center justify-center animate-float">
                <span className="text-3xl font-black text-goldB">{m.name.split(' ').map(n=>n[0]).join('')}</span>
              </div>
              <div className="mt-3 font-semibold">{m.name}</div>
              <div className="text-sm text-slate-300">{m.title}</div>
            </button>
          ))}
        </div>
      </div>
      {modal && <Modal person={modal} onClose={()=> setModal(null)} />}
    </section>
  );
}

function Modal({ person, onClose }){
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="max-w-lg w-full glass rounded-2xl border border-white/10 p-6" onClick={(e)=> e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xl font-semibold">{person.name}</div>
          <button onClick={onClose} className="text-sm underline">Close</button>
        </div>
        <div className="text-sm text-slate-300">{person.title}</div>
        <p className="mt-4">{person.bio}</p>
      </div>
    </div>
  );
}