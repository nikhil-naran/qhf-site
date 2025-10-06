import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="py-10 border-t border-white/10 mt-10">
      <div className="mx-auto max-w-7xl px-4 flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <nav className="flex flex-col gap-4 text-sm text-slate-300 md:flex-row md:justify-start">
          <a href="/#about" className="hover:text-goldB">About</a>
          <Link to="/teams" className="hover:text-goldB">Our Teams</Link>
          <a href="/#events" className="hover:text-goldB">Events</a>
          <a href="/#join" className="hover:text-goldB">Join</a>
        </nav>
        <div className="text-sm text-slate-400">
          <span className="block">© {new Date().getFullYear()} Queen's Hedge Fund</span>
          <a href="/#join" className="inline-block text-slate-300 hover:text-goldB">Connect with the QHF leadership team</a>
        </div>
      </div>
    </footer>
  );
}
