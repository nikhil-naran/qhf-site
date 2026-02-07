import { asset } from './lib/assets.js';
import { getHeadshot } from './lib/headshots.js';

const withHeadshot = (person = {}) => ({
  ...person,
  headshot: person.headshot || getHeadshot(person.name),
});

export const TEAM_CATEGORIES = [
  { name: 'Industrials', slug: 'industrials' },
  { name: 'Mining & Materials', slug: 'mining-materials' },
  { name: 'Financials', slug: 'financials' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Consumers', slug: 'consumer-staples-retail' },
  { name: 'Real Estate & Health Care', slug: 'real-estate-health-care' },
  { name: 'Crypto', slug: 'crypto' },
  { name: 'Communications', slug: 'communications' },
  { name: 'Marketing', slug: 'marketing' },
  { name: 'Macro Economics', slug: 'macro-economics' }
];

export const TEAMS = {
  technology: {
    name: 'Technology',
    iconUrl: asset('icons/technology.png'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'James Simone', bio: 'Sector lead.' }),
    analysts: [
      withHeadshot({ name: 'Alicia Wang', bio: 'Software & platforms.' })
    ],
    reports: []
  },
  financials: {
    name: 'Financials',
    iconUrl: asset('icons/financials.png'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Bianca Rotariu', bio: 'Focus on balance sheet resilience and ROE.' }),
    analysts: [
      withHeadshot({ name: 'Thomas Skippon', bio: 'Canadian banks & insurers.' })
    ],
    reports: []
  },
  'mining-materials': {
    name: 'Mining & Materials',
    iconUrl: asset('icons/mining-materials.png'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Findlay Goodall', bio: 'Quality miners with disciplined capex.' }),
    analysts: [
      withHeadshot({ name: 'Iain Brady', bio: 'Base metals & gold.' }),
      withHeadshot({ name: 'Emory Geho', bio: 'Exploration & commodities.' })
    ],
    reports: []
  },
  industrials: {
    name: 'Industrials',
    iconUrl: asset('icons/industrials.png'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Beau Leone', bio: 'Compounders with durable moats.' }),
    analysts: [
      withHeadshot({ name: 'Jay Diri', bio: 'Transport & engineering services.' }),
      withHeadshot({ name: 'Camran Jiwani', bio: 'Industrial analytics.' })
    ],
    reports: []
  },
  'consumer-staples-retail': {
    name: 'Consumers',
    iconUrl: asset('icons/consumer-staples-retail.png'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Jillian Dalton', bio: 'High ROIC retailers.' }),
    analysts: [
      withHeadshot({ name: 'Ivan Bardziyan', bio: 'Global staples coverage.' }),
      withHeadshot({ name: 'Gavin Cameron', bio: 'Retail comps & margins.' })
    ],
    reports: []
  },
  'real-estate-health-care': {
    name: 'Real Estate & Health Care',
    iconUrl: asset('icons/real-estate-health-care.png'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Alex Papadopoulos', bio: 'Defensive yield + growth.' }),
    analysts: [withHeadshot({ name: 'Daniel Thompson', bio: 'HC services & REITs.' })],
    reports: []
  },
  crypto: {
    name: 'Crypto',
    iconUrl: asset('icons/crypto.png'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Nikhil Naran', bio: 'Risk-managed exposure to digital assets.' }),
    analysts: [withHeadshot({ name: 'Aaron Feng', bio: 'On-chain & L2s.' })],
    reports: []
  },
  communications: {
    name: 'Communications',
    iconUrl: asset('icons/communications.png'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Edan Kroi', bio: 'Leads member communications and external media.' }),
    analysts: [
      withHeadshot({ name: 'Andy Quinn', bio: 'Focuses on digital storytelling and outreach.' })
    ],
    reports: []
  },
  marketing: {
    name: 'Marketing',
    iconUrl: asset('icons/marketing.png'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Nora Malik', bio: 'Brand, outreach, and events.' }),
    members: [
      withHeadshot({ name: 'Jessica Cook', bio: 'Events & partnerships.' }),
      withHeadshot({ name: 'Adam Bizios', bio: 'Content & campaigns.' }),
      withHeadshot({ name: 'Sydney Garrah', bio: 'Creative & design.' })
    ],
    reports: []
  },
  'macro-economics': {
    name: 'Macro Economics',
    iconUrl: asset('icons/macro-economics.png'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Dr. Samuel Grant', bio: 'Leads macroeconomic research and scenario analysis.' }),
    members: [
      { name: 'Ravjot Sarao' },
      { name: 'Roscoe Sze' }
    ].map(withHeadshot),
    reports: []
  }
};

// Home performance (index = month number)
export const perfSeries = {
  canadian: {
    our: [100, 103, 105, 108, 112, 115, 117, 118, 120, 124, 127, 129],
    tsx: [100, 101, 102, 104, 106, 107, 109, 110, 111, 113, 115, 116]
  },
  us: {
    our: [100, 104, 108, 111, 115, 120, 123, 125, 127, 130, 134, 137],
    sp500: [100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 121]
  }
};

export const sponsors = [
  { name: 'RBC (placeholder)', logoUrl: asset('sponsor-placeholder.svg') },
  { name: 'TD (placeholder)', logoUrl: asset('sponsor-placeholder.svg') },
  { name: 'BMO (placeholder)', logoUrl: asset('sponsor-placeholder.svg') },
  { name: 'Scotiabank (placeholder)', logoUrl: asset('sponsor-placeholder.svg') }
];

export const events = [
  { dateISO: '2025-09-15', title: 'Fall Info Session', description: 'Overview of QHF, selection process, and Q&A.', location: 'Queen\'s University Campus' },
  { dateISO: '2025-10-02', title: 'Equity Research Workshop', description: 'Hands-on session building an investment thesis.', location: 'Goodes Hall 104' },
  { dateISO: '2025-11-12', title: 'Alumni Panel Night', description: 'Hear from alumni at leading firms.', location: 'Virtual' },
];

export const alumniStats = { alumniCount: 200, cities: 18, industries: 12 };

export const FEATURED_EVENTS = [
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
    year: '2024',
    title: '2024 Year-End Performance Report',
    date: 'December 2024',
    description: 'A comprehensive review of QHF\'s investment strategy, portfolio performance, and organizational milestones throughout the 2024 fiscal year.',
    link: '#', // Placeholder
    thumbnail: null
  },
  {
    year: '2023',
    title: '2023 Annual Report',
    date: 'December 2023',
    description: 'Detailed analysis of our sector allocations, key holdings performance, and the expansion of our analyst program.',
    link: '#',
    thumbnail: null
  }
];

export const STOCK_PITCHES = [
  {
    ticker: 'SHOP',
    company: 'Shopify Inc.',
    title: 'Shopify: The Backbone of Modern Commerce',
    date: 'October 2024',
    author: 'Technology Team',
    thesis: 'Long-term growth driven by expansion into enterprise retail and merchant solutions monetization.',
    link: '#',
    type: 'Buy'
  },
  {
    ticker: 'CP',
    company: 'Canadian Pacific Kansas City',
    title: 'CPKC: A Continental Powerhouse',
    date: 'November 2024',
    author: 'Industrials Team',
    thesis: 'Synergy realization from the KCS merger creating the first single-line rail network connecting Canada, the US, and Mexico.',
    link: '#',
    type: 'Buy'
  }
];
