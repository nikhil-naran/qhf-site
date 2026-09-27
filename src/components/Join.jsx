import React, { useState, useRef, useEffect } from 'react';
import { revealOnScroll } from '../lib/animation.js';

export default function Join(){
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 16 }), []);
  return (
    <section id="join" ref={ref} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px w-10 bg-goldA mb-5" />
        <h2 className="font-serif text-4xl font-semibold text-ink sm:text-5xl mb-10">Join Us</h2>
        <div className="grid items-start gap-6 md:grid-cols-2 md:gap-10">
          <div className="panel p-6 sm:p-10">
            <h3 className="text-xl font-semibold text-ink">Eligibility</h3>
            <ul className="mt-5 space-y-2.5">
              {['Undergraduate students at Queen\'s University', 'Applications open each Fall term', 'Equity research case + interview'].map((item) => (
                <li key={item} className="flex gap-2.5 text-[14.5px] text-ink/70">
                  <span className="mt-[7px] h-[3px] w-[3px] flex-none rounded-full bg-goldA" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-ink/55">
              We welcome all programs. Commitment and curiosity matter most for Queen's Hedge Fund candidates, so connect with us early if you have questions about the hedge fund recruiting path.
            </p>
          </div>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="panel p-6 sm:p-10"
            onSubmit={(e)=>{e.preventDefault(); setSent(true);}}
          >
            <input type="hidden" name="form-name" value="contact" />
            <h3 className="text-xl font-semibold text-ink">Contact Us</h3>
            {!sent ? (
              <div className="mt-5 grid gap-4">
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50">
                  Name
                  <input required name="name" className="mt-2 w-full border border-rule bg-paper px-4 py-3 text-[15px] text-ink placeholder-ink/30 focus:border-goldA focus:outline-none transition"/>
                </label>
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50">
                  Email
                  <input required type="email" name="email" className="mt-2 w-full border border-rule bg-paper px-4 py-3 text-[15px] text-ink placeholder-ink/30 focus:border-goldA focus:outline-none transition"/>
                </label>
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50">
                  Message
                  <textarea required name="message" rows="4" className="mt-2 w-full border border-rule bg-paper px-4 py-3 text-[15px] text-ink placeholder-ink/30 focus:border-goldA focus:outline-none transition"></textarea>
                </label>
                <button className="mt-2 btn self-start">Send</button>
              </div>
            ) : (
              <div className="mt-5 text-goldA">Thanks! We&apos;ll be in touch.</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
