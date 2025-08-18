import React, { useEffect } from 'react';

export default function ProgressBar(){
  useEffect(() => {
    const el = document.getElementById('progressBar');
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = (h.scrollTop / max) * 100;
      el.style.width = pct + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}