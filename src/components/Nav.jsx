import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { TEAM_CATEGORIES } from '../data.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [mobileTeamsOpen, setMobileTeamsOpen] = useState(false);
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
    setTeamsOpen(false);
    setMobileTeamsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-between py-5">
          <Link to="/" className="font-serif text-lg font-semibold tracking-wide text-ink hover:text-goldA transition-colors">
            Queen's Hedge Fund
          </Link>
          <ul className="hidden md:flex gap-8 text-[13.5px] items-center">
            <li><a href="/#about" className="text-ink/70 hover:text-goldA transition-colors">About</a></li>
            <li><a href="/#alumni" className="text-ink/70 hover:text-goldA transition-colors">Placements</a></li>
            <li><a href="/#philosophy" className="text-ink/70 hover:text-goldA transition-colors">Philosophy</a></li>
            <li><a href="/#performance" className="text-ink/70 hover:text-goldA transition-colors">Performance</a></li>
            <li className="relative" ref={teamsRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={teamsOpen}
                aria-controls="teams-dropdown-menu"
                onClick={() => setTeamsOpen(v => !v)}
                className={`inline-flex items-center gap-1.5 transition-colors ${teamsOpen ? 'text-goldA' : 'text-ink/70 hover:text-goldA'}`}
              >
                <span>Our Teams</span>
                <ChevronDown size={14} className={`transition-transform duration-150 ${teamsOpen ? 'rotate-180' : ''}`} />
              </button>
              {teamsOpen && (
                <div id="teams-dropdown-menu" role="menu" className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 dropdown-panel">
                  <NavLink to="/teams" role="menuitem" className={({ isActive }) => `nav-dropdown-link ${isActive ? 'is-active' : ''}`}>All Teams</NavLink>
                  {TEAM_CATEGORIES.map(t => (
                    <NavLink key={t.slug} to={`/teams/${t.slug}`} role="menuitem" className={({ isActive }) => `nav-dropdown-link ${isActive ? 'is-active' : ''}`}>{t.name}</NavLink>
                  ))}
                </div>
              )}
            </li>
            <li><NavLink to="/events" className={({ isActive }) => `transition-colors ${isActive ? 'text-goldA' : 'text-ink/70 hover:text-goldA'}`}>Events</NavLink></li>
            <li><NavLink to="/research" className={({ isActive }) => `transition-colors ${isActive ? 'text-goldA' : 'text-ink/70 hover:text-goldA'}`}>Research</NavLink></li>
          </ul>
          <div className="flex items-center gap-2">
            <a href="/#join" className="hidden md:inline-flex btn">Apply</a>
            <button className="md:hidden p-2 -mr-2 text-ink" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobileMenu" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div role="dialog" id="mobileMenu" aria-modal="true" ref={dialogRef} className="fixed inset-0 z-50 flex bg-ink/40">
          <div className="ml-auto w-[82%] max-w-sm h-full bg-paper p-6 border-l border-rule">
            <div className="flex items-center justify-between mb-4">
              <span className="font-serif text-base font-semibold text-ink">Queen's Hedge Fund</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 -mr-2 text-ink"><X size={22} /></button>
            </div>
            <div className="flex flex-col gap-1">
              <Link to="/" onClick={() => setOpen(false)} className="px-3 py-3 rounded text-ink hover:bg-goldA/5">Home</Link>
              <a href="/#about" onClick={() => setOpen(false)} className="px-3 py-3 rounded text-ink hover:bg-goldA/5">About</a>
              <a href="/#alumni" onClick={() => setOpen(false)} className="px-3 py-3 rounded text-ink hover:bg-goldA/5">Placements</a>
              <a href="/#philosophy" onClick={() => setOpen(false)} className="px-3 py-3 rounded text-ink hover:bg-goldA/5">Philosophy</a>
              <a href="/#performance" onClick={() => setOpen(false)} className="px-3 py-3 rounded text-ink hover:bg-goldA/5">Performance</a>
              <button
                type="button"
                onClick={() => setMobileTeamsOpen(v => !v)}
                className={`flex items-center justify-between px-3 py-3 rounded transition-colors hover:bg-goldA/5 ${mobileTeamsOpen ? 'text-goldA' : 'text-ink'}`}
                aria-expanded={mobileTeamsOpen}
                aria-controls="mobileTeamsMenu"
              >
                <span>Our Teams</span>
                <ChevronDown size={16} className={`transition-transform duration-150 ${mobileTeamsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileTeamsOpen && (
                <div id="mobileTeamsMenu" className="ml-2 flex flex-col gap-0.5 border-l border-rule pl-3">
                  <Link to="/teams" onClick={() => { setOpen(false); setMobileTeamsOpen(false); }} className="px-3 py-2 rounded text-sm text-ink/70 hover:bg-goldA/5">All Teams</Link>
                  {TEAM_CATEGORIES.map(t => (
                    <NavLink
                      key={t.slug}
                      to={`/teams/${t.slug}`}
                      onClick={() => { setOpen(false); setMobileTeamsOpen(false); }}
                      className="px-3 py-2 rounded text-sm text-ink/70 hover:bg-goldA/5"
                    >
                      {t.name}
                    </NavLink>
                  ))}
                </div>
              )}
              <NavLink to="/events" onClick={() => setOpen(false)} className={({ isActive }) => `px-3 py-3 rounded hover:bg-goldA/5 ${isActive ? 'text-goldA' : 'text-ink'}`}>Events</NavLink>
              <NavLink to="/research" onClick={() => setOpen(false)} className={({ isActive }) => `px-3 py-3 rounded hover:bg-goldA/5 ${isActive ? 'text-goldA' : 'text-ink'}`}>Research</NavLink>
              <a href="/#join" onClick={() => setOpen(false)} className="px-3 py-3 rounded text-ink hover:bg-goldA/5">Join</a>
            </div>
          </div>
          <button className="flex-1" aria-label="Close menu" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}
