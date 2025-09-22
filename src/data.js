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
  { name: 'Marketing', slug: 'marketing' },
  { name: 'Macro Economics', slug: 'macro-economics' }
];

export const TEAMS = {
  technology: {
    name: 'Technology',
  iconUrl: '/icons/technology.svg',
    holdings: [
      { ticker: 'NVDA', company: 'NVIDIA', allocation: 28, performance: 32 },
      { ticker: 'AAPL', company: 'Apple', allocation: 18, performance: 9 },
      { ticker: 'MSFT', company: 'Microsoft', allocation: 16, performance: 12 },
      { ticker: 'SHOP', company: 'Shopify', allocation: 22, performance: 18 }
    ],
    coPortfolioManagers: [
      withHeadshot({ name: 'Anson El-Ayari', bio: 'Co-PM: applied data & research.' }),
      withHeadshot({ name: 'Nikhil Naran', bio: 'Co-PM: platform & infra.' })
    ],
    analysts: [
      withHeadshot({ name: 'James Simone', bio: 'Semis & AI infra.' }),
      withHeadshot({ name: 'Alicia Wang', bio: 'Software & platforms.' })
    ],
    reports: [
      { title: 'NVIDIA Variant Perception (Q1)', url: '/reports/nvda-q1.pdf' },
      { title: 'Shopify Deep Dive', url: '/reports/shopify-deep-dive.pdf' }
    ]
  },
  financials: {
    name: 'Financials',
  iconUrl: '/icons/financials.svg',
    holdings: [
      { ticker: 'BNS', company: 'Bank of Nova Scotia', allocation: 12, performance: 3 },
      { ticker: 'RY', company: 'Royal Bank of Canada', allocation: 14, performance: 4 }
    ],
    portfolioManager: withHeadshot({ name: 'Bianca Rotariu', bio: 'Focus on balance sheet resilience and ROE.' }),
    analysts: [
      withHeadshot({ name: 'Thomas Skippon', bio: 'Canadian banks & insurers.' })
    ],
    reports: [{ title: 'Canadian Banks: Net Interest Margin Outlook', url: '/reports/fin-nim.pdf' }]
  },
  'mining-materials': {
    name: 'Mining & Materials',
  iconUrl: '/icons/mining-materials.svg',
    holdings: [
      { ticker: 'AEM', company: 'Agnico Eagle', allocation: 10, performance: 7 },
      { ticker: 'TECK', company: 'Teck Resources', allocation: 9, performance: 5 }
    ],
    portfolioManager: withHeadshot({ name: 'Findlay Goodall', bio: 'Quality miners with disciplined capex.' }),
    analysts: [
      withHeadshot({ name: 'Iain Brady', bio: 'Base metals & gold.' }),
      withHeadshot({ name: 'Emory Geho', bio: 'Exploration & commodities.' })
    ],
    reports: [{ title: 'Copper Cycle Primer', url: '/reports/copper-cycle.pdf' }]
  },
  industrials: {
    name: 'Industrials',
  iconUrl: '/icons/industrials.svg',
    holdings: [
      { ticker: 'CP', company: 'CPKC Railway', allocation: 11, performance: 6 },
      { ticker: 'WSP', company: 'WSP Global', allocation: 10, performance: 8 }
    ],
    portfolioManager: withHeadshot({ name: 'Beau Leone', bio: 'Compounders with durable moats.' }),
    analysts: [
      withHeadshot({ name: 'Jay Diri', bio: 'Transport & engineering services.' }),
      withHeadshot({ name: 'Camran Jiwani', bio: 'Industrial analytics.' })
    ],
    reports: [{ title: 'Rail Operator Unit Economics', url: '/reports/rail-econ.pdf' }]
  },
  'consumer-staples-retail': {
    name: 'Consumer Staples & Retail',
  iconUrl: '/icons/consumer-staples-retail.svg',
    holdings: [
      { ticker: 'ATD', company: 'Alimentation Couche-Tard', allocation: 15, performance: 11 }
    ],
    portfolioManager: withHeadshot({ name: 'Jillian Dalton', bio: 'High ROIC retailers.' }),
    analysts: [
      withHeadshot({ name: 'Ivan Bardziyan', bio: 'Global staples coverage.' }),
      withHeadshot({ name: 'Gavin Cameron', bio: 'Retail comps & margins.' })
    ],
    reports: [{ title: 'Convenience Retail Landscape', url: '/reports/retail-landscape.pdf' }]
  },
  'real-estate-health-care': {
    name: 'Real Estate & Health Care',
  iconUrl: '/icons/real-estate-health-care.svg',
    holdings: [
      { ticker: 'SIA', company: 'Sienna Senior Living', allocation: 7, performance: 4 }
    ],
  portfolioManager: withHeadshot({ name: 'Alex Papadopoulos', bio: 'Defensive yield + growth.' }),
  analysts: [withHeadshot({ name: 'Daniel Thompson', bio: 'HC services & REITs.' })],
    reports: [{ title: 'Senior Living REITs: Rate vs Occupancy', url: '/reports/reits-senior.pdf' }]
  },
  crypto: {
    name: 'Crypto',
  iconUrl: '/icons/crypto.svg',
    holdings: [
      { ticker: 'BTC', company: 'Bitcoin', allocation: 5, performance: 20 },
      { ticker: 'ETH', company: 'Ethereum', allocation: 4, performance: 15 }
    ],
  portfolioManager: withHeadshot({ name: 'Nikhil Naran', bio: 'Risk-managed exposure to digital assets.' }),
  analysts: [withHeadshot({ name: 'Aaron Feng', bio: 'On-chain & L2s.' })],
    reports: [{ title: 'ETH Staking Dynamics', url: '/reports/eth-staking.pdf' }]
  },
  marketing: {
    name: 'Marketing',
    iconUrl: '/icons/marketing.svg',
    holdings: [
      { ticker: 'GOOGL', company: 'Alphabet (Google)', allocation: 10, performance: 8 },
      { ticker: 'META', company: 'Meta Platforms', allocation: 8, performance: 12 },
      { ticker: 'NFLX', company: 'Netflix', allocation: 6, performance: 5 }
    ],
    portfolioManager: withHeadshot({ name: 'Nora Malik', bio: 'Brand, outreach, and events.' }),
    members: [
      withHeadshot({ name: 'Jessica Cook', bio: 'Events & partnerships.' }),
      withHeadshot({ name: 'Adam Bizios', bio: 'Content & campaigns.' }),
      withHeadshot({ name: 'Sydney Garrah', bio: 'Creative & design.' })
    ],
    reports: [{ title: 'Event Playbook 2025', url: '/reports/event-playbook.pdf' }]
  }
  ,
  'macro-economics': {
    name: 'Macro Economics',
  iconUrl: '/icons/macro-economics.svg',
    holdings: [
      { ticker: 'TLT', company: 'iShares 20+ Year Treasury ETF', allocation: 30, performance: 2 },
      { ticker: 'GLD', company: 'SPDR Gold Shares', allocation: 20, performance: 5 },
      { ticker: 'UUP', company: 'Invesco DB US Dollar Index Bullish Fund', allocation: 10, performance: -1 }
    ],
    portfolioManager: withHeadshot({ name: 'Dr. Samuel Grant', bio: 'Leads macroeconomic research and scenario analysis.' }),
    members: [
      { name: 'Ravjot Sarao' },
      { name: 'Roscoe Sze' }
    ].map(withHeadshot),
    reports: [
      { title: 'Macro Regime Playbook', url: '/reports/macro-regime-playbook.pdf' }
    ]
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
  { name: 'RBC (placeholder)', logoUrl: '/sponsor-placeholder.svg' },
  { name: 'TD (placeholder)', logoUrl: '/sponsor-placeholder.svg' },
  { name: 'BMO (placeholder)', logoUrl: '/sponsor-placeholder.svg' },
  { name: 'Scotiabank (placeholder)', logoUrl: '/sponsor-placeholder.svg' }
];

export const events = [
  { dateISO: '2025-09-15', title: 'Fall Info Session', description: 'Overview of QHF, selection process, and Q&A.', location: 'Smith School of Business' },
  { dateISO: '2025-10-02', title: 'Equity Research Workshop', description: 'Hands-on session building an investment thesis.', location: 'Goodes Hall 104' },
  { dateISO: '2025-11-12', title: 'Alumni Panel Night', description: 'Hear from alumni at leading firms.', location: 'Virtual' },
];

export const alumniStats = { alumniCount: 200, cities: 18, industries: 12 };
