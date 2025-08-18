import React, { useState } from 'react';
import { events } from '../data.js';
import { ChevronDown } from 'lucide-react';

export default function Events(){
  const [open, setOpen] = useState(null);
  return (
    <section id="events" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Events</h2>
        <div className="mt-6 space-y-4">
          {events.map((e,i)=> (
            <div key={i} className="glass rounded-2xl border border-white/10">
              <button aria-expanded={open===i} aria-controls={`ev-${i}`} onClick={()=> setOpen(open===i? null : i)} className="w-full flex items-center justify-between px-6 py-4">
                <div className="text-left">
                  <div className="font-semibold">{e.title}</div>
                  <div className="text-sm text-slate-300">{new Date(e.dateISO).toLocaleDateString()} • {e.location}</div>
                </div>
                <ChevronDown className={`transition-transform ${open===i?'rotate-180':''}`}/>
              </button>
              <div id={`ev-${i}`} className="px-6 pb-6" hidden={open!==i}>
                <p className="text-slate-200/90">{e.description}</p>
                <div className="mt-3 flex gap-3 text-sm">
                  <a href="#" className="underline">Add to Google</a>
                  <a href="#" className="underline">Add to Apple</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}