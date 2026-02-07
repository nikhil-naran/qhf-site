import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="py-12 border-t border-white/[0.07] mt-12">
      <div className="mx-auto max-w-7xl px-4 flex flex-col gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <span className="font-serif text-2xl font-semibold text-white tracking-wide">QHF</span>
        </div>
        <nav className="flex flex-col gap-4 text-sm text-slate-300 md:flex-row md:justify-start">
          <a href="/#about" className="hover:text-goldB transition-colors">About</a>
          <Link to="/teams" className="hover:text-goldB transition-colors">Our Teams</Link>
          <a href="/#events" className="hover:text-goldB transition-colors">Events</a>
          <a href="/#join" className="hover:text-goldB transition-colors">Join</a>
        </nav>
        <div className="text-sm text-slate-400">
          <span className="block">&copy; {new Date().getFullYear()} Queen's Hedge Fund</span>
          <a href="/#join" className="inline-block text-slate-300 hover:text-goldB transition-colors">Connect with the QHF leadership team</a>
        </div>
      </div>
    </footer>
  );
}
