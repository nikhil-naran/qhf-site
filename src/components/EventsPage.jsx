import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Calendar, User, Video, Users, ExternalLink } from 'lucide-react';
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
        revealOnScroll(headerRef.current, { translateY: 16 });
    }, []);

    useEffect(() => {
        revealOnScroll(contentRef.current, { translateY: 16, delay: 60 });
    }, [selectedEventId]);

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
        <main className="py-16 sm:py-20 lg:py-24">
            <Helmet>
                <title>Events | Queen's Hedge Fund</title>
                <meta name="description" content="Upcoming events hosted by Queen's Hedge Fund including speaker sessions and investment tutorials." />
            </Helmet>

            <div className="mx-auto max-w-7xl px-4">
                <section ref={headerRef} className="panel relative z-20 px-6 py-8 sm:px-10 lg:px-12">
                    <p className="inline-flex items-center gap-2 border border-rule px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-goldA">
                        Events
                    </p>
                    <h1 className="mt-4 font-serif text-4xl font-semibold text-ink sm:text-5xl">
                        Upcoming Events
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/70 sm:text-base">
                        Join our speaker sessions, workshops, and tutorials designed to enhance your investment knowledge and connect you with industry professionals.
                    </p>

                    <div className="mt-8 relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setDropdownOpen((v) => !v)}
                            aria-haspopup="listbox"
                            aria-expanded={dropdownOpen}
                            aria-controls="event-listbox"
                            className={`inline-flex w-full items-center gap-3 border px-5 py-4 text-left transition-colors md:w-auto md:min-w-[400px] ${dropdownOpen ? 'border-goldA bg-goldA/5' : 'border-rule hover:border-goldA/50'}`}
                        >
                            <div className="flex-1">
                                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">Select Event</div>
                                <div className="mt-1 truncate font-semibold text-ink">{selectedEvent.title}</div>
                            </div>
                            <ChevronDown
                                size={20}
                                className={`text-ink/50 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {dropdownOpen && (
                            <ul
                                id="event-listbox"
                                role="listbox"
                                className="dropdown-panel absolute left-0 right-0 top-full z-50 mt-2 w-full md:right-auto md:min-w-[400px]"
                            >
                                {FEATURED_EVENTS.map((event) => (
                                    <li key={event.id}>
                                        <button
                                            type="button"
                                            role="option"
                                            aria-selected={event.id === selectedEventId}
                                            onClick={() => handleSelectEvent(event.id)}
                                            className={`w-full rounded px-4 py-3 text-left transition-colors ${event.id === selectedEventId ? 'bg-goldA/10 text-goldA' : 'text-ink/75 hover:bg-goldA/5'}`}
                                        >
                                            <div className="font-semibold">{event.title}</div>
                                            <div className="mt-1 text-xs text-ink/45">{event.displayDate}</div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>

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
        <div className="panel overflow-hidden">
            <div className="grid gap-0 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="relative flex items-center justify-center border-b border-rule bg-goldA/5 p-6 md:border-b-0 md:border-r lg:p-8">
                    {event.headshot ? (
                        <img
                            src={event.headshot}
                            alt={`${event.title} speaker`}
                            className="aspect-square w-40 rounded object-cover border border-rule sm:w-48 md:h-auto md:w-full"
                        />
                    ) : (
                        <div className="flex aspect-square w-40 items-center justify-center rounded border border-rule bg-ink/5 sm:w-48 md:h-auto md:w-full">
                            <User size={64} className="text-ink/30" />
                            <span className="sr-only">Speaker photo placeholder</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-semibold text-ink lg:text-3xl">{event.title}</h2>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <div className="inline-flex items-center gap-2 text-ink/60">
                            <Calendar size={16} className="text-goldA" />
                            <span>{event.displayDate}</span>
                        </div>
                        {event.host && (
                            <div className="inline-flex items-center gap-2 text-ink/60">
                                <Users size={16} className="text-goldA" />
                                <span>Hosted by {event.host}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex-1">
                        <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-goldA">About the Speaker</h3>
                        <div className="whitespace-pre-line text-sm leading-relaxed text-ink/70">
                            {event.bio}
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 border-t border-rule pt-6">
                        <button
                            type="button"
                            onClick={() => window.alert('The event has already passed and is over.')}
                            className="btn inline-flex items-center gap-2"
                        >
                            <Video size={18} />
                            {event.meetingLinkLabel}
                        </button>
                        {event.signupLink && (
                            <a
                                href={event.signupLink}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="btn btn-ghost inline-flex items-center gap-2"
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
        <div className="panel overflow-hidden">
            <div className={`grid gap-0 ${event.eventGraphic ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
                {event.eventGraphic && (
                    <div className="relative order-2 flex items-center justify-center border-rule bg-goldA/5 p-6 lg:order-1 lg:border-r lg:p-8">
                        <img
                            src={event.eventGraphic}
                            alt={`${event.title} graphic`}
                            className="w-full max-w-md rounded border border-rule"
                        />
                    </div>
                )}

                <div className="order-1 flex flex-col p-6 lg:order-2 lg:p-8">
                    <h2 className="font-serif text-2xl font-semibold text-ink lg:text-3xl">{event.title}</h2>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <div className="inline-flex items-center gap-2 text-ink/60">
                            <Calendar size={16} className="text-goldA" />
                            <span>{event.displayDate}</span>
                        </div>
                        {event.host && (
                            <div className="inline-flex items-center gap-2 text-ink/60">
                                <Users size={16} className="text-goldA" />
                                <span>Hosted by {event.host}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-goldA">About This Session</h3>
                        <p className="text-sm leading-relaxed text-ink/70">
                            {event.description}
                        </p>
                    </div>

                    {event.diagnosticSection && (
                        <div className="mt-6 border border-rule bg-goldA/5 p-4">
                            <h4 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-goldA">
                                {event.diagnosticSection.title}
                            </h4>
                            <p className="text-sm leading-relaxed text-ink/70">
                                {event.diagnosticSection.description}
                            </p>
                        </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3 border-t border-rule pt-6">
                        <button
                            type="button"
                            onClick={() => window.alert('The event has already passed and is over.')}
                            className="btn inline-flex items-center gap-2"
                        >
                            <Video size={18} />
                            {event.meetingLinkLabel}
                        </button>
                        {event.signupLink && (
                            <a
                                href={event.signupLink}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="btn btn-ghost inline-flex items-center gap-2"
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
