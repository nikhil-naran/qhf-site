import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, LineChart, Calendar, ExternalLink, Download, Search, TrendingUp, BarChart3 } from 'lucide-react';
import { ANNUAL_REPORTS, STOCK_PITCHES } from '../data.js';
import { revealOnScroll } from '../lib/animation.js';

export default function ResearchPage() {
    const [activeTab, setActiveTab] = useState('reports');
    const headerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        revealOnScroll(headerRef.current, { translateY: 28 });
    }, []);

    useEffect(() => {
        revealOnScroll(contentRef.current, { translateY: 28, delay: 100 });
    }, [activeTab]);

    return (
        <main className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
            <Helmet>
                <title>Research | Queen's Hedge Fund</title>
                <meta name="description" content="Access Queen's Hedge Fund's annual performance reports and past stock pitches." />
            </Helmet>

            {/* Background glows */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-goldA/10 blur-[100px]" aria-hidden="true" />
                <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-burgundy/10 blur-[100px]" aria-hidden="true" />
            </div>

            <div className="mx-auto max-w-7xl px-4">
                {/* Header Section */}
                <section
                    ref={headerRef}
                    className="glass relative z-20 rounded-3xl border border-white/10 px-6 py-10 shadow-glass sm:px-10 lg:px-12"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0" aria-hidden="true" />
                    <div className="relative z-10">
                        <header>
                            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-goldB">
                                Research & Performance
                            </p>
                            <h1 className="mt-4 font-serif text-4xl font-semibold text-white sm:text-5xl">
                                Insights from the Fund
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200/90 sm:text-base">
                                Explore our periodic performance reviews and historical investment theses. Transparency and rigorous analysis are at the core of our operations.
                            </p>
                        </header>

                        {/* Tab Switcher */}
                        <div className="mt-10 flex flex-wrap gap-4">
                            <button
                                onClick={() => setActiveTab('reports')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all ${activeTab === 'reports'
                                    ? 'border-goldB/40 bg-goldA/10 text-goldB shadow-lg'
                                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                                    }`}
                            >
                                <FileText size={18} />
                                <span className="font-semibold">Annual Reports</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('pitches')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all ${activeTab === 'pitches'
                                    ? 'border-goldB/40 bg-goldA/10 text-goldB shadow-lg'
                                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                                    }`}
                            >
                                <TrendingUp size={18} />
                                <span className="font-semibold">Stock Pitches</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section ref={contentRef} className="mt-12">
                    {activeTab === 'reports' ? (
                        ANNUAL_REPORTS.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                                {ANNUAL_REPORTS.map((report, idx) => (
                                    <ReportCard key={idx} report={report} />
                                ))}
                            </div>
                        ) : (
                            <ComingSoonCard label="Annual Reports" />
                        )
                    ) : (
                        STOCK_PITCHES.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {STOCK_PITCHES.map((pitch, idx) => (
                                    <PitchCard key={idx} pitch={pitch} />
                                ))}
                            </div>
                        ) : (
                            <ComingSoonCard label="Stock Pitches" />
                        )
                    )}
                </section>
            </div>
        </main>
    );
}

function ComingSoonCard({ label }) {
    return (
        <div className="glass rounded-3xl border border-white/10 p-10 sm:p-14 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-goldB">
                <FileText size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-50">{label}</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                Coming soon. Our team is preparing content for this section.
            </p>
        </div>
    );
}

function ReportCard({ report }) {
    return (
        <div className="glass group relative overflow-hidden rounded-3xl border border-white/10 p-6 transition-all hover:border-goldB/30 sm:p-8">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-goldA/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-goldB group-hover:scale-110 transition-transform">
                        <BarChart3 size={24} />
                    </div>
                    <span className="text-2xl font-bold text-white/20">{report.year}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-50 mb-3 group-hover:text-goldB transition-colors">
                    {report.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                    {report.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider">
                        <Calendar size={14} />
                        {report.date}
                    </div>
                    <a
                        href={report.link}
                        className="btn py-2 px-4 text-xs font-semibold bg-white/5 hover:bg-goldA/20 border-white/10 hover:border-goldB/30"
                        onClick={(e) => {
                            if (report.link === '#') {
                                e.preventDefault();
                                window.alert('Report coming soon!');
                            }
                        }}
                    >
                        <Download size={14} />
                        Download PDF
                    </a>
                </div>
            </div>
        </div>
    );
}

function PitchCard({ pitch }) {
    return (
        <div className="glass group relative overflow-hidden rounded-3xl border border-white/10 p-6 transition-all hover:border-goldB/30 sm:p-8 text-left">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${pitch.type === 'Buy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                    {pitch.type}
                </span>
                <span className="text-slate-500 text-sm font-mono tracking-tighter">
                    {pitch.ticker}
                </span>
            </div>

            <h3 className="text-xl font-bold text-slate-50 mb-2">
                {pitch.company}
            </h3>
            <p className="text-goldB text-sm font-semibold mb-4 italic">
                "{pitch.title}"
            </p>
            <p className="text-sm text-slate-200/80 leading-relaxed mb-6 line-clamp-3">
                {pitch.thesis}
            </p>

            <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                <div className="text-xs">
                    <div className="text-slate-500 uppercase tracking-widest mb-1">Presented By</div>
                    <div className="text-slate-300 font-semibold">{pitch.author}</div>
                </div>
                <a
                    href={pitch.link}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-goldB hover:border-goldB/40 transition-all"
                    onClick={(e) => {
                        if (pitch.link === '#') {
                            e.preventDefault();
                            window.alert('Pitch deck coming soon!');
                        }
                    }}
                >
                    <ExternalLink size={18} />
                </a>
            </div>
        </div>
    );
}
