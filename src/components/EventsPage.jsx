import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Calendar, User, Video, FileText, Users, ExternalLink } from 'lucide-react';
import { FEATURED_EVENTS } from '../data.js';
import { revealOnScroll } from '../lib/animation.js';

export default function EventsPage() {
    const [selectedEventId, setSelectedEventId] = useState(FEATURED_EVENTS[0]?.id);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const dropdownRef = useRef(null);

    const selectedEvent = FEATURED_EVENTS.find((e) => e.id === selectedEventId) || FEATURED_EVENTS[0];

    useEffect(() => {
        revealOnScroll(headerRef.current, { translateY: 28 });
    }, []);

    useEffect(() => {
        revealOnScroll(contentRef.current, { translateY: 28, delay: 100 });
    }, [selectedEventId]);

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!dropdownOpen) return;
        const onPointerDown = (e) => {
            if (!dropdownRef.current?.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        window.addEventListener('pointerdown', onPointerDown);
        return () => window.removeEventListener('pointerdown', onPointerDown);
    }, [dropdownOpen]);

    // Close dropdown on Escape
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') setDropdownOpen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const handleSelectEvent = (eventId) => {
        setSelectedEventId(eventId);
        setDropdownOpen(false);
    };

    return (
        <main className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
            <Helmet>
                <title>Events | Queen's Hedge Fund</title>
                <meta name="description" content="Upcoming events hosted by Queen's Hedge Fund including speaker sessions and investment tutorials." />
            </Helmet>

            {/* Background glows */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-8 h-56 w-96 -translate-x-1/2 rounded-full bg-goldA/20 blur-3xl" aria-hidden="true" />
                <div className="absolute right-16 bottom-0 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" aria-hidden="true" />
            </div>

            <div className="mx-auto max-w-7xl px-4">
                {/* Header Section */}
                <section
                    ref={headerRef}
                    className="glass relative z-20 rounded-3xl border border-white/10 px-6 py-8 shadow-glass sm:px-10 lg:px-12"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0" aria-hidden="true" />
                    <div className="relative z-10">
                        <header>
                            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-goldB">
                                Events
                            </p>
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                                Upcoming Events
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200/90 sm:text-base">
                                Join our speaker sessions, workshops, and tutorials designed to enhance your investment knowledge and connect you with industry professionals.
                            </p>
                        </header>

                        {/* Event Selector Dropdown */}
                        <div className="mt-8 relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setDropdownOpen((v) => !v)}
                                aria-haspopup="listbox"
                                aria-expanded={dropdownOpen}
                                aria-controls="event-listbox"
                                className={`event-selector inline-flex items-center gap-3 rounded-2xl border px-5 py-4 text-left transition-all w-full sm:w-auto sm:min-w-[400px] ${dropdownOpen
                                    ? 'border-goldB/40 bg-white/10'
                                    : 'border-white/15 bg-white/5 hover:border-goldB/30 hover:bg-white/8'
                                    }`}
                            >
                                <div className="flex-1">
                                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Select Event</div>
                                    <div className="mt-1 font-semibold text-slate-50 truncate">{selectedEvent.title}</div>
                                </div>
                                <ChevronDown
                                    size={20}
                                    className={`text-slate-300 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {dropdownOpen && (
                                <ul
                                    id="event-listbox"
                                    role="listbox"
                                    className="absolute top-full left-0 right-0 sm:right-auto mt-2 w-full sm:min-w-[400px] dropdown-panel rounded-2xl z-50"
                                >
                                    {FEATURED_EVENTS.map((event) => (
                                        <li key={event.id}>
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={event.id === selectedEventId}
                                                onClick={() => handleSelectEvent(event.id)}
                                                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${event.id === selectedEventId
                                                    ? 'bg-goldA/20 text-goldB'
                                                    : 'hover:bg-white/10 text-slate-200'
                                                    }`}
                                            >
                                                <div className="font-semibold">{event.title}</div>
                                                <div className="text-xs text-slate-400 mt-1">{event.displayDate}</div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </section>

                {/* Event Details */}
                <section ref={contentRef} className="mt-8">
                    {selectedEvent.type === 'speaker' ? (
                        <SpeakerEventCard event={selectedEvent} />
                    ) : (
                        <TutorialEventCard event={selectedEvent} />
                    )}
                </section>
            </div>
        </main>
    );
}

