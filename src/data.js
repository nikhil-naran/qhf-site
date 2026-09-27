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
    id: 'cfa-level-1-tutorial-one',
    title: 'CFA Level 1 - Tutorial One',
    type: 'tutorial',
    dateISO: '2026-09-10',
    displayDate: 'September 10, 2026',
    host: 'Anson El-Ayari',
    meetingLink: 'https://teams.microsoft.com/meet/273427765484907?p=zFCz5kaki096QHKxCk',
    meetingLinkLabel: 'Join Meeting',
    eventGraphic: null,
    description: 'Tune in to join Anson in a short tutorial on quantitative methods used directly from the CFA Level 1 curriculum.',
    diagnosticSection: null,
  },
  {
    id: 'pm-strategy-tutorial-and-roast',
    title: 'PM Strategy Tutorial and Roast',
    type: 'tutorial',
    dateISO: '2026-09-23',
    displayDate: 'September 23, 2026',
    host: null,
    meetingLink: 'https://teams.microsoft.com/meet/273427765484907?p=zFCz5kaki096QHKxCk',
    meetingLinkLabel: 'Join Meeting',
    eventGraphic: null,
    description: 'Tune in to hear about the different strategies PMs will be running throughout the year, and the thought process behind each — from strategy development to deployment.',
    diagnosticSection: null,
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
export const ANNUAL_REPORTS = [];

export const STOCK_PITCHES = [];
