import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas.jsx';
import { prefersReducedMotion } from '../lib/animation.js';
import { asset } from '../lib/assets.js';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[82vh] items-start overflow-hidden pt-20 pb-32 sm:pt-24 sm:pb-36 md:min-h-[92vh]"
    >
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true"></div>
      <div className="hero-noise"></div>
      <ParticleCanvas />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-8 pb-24 sm:pt-10 sm:pb-28 lg:pt-12 lg:pb-32">
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            <h1 className="sr-only">Queen's Hedge Fund</h1>
            <img
              src={asset('QHF-2.svg')}
              alt="Queen's Hedge Fund crest"
              loading="eager"
              className="w-[19rem] max-w-[92vw] object-contain drop-shadow-[0_20px_60px_rgba(8,15,30,0.35)] sm:w-[23rem] md:w-[27rem] lg:w-[31rem] xl:w-[36rem]"
            />
          </div>
          <TypingParagraph mounted={mounted} />
        </div>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a href="#about" className={`btn reveal reveal-delay-200 ${mounted ? 'revealed' : ''} text-base sm:text-lg`}>Learn More</a>
          <a
            href="#philosophy"
            className={`inline-flex items-center gap-2 text-slate-200 hover:text-goldB reveal reveal-delay-300 ${mounted ? 'revealed' : ''} text-base sm:text-lg`}
          >
            Our Strategy <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

function TypingParagraph({ mounted }) {
  const base = "Equipping students with ";
  const variants = [
    'real-world investment experience.',
    'financial expertise.',
    'practical portfolio management skills.',
    'industry connections and mentorship.'
  ];
  const [display, setDisplay] = useState(base + variants[0]);
  const reduce = prefersReducedMotion();
  const ref = React.useRef(null);

  useEffect(() => {
    if (!mounted) return;
    if (reduce) { setDisplay(base + variants[0]); return; }

    const typeSpeed = 40;
    const deleteSpeed = 30;
    const pauseAfterType = 1200;
    const shortGap = 160;

    const cancelRef = { current: false };
    const currentVariant = { current: 0 };

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const runLoop = async () => {
      while (!cancelRef.current) {
        const idx = currentVariant.current;
        const variant = variants[idx];
        const full = base + variant;

        for (let i = base.length; i <= full.length; i++) {
          if (cancelRef.current) return;
          setDisplay(full.slice(0, i));
          // eslint-disable-next-line no-await-in-loop
          await sleep(typeSpeed);
        }

        if (cancelRef.current) return;
        // eslint-disable-next-line no-await-in-loop
        await sleep(pauseAfterType);

        for (let j = full.length; j >= base.length; j--) {
          if (cancelRef.current) return;
          setDisplay(full.slice(0, j));
          // eslint-disable-next-line no-await-in-loop
          await sleep(deleteSpeed);
        }

        if (cancelRef.current) return;
        currentVariant.current = (currentVariant.current + 1) % variants.length;
        // eslint-disable-next-line no-await-in-loop
        await sleep(shortGap);
      }
    };

    const startWhenVisible = () => {
      const el = ref.current;
      if (el && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              io.disconnect();
              runLoop();
            }
          });
        }, { threshold: 0.25 });
        io.observe(el);
        return () => io.disconnect();
      }
      runLoop();
      return () => { };
    };

    const disconnect = startWhenVisible();
    return () => {
      cancelRef.current = true;
      if (disconnect) disconnect();
    };
  }, [mounted, reduce]);

  return (
    <p
      ref={ref}
      className={`mt-6 max-w-2xl text-center text-base sm:text-lg md:text-xl leading-relaxed text-slate-100/90 reveal reveal-delay-100 ${mounted ? 'revealed' : ''} ${!reduce ? 'type-cursor' : ''}`}
    >
      {display}
    </p>
  );
}
