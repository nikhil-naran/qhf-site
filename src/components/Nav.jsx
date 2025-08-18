import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { TEAM_CATEGORIES } from '../data.js';
// ...existing code...

export default function Nav(){
  const [open, setOpen] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const dialogRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => { if (!open) return; const first = dialogRef.current?.querySelector('a, button'); first?.focus(); }, [open]);

  // Close the teams dropdown whenever the route changes (so selecting a team hides the selector)
  useEffect(() => {
    setTeamsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="mt-3 flex items-center justify-between rounded-2xl glass shadow-glass border border-white/10 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/5">
          <Link to="/" className="flex items-center gap-3" aria-label="Queens Hedge Fund home">
            <img src="/QHF.jpg" alt="QHF logo" loading="eager" className="h-12 w-auto object-contain p-1 bg-white/6 rounded drop-shadow-lg" />
          </Link>
          <ul className="hidden md:flex gap-6 text-sm items-center">
            <li><a href="/#about" className="hover:text-goldB transition-colors">About</a></li>
            <li><a href="/#philosophy" className="hover:text-goldB transition-colors">Philosophy</a></li>
            <li className="relative">
              <button aria-haspopup="menu" aria-expanded={teamsOpen} onClick={()=> setTeamsOpen(v=>!v)} className="inline-flex items-center gap-1 hover:text-goldB">Our Teams <ChevronDown size={16}/></button>
              {teamsOpen && (
                <div role="menu" className="absolute top-full mt-2 w-72 dropdown-panel rounded-2xl border border-white/10 p-2">
                  <NavLink to="/teams" className={({isActive})=>`block px-3 py-2 rounded hover:bg-white/10 ${isActive? 'text-goldB':''}`}>All Teams</NavLink>
                  {TEAM_CATEGORIES.map(t => (
                    <NavLink key={t.slug} to={`/teams/${t.slug}`} className={({isActive})=>`block px-3 py-2 rounded hover:bg-white/10 ${isActive? 'text-goldB':''}`}>{t.name}</NavLink>
                  ))}
                </div>
              )}
            </li>
            <li><a href="/#events" className="hover:text-goldB transition-colors">Events</a></li>
            <li><a href="/#alumni" className="hover:text-goldB transition-colors">Alumni</a></li>
            <li><a href="/#join" className="hover:text-goldB transition-colors">Join Us</a></li>
          </ul>
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 rounded-full hover:bg-white/10" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobileMenu" onClick={() => setOpen(true)}>
              <Menu />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div role="dialog" id="mobileMenu" aria-modal="true" ref={dialogRef} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex">
          <div className="ml-auto w-[80%] max-w-sm h-full bg-burgundy glass p-6 shadow-glass border-l border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Menu</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded hover:bg-white/10"><X/></button>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/" onClick={()=> setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">Home</Link>
              <a href="/#about" onClick={()=> setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">About</a>
              <a href="/#philosophy" onClick={()=> setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">Philosophy</a>
              <Link to="/teams" onClick={()=> setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">Our Teams</Link>
              {TEAM_CATEGORIES.map(t=> (
                <NavLink key={t.slug} to={`/teams/${t.slug}`} onClick={()=> setOpen(false)} className="px-4 py-2 rounded hover:bg-white/10">{t.name}</NavLink>
              ))}
              <a href="/#events" onClick={()=> setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">Events</a>
              <a href="/#alumni" onClick={()=> setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">Alumni</a>
              <a href="/#join" onClick={()=> setOpen(false)} className="px-2 py-2 rounded hover:bg-white/10">Join</a>
              {/* motion toggle removed */}
            </div>
          </div>
          <button className="flex-1" aria-label="Close menu" onClick={() => setOpen(false)} />
        </div>
      )}

      <BackToTop />
    </header>
  );
}

function BackToTop(){
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
    <a href="#hero" className="fixed bottom-6 right-6 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full p-3 backdrop-blur">
      <ChevronUp />
      <span className="sr-only">Back to top</span>
    </a>
  );
}