import { asset } from './lib/assets.js';
import { getHeadshot } from './lib/headshots.js';

const withHeadshot = (person = {}) => ({
  ...person,
  headshot: person.headshot || getHeadshot(person.name),
});

export const TEAM_CATEGORIES = [
  { name: 'Global Equities', slug: 'global-equities' },
  { name: 'Fixed Income', slug: 'fixed-income' },
  { name: 'Commodities', slug: 'commodities' },
  { name: 'Foreign Exchange', slug: 'foreign-exchange' },
  { name: 'Crypto', slug: 'crypto' },
  { name: 'Quantitative Strategies', slug: 'quantitative-strategies' },
  { name: 'Marketing', slug: 'marketing' },
];

export const TEAMS = {
  'global-equities': {
    name: 'Global Equities',
    strategy: 'Runs a concentrated, multi-strategy equity mandate — from event-driven situations to deep-value analysis — across global markets.',
    holdings: [],
    coPortfolioManagers: [
      withHeadshot({ name: 'Jill Dalton' }),
      withHeadshot({ name: 'Alex Papadopoulos' }),
      withHeadshot({ name: 'Finn Goodall' }),
      withHeadshot({ name: 'Anson El-Ayari' })
    ],
    analysts: [
      withHeadshot({ name: 'James Simone' }),
      withHeadshot({ name: 'Marcus Cvitak' }),
      withHeadshot({ name: 'Ronin Kinloch Varga' }),
      withHeadshot({ name: 'Brandon Scheidler' }),
      withHeadshot({ name: 'Daniel Thompson' }),
      withHeadshot({ name: 'Alicia Wang' }),
      withHeadshot({ name: 'Angela Chen' }),
      withHeadshot({ name: 'Gavin Cameron' }),
      withHeadshot({ name: 'Jayanth Dirisanapu' }),
      withHeadshot({ name: 'Thomas Skippon' }),
      withHeadshot({ name: 'Matthew Harrison' }),
      withHeadshot({ name: 'Nick Page' })
    ],
    reports: []
  },
  'fixed-income': {
    name: 'Fixed Income',
    strategy: 'Runs relative-value and directional strategies across sovereign and corporate rates markets.',
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Russell Weir' }),
    analysts: [
      withHeadshot({ name: 'Nicholas Moretta' })
    ],
    reports: []
  },
  commodities: {
    name: 'Commodities',
    strategy: 'Trades relative-value and directional strategies across metals, mining, and broader commodity markets.',
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Finn Goodall' }),
    analysts: [
      withHeadshot({ name: 'Ben Shearing' })
    ],
    reports: []
  },
  'foreign-exchange': {
    name: 'Foreign Exchange',
    strategy: 'Runs relative-value and directional strategies across G10 and select emerging-market currencies.',
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Ethan Cairns' }),
    analysts: [
      withHeadshot({ name: 'Logan Michaud' })
    ],
    reports: []
  },
  crypto: {
    name: 'Crypto',
    strategy: 'Runs risk-managed strategies across digital assets.',
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Aaron Feng' }),
    analysts: [
      withHeadshot({ name: 'Marius Cotet' })
    ],
    reports: []
  },
  'quantitative-strategies': {
    name: 'Quantitative Strategies',
    strategy: 'Runs systematic, model-driven strategies across asset classes.',
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Simon Jarvis' }),
    analysts: [
      withHeadshot({ name: 'Isaac Bennett' }),
      withHeadshot({ name: 'Krishan Muni' })
    ],
    reports: []
  },
  marketing: {
    name: 'Marketing',
    holdings: [],
    members: [
      withHeadshot({ name: 'Jane Shi' }),
      withHeadshot({ name: 'Oliver Bell' })
    ],
    reports: []
  }
};

export const PERFORMANCE_2025 = {
  year: 'FY2025',
  returns: [
    {
      label: 'Canadian Equity',
      return: 30.30,
      benchmark: { label: 'S&P/TSX Composite', return: 28.5 }
    },
    {
      label: 'American Equity',
      return: 37.32,
      benchmark: { label: 'S&P 500', return: 16.39 }
    }
  ],
  stats: [
    { value: '1.39', label: 'Sharpe Ratio' },
    { value: '86%', label: 'Win Rate' },
    { value: '132', label: 'Total Trades', sublabel: '73 buys / 59 sells' },
    { value: '62', label: 'Median Holding (days)' }
  ]
};

