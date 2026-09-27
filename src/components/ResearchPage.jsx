import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Calendar, ExternalLink, Download, TrendingUp, BarChart3 } from 'lucide-react';
import { ANNUAL_REPORTS, STOCK_PITCHES } from '../data.js';
import { revealOnScroll } from '../lib/animation.js';

export default function ResearchPage() {
    const [activeTab, setActiveTab] = useState('reports');
    const headerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        revealOnScroll(headerRef.current, { translateY: 16 });
    }, []);

    useEffect(() => {
        revealOnScroll(contentRef.current, { translateY: 16, delay: 60 });
    }, [activeTab]);

    return (
        <main className="py-16 sm:py-20 lg:py-24">
            <Helmet>
                <title>Research | Queen's Hedge Fund</title>
                <meta name="description" content="Access Queen's Hedge Fund's annual performance reports and past stock pitches." />
            </Helmet>

            <div className="mx-auto max-w-7xl px-4">
                <section ref={headerRef} className="panel relative z-20 px-6 py-10 sm:px-10 lg:px-12">
                    <p className="inline-flex items-center gap-2 border border-rule px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-goldA">
                        Research &amp; Performance
                    </p>
                    <h1 className="mt-4 font-serif text-4xl font-semibold text-ink sm:text-5xl">
                        Insights from the Fund
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/70 sm:text-base">
                        Explore our periodic performance reviews and historical investment theses. Transparency and rigorous analysis are at the core of our operations.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <button
                            onClick={() => setActiveTab('reports')}
                            className={`flex items-center gap-2 border px-5 py-3 text-sm transition-colors sm:px-6 sm:text-base ${activeTab === 'reports' ? 'border-goldA bg-goldA/10 text-goldA' : 'border-rule text-ink/60 hover:border-goldA/40'}`}
                        >
                            <FileText size={18} />
                            <span className="font-semibold">Annual Reports</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('pitches')}
                            className={`flex items-center gap-2 border px-5 py-3 text-sm transition-colors sm:px-6 sm:text-base ${activeTab === 'pitches' ? 'border-goldA bg-goldA/10 text-goldA' : 'border-rule text-ink/60 hover:border-goldA/40'}`}
                        >
                            <TrendingUp size={18} />
                            <span className="font-semibold">Stock Pitches</span>
                        </button>
                    </div>
                </section>

                <section ref={contentRef} className="mt-10">
                    {activeTab === 'reports' ? (
                        ANNUAL_REPORTS.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                {ANNUAL_REPORTS.map((report, idx) => (
                                    <ReportCard key={idx} report={report} />
                                ))}
                            </div>
                        ) : (
                            <ComingSoonCard label="Annual Reports" />
                        )
                    ) : (
                        STOCK_PITCHES.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
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
        <div className="panel p-10 text-center sm:p-14">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-rule text-goldA">
                <FileText size={26} />
            </div>
            <h3 className="text-xl font-semibold text-ink">{label}</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/55">
                Coming soon. Our team is preparing content for this section.
            </p>
        </div>
    );
}

function ReportCard({ report }) {
    return (
        <div className="panel p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between">
                <div className="border border-rule p-3 text-goldA">
                    <BarChart3 size={22} />
                </div>
                <span className="font-serif text-2xl font-semibold text-ink/20">{report.year}</span>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-ink">{report.title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-ink/60">{report.description}</p>

            <div className="flex items-center justify-between border-t border-rule pt-6">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink/40">
                    <Calendar size={14} />
                    {report.date}
                </div>
                <a
                    href={report.link}
                    className="btn btn-ghost px-4 py-2.5 text-xs"
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
    );
}

function PitchCard({ pitch }) {
    return (
        <div className="panel p-6 text-left sm:p-8">
            <div className="mb-6 flex items-center gap-3">
                <span className={`px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest border ${pitch.type === 'Buy' ? 'border-emerald-700/25 bg-emerald-700/5 text-emerald-700' : 'border-red-700/25 bg-red-700/5 text-red-700'}`}>
                    {pitch.type}
                </span>
                <span className="font-mono text-sm tracking-tight text-ink/40">
                    {pitch.ticker}
                </span>
            </div>

            <h3 className="mb-2 text-xl font-semibold text-ink">
                {pitch.company}
            </h3>
            <p className="mb-4 text-sm font-semibold italic text-goldA">
                "{pitch.title}"
            </p>
            <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-ink/65">
                {pitch.thesis}
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-rule pt-6">
                <div className="text-xs">
                    <div className="mb-1 font-mono uppercase tracking-widest text-ink/40">Presented By</div>
                    <div className="font-semibold text-ink/75">{pitch.author}</div>
                </div>
                <a
                    href={pitch.link}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-rule p-3 text-ink/50 transition-colors hover:border-goldA hover:text-goldA"
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
