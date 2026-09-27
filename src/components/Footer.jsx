import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="border-t border-rule py-10">
      <div className="mx-auto max-w-7xl px-4 flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <span className="font-serif text-lg font-semibold text-ink">Queen's Hedge Fund</span>
        <nav className="flex flex-col gap-4 text-sm text-ink/60 md:flex-row md:justify-start">
          <a href="/#about" className="hover:text-goldA transition-colors">About</a>
          <Link to="/teams" className="hover:text-goldA transition-colors">Our Teams</Link>
          <Link to="/events" className="hover:text-goldA transition-colors">Events</Link>
          <a href="/#join" className="hover:text-goldA transition-colors">Join</a>
        </nav>
        <div className="text-sm text-ink/45">
          <span className="block">&copy; {new Date().getFullYear()} Queen's Hedge Fund</span>
          <a href="/#join" className="inline-block text-ink/60 hover:text-goldA transition-colors">Connect with the QHF leadership team</a>
        </div>
      </div>
    </footer>
  );
}
