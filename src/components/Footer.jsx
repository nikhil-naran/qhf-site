import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="py-10 border-t border-white/10 mt-10">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <nav className="flex gap-5 text-sm text-slate-300">
          <a href="/#about" className="hover:text-goldB">About</a>
          <Link to="/teams" className="hover:text-goldB">Our Teams</Link>
          <a href="/#events" className="hover:text-goldB">Events</a>
          <a href="/#join" className="hover:text-goldB">Join</a>
        </nav>
        <div className="text-sm text-slate-400">© {new Date().getFullYear()} Queens Hedge Fund — Made with care<span className="inline-block ml-1 align-middle w-2 h-2 rounded-full bg-goldA animate-ping"></span></div>
      </div>
    </footer>
  );
}