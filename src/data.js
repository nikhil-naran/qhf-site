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
  { name: 'Consumer Staples & Retail', slug: 'consumer-staples-retail' },
  { name: 'Real Estate & Health Care', slug: 'real-estate-health-care' },
  { name: 'Crypto', slug: 'crypto' },
  { name: 'Communications', slug: 'communications' },
  { name: 'Marketing', slug: 'marketing' },
  { name: 'Macro Economics', slug: 'macro-economics' }
];

export const TEAMS = {
  technology: {
    name: 'Technology',
    iconUrl: asset('icons/technology.svg'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'James Simone', bio: 'Sector lead.' }),
    analysts: [
      withHeadshot({ name: 'Alicia Wang', bio: 'Software & platforms.' })
    ],
    reports: []
  },
  financials: {
    name: 'Financials',
    iconUrl: asset('icons/financials.svg'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Bianca Rotariu', bio: 'Focus on balance sheet resilience and ROE.' }),
    analysts: [
      withHeadshot({ name: 'Thomas Skippon', bio: 'Canadian banks & insurers.' })
    ],
    reports: []
  },
  'mining-materials': {
    name: 'Mining & Materials',
    iconUrl: asset('icons/mining-materials.svg'),
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
    iconUrl: asset('icons/industrials.svg'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Beau Leone', bio: 'Compounders with durable moats.' }),
    analysts: [
      withHeadshot({ name: 'Jay Diri', bio: 'Transport & engineering services.' }),
      withHeadshot({ name: 'Camran Jiwani', bio: 'Industrial analytics.' })
    ],
    reports: []
  },
  'consumer-staples-retail': {
    name: 'Consumer Staples & Retail',
    iconUrl: asset('icons/consumer-staples-retail.svg'),
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
    iconUrl: asset('icons/real-estate-health-care.svg'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Alex Papadopoulos', bio: 'Defensive yield + growth.' }),
    analysts: [withHeadshot({ name: 'Daniel Thompson', bio: 'HC services & REITs.' })],
    reports: []
  },
  crypto: {
    name: 'Crypto',
    iconUrl: asset('icons/crypto.svg'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Nikhil Naran', bio: 'Risk-managed exposure to digital assets.' }),
    analysts: [withHeadshot({ name: 'Aaron Feng', bio: 'On-chain & L2s.' })],
    reports: []
  },
  communications: {
    name: 'Communications',
    iconUrl: asset('icons/communications.svg'),
    holdings: [],
    portfolioManager: withHeadshot({ name: 'Edan Kroi', bio: 'Leads member communications and external media.' }),
    analysts: [
      withHeadshot({ name: 'Andy Quinn', bio: 'Focuses on digital storytelling and outreach.' })
    ],
    reports: []
  },
  marketing: {
    name: 'Marketing',
    iconUrl: asset('icons/marketing.svg'),
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
    iconUrl: asset('icons/macro-economics.svg'),
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
    our:  [100,103,105,108,112,115,117,118,120,124,127,129],
    tsx:  [100,101,102,104,106,107,109,110,111,113,115,116]
  },
  us: {
    our:   [100,104,108,111,115,120,123,125,127,130,134,137],
    sp500: [100,102,104,106,108,110,112,114,116,118,120,121]
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
