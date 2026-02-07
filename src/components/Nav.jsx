import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { TEAM_CATEGORIES } from '../data.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [mobileTeamsOpen, setMobileTeamsOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const dialogRef = useRef(null);
  const teamsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setTeamsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => { if (!open) return; const first = dialogRef.current?.querySelector('a, button'); first?.focus(); }, [open]);

  useEffect(() => {
    if (!open) {
      setMobileTeamsOpen(false);
    }
  }, [open]);

  useEffect(() => {
    if (!teamsOpen) return;
    const onPointerDown = (e) => {
      if (!teamsRef.current?.contains(e.target)) {
        setTeamsOpen(false);
      }
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [teamsOpen]);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fadeDistance = 600;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset || 0;
        const o = Math.max(0, Math.min(1, 1 - y / fadeDistance));
        setOpacity(o);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setTeamsOpen(false);
    setMobileTeamsOpen(false);
  }, [location.pathname]);

  return (
    <header className="relative z-50" style={{ opacity, transition: 'opacity 250ms linear' }}>
      <div className="mx-auto max-w-7xl px-4">
        <nav className="mt-3 flex items-center justify-between bg-transparent px-0 py-4 relative">
          <Link to="/" className="relative z-10 font-serif text-xl font-semibold text-white tracking-wide hover:text-goldB transition-colors">
            QHF
          </Link>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ul className="hidden md:flex gap-12 text-sm items-center pointer-events-auto">
              <li><a href="/#about" className="hover:text-goldB transition-colors">About</a></li>
              <li><a href="/#philosophy" className="hover:text-goldB transition-colors">Philosophy</a></li>
              <li><a href="/#alumni" className="hover:text-goldB transition-colors">Member Placements</a></li>
              <li className="relative" ref={teamsRef}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={teamsOpen}
                  aria-controls="teams-dropdown-menu"
                  onClick={() => setTeamsOpen(v => !v)}
                  className={`our-teams-trigger inline-flex items-center gap-2 transition-colors ${teamsOpen ? 'is-open' : ''}`}
                >
                  <span className="text-sm font-semibold tracking-[0.08em]">Our Teams</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${teamsOpen ? 'rotate-180' : ''}`} />
                </button>
                {teamsOpen && (
                  <div id="teams-dropdown-menu" role="menu" className="absolute top-full mt-3 w-72 dropdown-panel our-teams-dropdown">
                    <NavLink to="/teams" role="menuitem" className={({ isActive }) => `nav-dropdown-link ${isActive ? 'is-active' : ''}`}>All Teams</NavLink>
                    {TEAM_CATEGORIES.map(t => (
                      <NavLink key={t.slug} to={`/teams/${t.slug}`} role="menuitem" className={({ isActive }) => `nav-dropdown-link ${isActive ? 'is-active' : ''}`}>{t.name}</NavLink>
                    ))}
                  </div>
                )}
              </li>
              <li><NavLink to="/events" className={({ isActive }) => `hover:text-goldB transition-colors ${isActive ? 'text-goldB' : ''}`}>Events</NavLink></li>
              <li><NavLink to="/research" className={({ isActive }) => `hover:text-goldB transition-colors ${isActive ? 'text-goldB' : ''}`}>Research</NavLink></li>
              <li><a href="/#join" className="hover:text-goldB transition-colors">Join Us</a></li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 rounded-full hover:bg-white/10" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobileMenu" onClick={() => setOpen(true)}>
              <Menu />
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div role="dialog" id="mobileMenu" aria-modal="true" ref={dialogRef} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex">
          <div className="ml-auto w-[80%] max-w-sm h-full bg-burgundy glass p-6 shadow-glass border-l border-white/[0.07]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-serif text-lg font-semibold">QHF</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded hover:bg-white/10"><X /></button>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">Home</Link>
              <a href="/#about" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">About</a>
              <a href="/#philosophy" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">Philosophy</a>
              <a href="/#alumni" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">Member Placements</a>
              <button
                type="button"
                onClick={() => setMobileTeamsOpen(v => !v)}
                className={`flex items-center justify-between px-2 py-2 rounded hover:bg-white/10 transition-colors ${mobileTeamsOpen ? 'text-goldB' : ''}`}
                aria-expanded={mobileTeamsOpen}
                aria-controls="mobileTeamsMenu"
              >
                <span>Our Teams</span>
                <ChevronDown size={18} className={`transition-transform duration-200 ${mobileTeamsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileTeamsOpen && (
                <div id="mobileTeamsMenu" className="ml-2 flex flex-col gap-1 border-l border-white/[0.07] pl-3">
                  <Link to="/teams" onClick={() => { setOpen(false); setMobileTeamsOpen(false); }} className="px-2 py-2 rounded hover:bg-white/10 text-sm">All Teams</Link>
                  {TEAM_CATEGORIES.map(t => (
                    <NavLink
                      key={t.slug}
                      to={`/teams/${t.slug}`}
                      onClick={() => { setOpen(false); setMobileTeamsOpen(false); }}
                      className="px-2 py-2 rounded hover:bg-white/10 text-sm"
                    >
                      {t.name}
                    </NavLink>
                  ))}
                </div>
              )}
              <NavLink to="/events" onClick={() => setOpen(false)} className={({ isActive }) => `px-2 py-2 rounded hover:bg-white/10 ${isActive ? 'text-goldB' : ''}`}>Events</NavLink>
              <NavLink to="/research" onClick={() => setOpen(false)} className={({ isActive }) => `px-2 py-2 rounded hover:bg-white/10 ${isActive ? 'text-goldB' : ''}`}>Research</NavLink>
              <a href="/#join" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">Join</a>
            </div>
          </div>
          <button className="flex-1" aria-label="Close menu" onClick={() => setOpen(false)} />
        </div>
      )}

      <BackToTop />
    </header>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setShow(h.scrollTop / (h.scrollHeight - h.clientHeight) > 0.4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <a href="#hero" className="fixed bottom-6 right-6 bg-white/10 hover:bg-white/20 border border-white/[0.07] rounded-full p-3 backdrop-blur">
      <ChevronUp />
      <span className="sr-only">Back to top</span>
    </a>
  );
}