export const sponsors = [
  { name: 'RBC (placeholder)', logoUrl: asset('sponsor-placeholder.svg') },
  { name: 'TD (placeholder)', logoUrl: asset('sponsor-placeholder.svg') },
  { name: 'BMO (placeholder)', logoUrl: asset('sponsor-placeholder.svg') },
  { name: 'Scotiabank (placeholder)', logoUrl: asset('sponsor-placeholder.svg') }
];

export const FEATURED_EVENTS = [
  {
    id: 'pm-strategy-tutorial-and-roast',
    title: 'PM Strategy Tutorial and Roast',
    type: 'tutorial',
    dateISO: '2026-09-22',
    displayDate: 'September 22, 2026',
    host: null,
    meetingLink: 'https://teams.microsoft.com/meet/273427765484907?p=zFCz5kaki096QHKxCk',
    meetingLinkLabel: 'Join Meeting',
    eventGraphic: null,
    description: `Each Portfolio Manager took the floor to walk through the strategy they're running for the year ahead — the thesis behind it, the risk parameters guiding it, and why it earned a place in the book. After every pitch, the floor opened up: teammates and other PMs stress-tested the ideas, challenged assumptions, and probed for weaknesses before any real capital moved. Part strategy session, part public defense, the "roast" format is designed to sharpen every mandate under the same scrutiny a real portfolio manager would face from a risk committee — before the market does it for us.`,
    diagnosticSection: null,
  },
  {
    id: 'cfa-level-1-tutorial-one',
    title: 'CFA Level 1 - Tutorial One',
    type: 'speaker',
    dateISO: '2026-03-15T18:00:00',
    displayDate: 'March 15, 2026 @ 6:00–7:00 PM',
    host: 'Mounir El-Ayari',
    meetingLink: 'https://teams.microsoft.com/meet/273427765484907?p=zFCz5kaki096QHKxCk',
    meetingLinkLabel: 'Join Meeting',
    headshot: asset(`headshots/${encodeURIComponent('Elayari Wealth Management.png')}`),
    bio: `For our first CFA Level 1 tutorial, we welcomed Mounir El-Ayari — Senior Portfolio Manager and Senior Investment Advisor at Richardson Wealth — to walk through the quantitative methods covered in the CFA Level 1 curriculum and share how those concepts apply to real-world portfolio management.

Senior Portfolio Manager, Senior Investment Advisor. After graduating from university in 1995, Mounir joined a bank-owned investment dealer as an Investment Advisor. Early in his career, he learned the importance of developing a deep understanding of his clients' financial needs and objectives. He also learned the value of investing in only the highest-quality securities and managing risk to preserve capital. As his career progressed, Mounir added four designations to his credentials: he became a Chartered Investment Manager (CIM), a Certified International Wealth Manager (CIWM), a Professional Financial Planner (PFP), and a Fellow of the Canadian Securities Institute (FCSI) and is licensed to trade options and futures. Mounir is also licensed to provide life, disability and accident & sickness insurance. Mounir advises broadly diversified investors who include high-net-worth families, C-level executives, trusts, foundations and businesses. He goes beyond portfolio management, with the help of firm's trusted in-house professionals, to provide tax, insurance and estate planning strategies that address all private wealth needs from top to bottom. All of his client relationships begin the same way - a relaxed meeting consisting of a straightforward exchange of ideas. He encourages people to openly share their personal and business circumstances, concerns, risk tolerance, hopes and goals. Mounir listens carefully to gather key insights from his meetings that inform his actions. In 2016, Mounir joined Richardson Wealth (formerly Richardson GMP) to better serve the needs of his clients with a firm that specializes in wealth management. Believing strongly in the importance of trust, integrity and an elevated code of service, Richardson Wealth's reputation for client care and heritage of high ethical standards resonated with him. More specifically, Mounir appreciates that Richardson Wealth is the first wealth management firm in Canada to earn Centre for Fiduciary Excellence Certification as an Investment Advisory firm.`,
  },
  {
    id: 'wso-x-qhf',
    title: 'Wall Street Oasis X Queen\'s Hedge Fund',
    type: 'tutorial',
    dateISO: '2026-02-05T18:30:00',
    displayDate: 'February 5, 2026',
    host: 'Patrick Curtis',
    meetingLink: '#',
    meetingLinkLabel: 'Join Meeting',
    eventGraphic: null,
    description: `Q&A Session with Patrick Curtis — Break Into High Finance.

As promised, you're eligible for free access to two of WSO's top bootcamps sponsored by your club:

• Financial Modeling Bootcamp ($497) — February 8, 2026 (3 hours)
• Investment Banking Interview Bootcamp ($297) — February 7, 2026 (4.5 hours)

Attendance will be taken! If you attend the Q&A session, you'll also receive access to the LARGEST high finance application tracker. Fill out your email to secure your spot in both bootcamps, and we'll be in touch with more details.`,
    diagnosticSection: null,
    signupLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfT9Bqi_bzficpWx31VMl5Eegru6R8B8jryjQgH-Hc-FwAQMA/viewform',
  },
  {
    id: 'jane-shantz-speaker',
    title: 'Jane Shantz Management Consulting Speaker Event',
    type: 'speaker',
    dateISO: '2025-12-01T18:30:00',
    displayDate: 'December 1, 2025 @ 6:30 PM',
    host: null,
    meetingLink: '#', // Placeholder - meeting hasn't started
    meetingLinkLabel: 'Join Google Meet',
    headshot: asset('IMG_3698.jpeg'),
    bio: `Jane Shantz is a seasoned Organizational Change Management Consultant, Strategist, and Executive Coach with nearly 30 years of experience helping Fortune 500 companies navigate complex transformation. She began her career at Andersen Consulting (now Accenture) and later founded her own consulting practice, where she partners with executive teams to lead enterprise-wide change across industries such as banking, retail, and healthcare.

Jane's work spans major regulatory programs, digital modernization, and operating model redesign. She is often brought in as a trusted advisor or program leader to align stakeholders, drive momentum, and deliver measurable impact in high-stakes environments.

Outside of consulting, Jane is an executive coach who works primarily with women leaders seeking to lead with clarity, influence, and integrity. She is also a passionate speaker and mentor, known for blending strategic insight with grounded storytelling.

Jane holds two degrees from Queen's University—one in Kinesiology and one in History. During her time at Queen's, she served as Vice-President of University Affairs, and was a proud member of the Queen's Bands, experiences that shaped her leadership philosophy and drive for impact.`,
  },
  {
    id: 'csc-investment-tutorial',
    title: 'CSC Investment Analysis Tutorial',
    type: 'tutorial',
    dateISO: '2025-11-22T18:30:00',
    displayDate: 'November 22, 2025 @ 6:30 PM',
    host: 'CIO Anson El-Ayari',
    meetingLink: '#', // Placeholder
    meetingLinkLabel: 'Join Meeting',
    eventGraphic: null, // Placeholder image
    description: `Join us for a hands-on tutorial covering the core components of investment analysis, including fundamental, technical, and company-level analysis. This session will walk through how these frameworks are applied in real-world decision-making and is designed to support students preparing for the CSC or looking to strengthen their analytical toolkit. Open to all experience levels.`,
    diagnosticSection: null,
  },
];
export const ANNUAL_REPORTS = [
  {
    year: '2025–2026',
    title: 'QHF Annual Report',
    description: 'Our inaugural year in review — the founding exec team, FY2025 performance (+37.32% USD portfolio, +30.30% CAD portfolio, +44.00% crypto portfolio), macro strategy & outlook, and investment team perspectives heading into 2026.',
    date: '2025–2026',
    link: asset('reports/qhf-annual-report-2025-2026.pdf'),
  },
];

export const STOCK_PITCHES = [
  {
    type: 'Buy',
    ticker: 'NYSE: BNS',
    company: 'Scotiabank',
    title: 'Red Means Go',
    thesis: 'Scotiabank pairs a fortress-grade 13.3% CET1 ratio with a strategic refocus on its core Pacific Alliance markets, positioning it for margin recovery, cost efficiency through its "Ignite" program, and a re-rating from its current 0.9x P/B discount toward its historical 1.2–1.4x range.',
    author: 'Bianca Rotariu, Thomas Skippon, Logan Michaud',
    link: asset('pitches/bns-stock-pitch.pdf'),
  },
  {
    type: 'Buy',
    ticker: 'NYSE: AG',
    company: 'First Majestic Silver',
    title: 'The Silver Narrative',
    thesis: 'As the purest public play on silver, First Majestic captures maximum torque to the metal through the newly integrated Los Gatos Complex, an ~82% production increase guided for 2025-26, and its own minting facility — against a silver market running its fifth consecutive year of structural deficit.',
    author: 'Finn Goodall — Global Equities',
    link: asset('pitches/first-majestic-silver-pitch.pdf'),
  },
];
