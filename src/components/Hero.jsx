import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas.jsx';
import { prefersReducedMotion } from '../lib/animation.js';

export default function Hero(){
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[82vh] items-start overflow-hidden pt-16 pb-28 sm:pt-20 sm:pb-32 md:min-h-[92vh]"
    >
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true"></div>
      <div className="hero-noise"></div>
      <ParticleCanvas />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-6 pb-20 sm:pt-8 sm:pb-24 lg:pt-10 lg:pb-28">
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            <img
              src="/QHF-2.svg"
              alt="Queen's Hedge Fund crest"
              loading="eager"
              className="w-[19rem] max-w-[92vw] object-contain drop-shadow-[0_25px_80px_rgba(8,15,30,0.45)] sm:w-[23rem] md:w-[27rem] lg:w-[31rem] xl:w-[36rem]"
            />
          </div>
          <h1
            className={`mt-6 max-w-3xl text-center text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl md:text-[2.9rem] reveal reveal-delay-150 ${mounted ? 'revealed' : ''}`}
          >
            Queen's Hedge Fund (QHF) is the official student-run hedge fund at Queen's University, preparing Kingston-based analysts to invest with institutional discipline.
          </h1>
          <TypingParagraph mounted={mounted} />
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a href="#about" className={`btn reveal reveal-delay-200 ${mounted ? 'revealed' : ''} text-base sm:text-lg`}>Learn More</a>
          <a
            href="#philosophy"
            className={`inline-flex items-center gap-2 text-slate-200 hover:text-goldB reveal reveal-delay-300 ${mounted ? 'revealed' : ''} text-base sm:text-lg`}
          >
            Our Strategy <ArrowRight size={20}/>
          </a>
        </div>
      </div>
    </section>
  );
}

function Word({ word, delay=0 }){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current; if (!el) return;
    const reduce = prefersReducedMotion();
    el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      el.style.transition = reduce? 'none' : `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    });
  }, [delay]);
  return (
    <span ref={ref} className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(110deg, #fff 0%, #fff 38%, #C5A16D 45%, #fff 52%, #fff 100%)', backgroundSize: '250% 100%' }}>
      <span className="[--sh:linear-gradient(110deg,transparent,rgba(255,255,255,0.5),transparent)] bg-[image:var(--sh)] bg-[length:200%_100%] bg-clip-text animate-sheen">
        {word}
      </span>
    </span>
  );
}

function TypingParagraph({ mounted }){
  const base = "Queens Hedge Fund equips Queen's University students with ";
  const variants = [
    'real-world investment experience.',
    'financial expertise.',
    'practical portfolio management skills.',
    'industry connections and mentorship.'
  ];
  const [display, setDisplay] = useState(base + variants[0]);
  const [isTyping, setIsTyping] = useState(true);
  const spanRef = React.useRef(null);
  const reduce = prefersReducedMotion();
  const ref = React.useRef(null);

  useEffect(() => {
    if (!mounted) return;
    if (reduce) { setDisplay(base + variants[0]); return; }

    const typeSpeed = 40; // ms per char
    const deleteSpeed = 30; // ms per char
    const pauseAfterType = 1200; // ms
    const shortGap = 160; // ms between cycles

    const cancelRef = { current: false };
    const currentVariant = { current: 0 };

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const runLoop = async () => {
      while (!cancelRef.current) {
        const idx = currentVariant.current;
        const variant = variants[idx];
        const full = base + variant;

        // type
        for (let i = base.length; i <= full.length; i++) {
          if (cancelRef.current) return;
          setDisplay(full.slice(0, i));
          // eslint-disable-next-line no-await-in-loop
          await sleep(typeSpeed);
        }

        if (cancelRef.current) return;
        // pause
        // eslint-disable-next-line no-await-in-loop
        await sleep(pauseAfterType);

        // delete
        for (let j = full.length; j >= base.length; j--) {
          if (cancelRef.current) return;
          setDisplay(full.slice(0, j));
          // eslint-disable-next-line no-await-in-loop
          await sleep(deleteSpeed);
        }

        if (cancelRef.current) return;
        // advance
        currentVariant.current = (currentVariant.current + 1) % variants.length;
        // small gap before next typing
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
      // fallback start immediately
      runLoop();
      return () => {};
    };

    const disconnect = startWhenVisible();
    return () => {
      cancelRef.current = true;
      if (disconnect) disconnect();
    };
  }, [mounted, reduce]);

  // Don't use the gold->white animation classes to avoid visual glitches.
  const spanClass = '';

  return (
    <p
      ref={ref}
      className={`mt-5 max-w-2xl text-center text-base sm:text-lg md:text-xl leading-relaxed reveal reveal-delay-100 ${mounted ? 'revealed' : ''} ${!reduce ? 'type-cursor' : ''}`}
    >
      <span ref={spanRef} className={spanClass} style={{ color: '#FEF7E6' }}>{display}</span>
    </p>
  );
}