function SpeakerEventCard({ event }) {
    return (
        <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-glass">
            <div className="grid lg:grid-cols-[280px_1fr] gap-0">
                {/* Headshot Column */}
                <div className="relative bg-gradient-to-br from-goldA/10 to-burgundy/30 p-6 lg:p-8 flex items-center justify-center">
                    {event.headshot ? (
                        <img
                            src={event.headshot}
                            alt={`${event.title} speaker`}
                            className="w-48 h-48 lg:w-full lg:h-auto aspect-square object-cover rounded-2xl border border-white/10 shadow-lg"
                        />
                    ) : (
                        <div className="w-48 h-48 lg:w-full lg:h-auto aspect-square rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                            <User size={64} className="text-slate-400" />
                            <span className="sr-only">Speaker photo placeholder</span>
                        </div>
                    )}
                </div>

                {/* Content Column */}
                <div className="p-6 lg:p-8 flex flex-col">
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-50">{event.title}</h2>

                    {/* Meta Info */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <div className="inline-flex items-center gap-2 text-slate-300">
                            <Calendar size={16} className="text-goldB" />
                            <span>{event.displayDate}</span>
                        </div>
                        {/* Conditionally render Host info */}
                        {event.host && (
                            <div className="inline-flex items-center gap-2 text-slate-300">
                                <Users size={16} className="text-goldB" />
                                <span>Hosted by {event.host}</span>
                            </div>
                        )}
                    </div>

                    {/* Bio */}
                    <div className="mt-6 flex-1">
                        <h3 className="text-xs uppercase tracking-[0.25em] text-goldB font-semibold mb-3">About the Speaker</h3>
                        <div className="text-slate-200/90 text-sm leading-relaxed whitespace-pre-line">
                            {event.bio}
                        </div>
                    </div>

                    {/* Action Links */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => window.alert('The event has already passed and is over.')}
                            className="btn inline-flex items-center gap-2 bg-goldA/20 border-goldB/30 hover:bg-goldA/30 cursor-pointer"
                        >
                            <Video size={18} />
                            {event.meetingLinkLabel}
                        </button>
                        {event.signupLink && (
                            <a
                                href={event.signupLink}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="btn inline-flex items-center gap-2"
                            >
                                <ExternalLink size={18} />
                                Sign Up
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TutorialEventCard({ event }) {
    return (
        <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-glass">
            <div className={`grid ${event.eventGraphic ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-0`}>
                {/* Event Graphic Column */}
                {event.eventGraphic && (
                    <div className="relative bg-gradient-to-br from-sky-500/10 to-burgundy/30 p-6 lg:p-8 flex items-center justify-center order-2 lg:order-1">
                        <img
                            src={event.eventGraphic}
                            alt={`${event.title} graphic`}
                            className="w-full max-w-md rounded-2xl border border-white/10 shadow-lg"
                        />
                    </div>
                )}

                {/* Content Column */}
                <div className="p-6 lg:p-8 flex flex-col order-1 lg:order-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-50">{event.title}</h2>

                    {/* Meta Info */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <div className="inline-flex items-center gap-2 text-slate-300">
                            <Calendar size={16} className="text-goldB" />
                            <span>{event.displayDate}</span>
                        </div>
                        {/* Conditionally render Host info */}
                        {event.host && (
                            <div className="inline-flex items-center gap-2 text-slate-300">
                                <Users size={16} className="text-goldB" />
                                <span>Hosted by {event.host}</span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h3 className="text-xs uppercase tracking-[0.25em] text-goldB font-semibold mb-3">About This Session</h3>
                        <p className="text-slate-200/90 text-sm leading-relaxed">
                            {event.description}
                        </p>
                    </div>

                    {/* Diagnostic Section */}
                    {event.diagnosticSection && (
                        <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-white/5">
                            <h4 className="text-xs uppercase tracking-[0.25em] text-goldB font-semibold mb-2">
                                {event.diagnosticSection.title}
                            </h4>
                            <p className="text-slate-200/90 text-sm leading-relaxed">
                                {event.diagnosticSection.description}
                            </p>
                        </div>
                    )}

                    {/* Action Links */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => window.alert('The event has already passed and is over.')}
                            className="btn inline-flex items-center gap-2 bg-goldA/20 border-goldB/30 hover:bg-goldA/30 cursor-pointer"
                        >
                            <Video size={18} />
                            {event.meetingLinkLabel}
                        </button>
                        {event.signupLink && (
                            <a
                                href={event.signupLink}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="btn inline-flex items-center gap-2"
                            >
                                <ExternalLink size={18} />
                                Sign Up
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
