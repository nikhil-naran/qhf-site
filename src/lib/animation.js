/** Central animation config + utilities */
export const Motion = {
  duration: { xs: 120, sm: 220, md: 420, lg: 700 },
  ease: {
    out: 'cubic-bezier(0.22, 1, 0.36, 1)',
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)'
  },
};

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  JSON.parse(localStorage.getItem('qhf-reduce-motion') || 'false');

export const setReducedMotion = (val) => {
  localStorage.setItem('qhf-reduce-motion', JSON.stringify(!!val));
  window.dispatchEvent(new CustomEvent('qhf-reduce-motion-change', { detail: !!val }));
};

/** IntersectionObserver to reveal elements */
export const revealOnScroll = (el, { translateY = 40, delay = 0, once } = {}) => {
  if (!el) return;
  // initial hidden state
  el.style.opacity = '0';
  // add a tiny scale to make the entrance more pronounced
  el.style.transform = `translateY(${translateY}px) scale(0.985)`;
  const reduce = prefersReducedMotion();
  if (reduce) {
    // if reduced motion, show immediately without transitions
    el.style.opacity = '1';
    el.style.transform = 'none';
    return;
  }

  // determine default 'once' behavior: on small screens or touch devices prefer one-time reveals
  const isSmallScreen = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
  const hasTouch = typeof navigator !== 'undefined' && ('maxTouchPoints' in navigator ? navigator.maxTouchPoints > 0 : 'ontouchstart' in window);
  const effectiveOnce = typeof once === 'boolean' ? once : (isSmallScreen || hasTouch);

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        // on enter: animate in (longer/more pronounced)
        const dur = 1400; // longer, cinematic reveal
        el.style.transition = `opacity ${dur}ms ${Motion.ease.out}, transform ${dur}ms ${Motion.ease.out}`;
        el.style.transitionDelay = `${delay}ms`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
        if (effectiveOnce) obs.unobserve(el);
      } else if (!effectiveOnce) {
        // on leave: reset to hidden so it can animate again on re-entry
        // remove transition delay so reset is immediate
        el.style.transitionDelay = '0ms';
        el.style.transition = 'opacity 0ms linear, transform 0ms linear';
        el.style.opacity = '0';
        el.style.transform = `translateY(${translateY}px) scale(0.985)`;
      }
    });
  }, { threshold: 0.25 }); // reveal when more of the element is visible
  obs.observe(el);
};

/** Count-up utility using rAF */
export const countTo = (el, to = 100, { duration = 1200, formatter = (n) => Math.round(n).toLocaleString() } = {}) => {
  if (!el) return;
  const reduce = prefersReducedMotion();
  if (reduce) { el.textContent = formatter(to); return; }
  const start = performance.now();
  const from = 0;
  const step = (t) => {
    const p = Math.min(1, (t - start) / duration);
    const eased = p * (2 - p); // easeOutQuad
    el.textContent = formatter(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};