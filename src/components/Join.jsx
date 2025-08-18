import React, { useState, useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';

export default function Join(){
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);
  return (
    <section id="join" ref={ref} className="py-20">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8 items-start">
        <div className="glass rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold">Join Us</h2>
          <ul className="mt-4 list-disc list-inside text-slate-200/90 space-y-1">
            <li>Undergraduate students at Queen's University</li>
            <li>Applications open each Fall term</li>
            <li>Equity research case + interview</li>
          </ul>
          <p className="mt-4 text-sm text-slate-300">We welcome all programs. Commitment and curiosity matter most.</p>
        </div>
        <form name="contact" method="POST" data-netlify="true" className="glass rounded-2xl p-8 border border-white/10" onSubmit={(e)=>{e.preventDefault(); setSent(true);}}>
          <input type="hidden" name="form-name" value="contact" />
          <h3 className="text-2xl font-semibold">Contact Us</h3>
          {!sent ? (
            <div className="mt-4 grid gap-3">
              <label className="text-sm">Name<input required name="name" className="mt-1 w-full bg-white/5 border border-white/10 rounded px-3 py-2"/></label>
              <label className="text-sm">Email<input required type="email" name="email" className="mt-1 w-full bg-white/5 border border-white/10 rounded px-3 py-2"/></label>
              <label className="text-sm">Message<textarea required name="message" rows="4" className="mt-1 w-full bg-white/5 border border-white/10 rounded px-3 py-2"></textarea></label>
              <button className="mt-2 btn">Send</button>
            </div>
          ) : (
            <div className="mt-4 text-green-300">Thanks! We&apos;ll be in touch.</div>
          )}
        </form>
      </div>
    </section>
  );
}