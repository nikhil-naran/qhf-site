import React, { useState, useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';

export default function Join(){
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);
  return (
    <section id="join" ref={ref} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px w-12 bg-goldA/60 mb-6" />
        <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl mb-10">Join Us</h2>
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
          <div className="glass rounded-2xl border border-white/[0.07] p-8 sm:p-10">
            <h3 className="text-2xl font-semibold text-white">Eligibility</h3>
            <ul className="mt-5 list-disc list-inside text-slate-200/90 space-y-2">
              <li>Undergraduate students at Queen's University</li>
              <li>Applications open each Fall term</li>
              <li>Equity research case + interview</li>
            </ul>
            <p className="mt-5 text-sm text-slate-300 leading-relaxed">
              We welcome all programs. Commitment and curiosity matter most for Queen's Hedge Fund candidates, so connect with us early if you have questions about the hedge fund recruiting path.
            </p>
          </div>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="glass rounded-2xl border border-white/[0.07] p-8 sm:p-10"
            onSubmit={(e)=>{e.preventDefault(); setSent(true);}}
          >
            <input type="hidden" name="form-name" value="contact" />
            <h3 className="text-2xl font-semibold text-white">Contact Us</h3>
            {!sent ? (
              <div className="mt-5 grid gap-4">
                <label className="text-sm text-slate-200/90">
                  Name
                  <input required name="name" className="mt-1.5 w-full bg-white/5 border border-white/[0.07] rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-400/60 focus:border-goldA/50 focus:ring-1 focus:ring-goldA/30 focus:outline-none transition"/>
                </label>
                <label className="text-sm text-slate-200/90">
                  Email
                  <input required type="email" name="email" className="mt-1.5 w-full bg-white/5 border border-white/[0.07] rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-400/60 focus:border-goldA/50 focus:ring-1 focus:ring-goldA/30 focus:outline-none transition"/>
                </label>
                <label className="text-sm text-slate-200/90">
                  Message
                  <textarea required name="message" rows="4" className="mt-1.5 w-full bg-white/5 border border-white/[0.07] rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-400/60 focus:border-goldA/50 focus:ring-1 focus:ring-goldA/30 focus:outline-none transition"></textarea>
                </label>
                <button className="mt-2 btn">Send</button>
              </div>
            ) : (
              <div className="mt-5 text-green-300">Thanks! We&apos;ll be in touch.</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
