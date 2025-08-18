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
export const revealOnScroll = (el, { translateY = 8, delay = 0 } = {}) => {
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = `translateY(${translateY}px)`;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const reduce = prefersReducedMotion();
        el.style.transition = `opacity ${reduce ? 0 : 420}ms ${Motion.ease.out}, transform ${reduce ? 0 : 420}ms ${Motion.ease.out}`;
        el.style.transitionDelay = `${delay}ms`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.15 });
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