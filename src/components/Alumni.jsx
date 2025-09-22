import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Motion, revealOnScroll, prefersReducedMotion } from '../lib/animation.js';

const placements = [
  { name: 'RBC', logo: '/logos/rbc.png' },
  { name: 'Questrade', logo: '/logos/questrade.png' },
  { name: 'TD', logo: '/logos/td.png' },
  { name: 'Manulife', logo: '/logos/manulife.png' },
  { name: 'Richardson Wealth', logo: '/logos/richardson-wealth.png' }
];

const SCROLL_CYCLE_MS = 22000; // time to shift one slide completely
const MANUAL_RESUME_DELAY = 1600;

const getVisibleCount = (width) => {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
};

export default function Alumni(){
  // Reworked as a Placements section (current / past) with partner logos
  const ref = useRef(null);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === 'undefined') return 3;
    return getVisibleCount(window.innerWidth);
  });
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return prefersReducedMotion();
  });
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const resumeTimeoutRef = useRef(null);
  useEffect(()=> revealOnScroll(ref.current, { translateY: 28 }), []);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setVisibleCount(getVisibleCount(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const updateMotion = () => setReduceMotion(prefersReducedMotion());
    updateMotion();

    const handleCustom = (event) => setReduceMotion(!!event.detail);
    window.addEventListener('qhf-reduce-motion-change', handleCustom);

    let mediaQuery;
    let handleMediaChange;
    if ('matchMedia' in window) {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      handleMediaChange = (event) => setReduceMotion(event.matches);
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleMediaChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleMediaChange);
      }
    }

    return () => {
      window.removeEventListener('qhf-reduce-motion-change', handleCustom);
      if (mediaQuery && handleMediaChange) {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleMediaChange);
        } else if (mediaQuery.removeListener) {
          mediaQuery.removeListener(handleMediaChange);
        }
      }
    };
  }, []);

  const slides = useMemo(() => {
    const chunkSize = Math.max(visibleCount, 1);
    if (placements.length === 0) return [];
    const result = [];
    for (let i = 0; i < placements.length; i += chunkSize) {
      let group = placements.slice(i, i + chunkSize);
      if (group.length < chunkSize) {
        const needed = chunkSize - group.length;
        const wrapItems = [];
        for (let j = 0; j < needed; j++) {
          wrapItems.push(placements[j % placements.length]);
        }
        group = group.concat(wrapItems);
      }
      result.push(group);
    }
    if (result.length === 0) {
      const wrapGroup = [];
      for (let k = 0; k < chunkSize; k++) {
        wrapGroup.push(placements[k % placements.length]);
      }
      result.push(wrapGroup);
    }
    return result;
  }, [visibleCount]);
  const totalSlides = slides.length;
  const showControls = totalSlides > 1;

  const slidesLoop = useMemo(() => (
    showControls ? [...slides, ...slides] : slides
  ), [slides, showControls]);

  const stopAutoScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTimestampRef.current = null;
  }, []);

  const applyOffset = useCallback((offset) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(-${offset}%)`;
  }, []);

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (!showControls || reduceMotion || !trackRef.current) return;
    if (rafRef.current) return;
    trackRef.current.style.transition = 'none';
    const maxOffset = totalSlides * 100;
    const tick = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      const increment = (delta / SCROLL_CYCLE_MS) * 100;
      offsetRef.current += increment;
      if (offsetRef.current >= maxOffset) {
        offsetRef.current -= maxOffset;
      }
      applyOffset(offsetRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [applyOffset, reduceMotion, showControls, totalSlides]);

  const scheduleAutoResume = useCallback(() => {
    if (reduceMotion || !showControls) return;
    clearResumeTimeout();
    resumeTimeoutRef.current = window.setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
      }
      resumeTimeoutRef.current = null;
      startAutoScroll();
    }, MANUAL_RESUME_DELAY);
  }, [clearResumeTimeout, reduceMotion, showControls, startAutoScroll]);

  useEffect(() => () => {
    stopAutoScroll();
    clearResumeTimeout();
  }, [clearResumeTimeout, stopAutoScroll]);

  useEffect(() => {
    const maxOffset = totalSlides * 100;
    if (maxOffset === 0) {
      offsetRef.current = 0;
      applyOffset(0);
      stopAutoScroll();
      return;
    }
    offsetRef.current = ((offsetRef.current % maxOffset) + maxOffset) % maxOffset;
    applyOffset(offsetRef.current);
    if (reduceMotion || !showControls) {
      stopAutoScroll();
      return;
    }
    stopAutoScroll();
    startAutoScroll();
  }, [applyOffset, reduceMotion, showControls, startAutoScroll, stopAutoScroll, totalSlides]);

  const handleFocus = useCallback(() => {
    stopAutoScroll();
    clearResumeTimeout();
  }, [clearResumeTimeout, stopAutoScroll]);

  const handleBlur = useCallback((event) => {
    if (!sliderRef.current) return;
    if (event && sliderRef.current.contains(event.relatedTarget)) return;
    scheduleAutoResume();
  }, [scheduleAutoResume]);

  const handleMouseEnter = useCallback(() => {
    stopAutoScroll();
    clearResumeTimeout();
  }, [clearResumeTimeout, stopAutoScroll]);

  const handleMouseLeave = useCallback(() => {
    scheduleAutoResume();
  }, [scheduleAutoResume]);

  const goToSlide = useCallback((direction) => {
    if (!showControls || !trackRef.current || totalSlides === 0) return;
    clearResumeTimeout();
    stopAutoScroll();
    const maxOffset = totalSlides * 100;
    const normalizedOffset = ((offsetRef.current % maxOffset) + maxOffset) % maxOffset;
    const currentIndex = normalizedOffset / 100;
    const targetIndex = direction === 'next'
      ? Math.floor(currentIndex + 1)
      : Math.ceil(currentIndex - 1);
    const wrappedIndex = ((targetIndex % totalSlides) + totalSlides) % totalSlides;
    const targetOffset = wrappedIndex * 100;
    offsetRef.current = targetOffset;
    trackRef.current.style.transition = `transform 420ms ${Motion.ease.out}`;
    applyOffset(targetOffset);
    scheduleAutoResume();
  }, [applyOffset, clearResumeTimeout, scheduleAutoResume, showControls, stopAutoScroll, totalSlides]);

  const goPrev = useCallback(() => goToSlide('prev'), [goToSlide]);
  const goNext = useCallback(() => goToSlide('next'), [goToSlide]);

  const gridColumns = (groupLength) => Math.min(visibleCount, groupLength);

  return (
    <section id="alumni" ref={ref} className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold">Member Placements</h2>
        <div className="mt-6">
          <div className="glass overflow-hidden rounded-2xl border border-white/10 p-5 sm:p-6">
            <h3 className="text-xl font-semibold mb-4">Current / Past Placements</h3>
            <div
              className="placements-slider relative"
              ref={sliderRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {showControls && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="slider-control left-2"
                  aria-label="Show previous placements"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              <div className="placements-viewport">
                <div
                  className="placements-track"
                  ref={trackRef}
                >
                  {slidesLoop.map((group, slideIndex) => (
                    <div key={`placements-slide-${slideIndex}`} className="placements-slide">
                      <div
                        className="placements-grid gap-4"
                        style={{ gridTemplateColumns: `repeat(${gridColumns(group.length)}, minmax(0, 1fr))` }}
                      >
                        {group.map((company) => (
                          <div
                            key={company.name}
                            className="placement-card inline-flex items-center gap-3 opacity-95 hover:opacity-100"
                          >
                            <div className="placement-logo rounded flex items-center justify-center">
                              <img
                                src={company.logo}
                                alt={`${company.name} logo`}
                                loading="lazy"
                                className="h-full w-full object-contain p-4"
                              />
                            </div>
                            <span className="text-sm text-slate-200 font-medium leading-tight">{company.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {showControls && (
                <button
                  type="button"
                  onClick={goNext}
                  className="slider-control right-2"
                  aria-label="Show next placements"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
