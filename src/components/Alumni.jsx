import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { revealOnScroll, prefersReducedMotion } from '../lib/animation.js';
import OptimizedImage from './OptimizedImage.jsx';

const placements = [
  { name: 'RBC', logo: '/logos/rbc.png' },
  { name: 'Questrade', logo: '/logos/questrade.png' },
  { name: 'TD', logo: '/logos/td.png' },
  { name: 'Manulife', logo: '/logos/manulife.png' },
  { name: 'Richardson Wealth', logo: '/logos/richardson-wealth.png' },
  { name: 'ENGIE Global Markets', logo: '/logos/engie-global-markets.png' },
  { name: 'Two Sigma', logo: '/logos/two-sigma.png' },
  { name: 'DWP Capital', logo: '/logos/dwp-capital.png' },
  { name: 'Blue Owl Capital', logo: '/logos/blue-owl-capital.png' }
];

const AUTO_ADVANCE_MS = 6000;

const getVisibleCount = (width) => {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
};

export default function Alumni(){
  const ref = useRef(null);
  const sliderRef = useRef(null);
  const autoTimerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === 'undefined') return 3;
    return getVisibleCount(window.innerWidth);
  });
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return prefersReducedMotion();
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => revealOnScroll(ref.current, { translateY: 28 }), []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
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
    for (let start = 0; start < placements.length; start += chunkSize) {
      const slice = placements.slice(start, start + chunkSize);
      if (slice.length < chunkSize) {
        const wrap = placements.slice(0, chunkSize - slice.length);
        result.push([...slice, ...wrap]);
      } else {
        result.push(slice);
      }
    }
    return result;
  }, [visibleCount]);

  const totalSlides = slides.length;
  const showControls = totalSlides > 1;

  useEffect(() => {
    if (totalSlides === 0) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev % totalSlides);
    }
  }, [totalSlides]);

  const stopAuto = useCallback(() => {
    if (autoTimerRef.current) {
      window.clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    if (!showControls || reduceMotion || totalSlides <= 1) {
      stopAuto();
      return;
    }
    stopAuto();
    autoTimerRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, AUTO_ADVANCE_MS);
  }, [reduceMotion, showControls, stopAuto, totalSlides]);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  const handleFocus = useCallback(() => {
    stopAuto();
  }, [stopAuto]);

  const handleBlur = useCallback((event) => {
    if (!sliderRef.current) return;
    if (event && sliderRef.current.contains(event.relatedTarget)) return;
    startAuto();
  }, [startAuto]);

  const handleMouseEnter = useCallback(() => {
    stopAuto();
  }, [stopAuto]);

  const handleMouseLeave = useCallback(() => {
    startAuto();
  }, [startAuto]);

  const goPrev = useCallback(() => {
    if (!showControls || totalSlides === 0) return;
    stopAuto();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    startAuto();
  }, [showControls, startAuto, stopAuto, totalSlides]);

  const goNext = useCallback(() => {
    if (!showControls || totalSlides === 0) return;
    stopAuto();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    startAuto();
  }, [showControls, startAuto, stopAuto, totalSlides]);

  const gridColumns = (groupLength) => Math.min(visibleCount, groupLength);

  const trackStyle = useMemo(() => ({
    transform: `translateX(-${currentSlide * 100}%)`
  }), [currentSlide]);

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
                  style={trackStyle}
                >
                  {slides.map((group, slideIndex) => (
                    <div key={`placements-slide-${slideIndex}`} className="placements-slide">
                      <div
                        className="placements-grid gap-4"
                        style={{ gridTemplateColumns: `repeat(${gridColumns(group.length)}, minmax(0, 1fr))` }}
                      >
                        {group.map((company, itemIndex) => (
                          <div
                            key={`${company.name}-${slideIndex}-${itemIndex}`}
                            className="placement-card inline-flex items-center gap-3 opacity-95 hover:opacity-100"
                          >
                            <div className="placement-logo rounded flex items-center justify-center">
                              <OptimizedImage
                                src={company.logo}
                                alt={`${company.name} logo`}
                                widths={[120, 160, 220, 280]}
                                sizes="(min-width: 1024px) 180px, (min-width: 768px) 140px, 45vw"
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
