export const TEAM_CATEGORIES = [
  { name: 'Industrials', slug: 'industrials' },
  { name: 'Mining & Materials', slug: 'mining-materials' },
  { name: 'Financials', slug: 'financials' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Consumer Staples & Retail', slug: 'consumer-staples-retail' },
  { name: 'Real Estate & Health Care', slug: 'real-estate-health-care' },
  { name: 'Crypto', slug: 'crypto' },
  { name: 'Marketing', slug: 'marketing' }
];

export const TEAMS = {
  technology: {
    name: 'Technology',
    holdings: [
      { ticker: 'NVDA', company: 'NVIDIA', allocation: 28, performance: 32 },
      { ticker: 'AAPL', company: 'Apple', allocation: 18, performance: 9 },
      { ticker: 'MSFT', company: 'Microsoft', allocation: 16, performance: 12 },
      { ticker: 'SHOP', company: 'Shopify', allocation: 22, performance: 18 }
    ],
    portfolioManager: { name: 'Maya Patel', headshot: '', bio: 'Drives concentrated tech exposure with quality bias.' },
    analysts: [
      { name: 'Ethan Lee', headshot: '', bio: 'Semis & AI infra.' },
      { name: 'Sara Kim', headshot: '', bio: 'Software & platforms.' }
    ],
    reports: [
      { title: 'NVIDIA Variant Perception (Q1)', url: '/reports/nvda-q1.pdf' },
      { title: 'Shopify Deep Dive', url: '/reports/shopify-deep-dive.pdf' }
    ]
  },
  financials: {
    name: 'Financials',
    holdings: [
      { ticker: 'BNS', company: 'Bank of Nova Scotia', allocation: 12, performance: 3 },
      { ticker: 'RY', company: 'Royal Bank of Canada', allocation: 14, performance: 4 }
    ],
    portfolioManager: { name: 'Liam O’Reilly', headshot: '', bio: 'Focus on balance sheet resilience and ROE.' },
    analysts: [{ name: 'Noah Singh', headshot: '', bio: 'Canadian banks & insurers.' }],
    reports: [{ title: 'Canadian Banks: Net Interest Margin Outlook', url: '/reports/fin-nim.pdf' }]
  },
  'mining-materials': {
    name: 'Mining & Materials',
    holdings: [
      { ticker: 'AEM', company: 'Agnico Eagle', allocation: 10, performance: 7 },
      { ticker: 'TECK', company: 'Teck Resources', allocation: 9, performance: 5 }
    ],
    portfolioManager: { name: 'Omar Singh', headshot: '', bio: 'Quality miners with disciplined capex.' },
    analysts: [{ name: 'Priya Rao', headshot: '', bio: 'Base metals & gold.' }],
    reports: [{ title: 'Copper Cycle Primer', url: '/reports/copper-cycle.pdf' }]
  },
  industrials: {
    name: 'Industrials',
    holdings: [
      { ticker: 'CP', company: 'CPKC Railway', allocation: 11, performance: 6 },
      { ticker: 'WSP', company: 'WSP Global', allocation: 10, performance: 8 }
    ],
    portfolioManager: { name: 'Ava Chen', headshot: '', bio: 'Compounders with durable moats.' },
    analysts: [{ name: 'Leo Park', headshot: '', bio: 'Transport & engineering services.' }],
    reports: [{ title: 'Rail Operator Unit Economics', url: '/reports/rail-econ.pdf' }]
  },
  'consumer-staples-retail': {
    name: 'Consumer Staples & Retail',
    holdings: [
      { ticker: 'ATD', company: 'Alimentation Couche-Tard', allocation: 15, performance: 11 }
    ],
    portfolioManager: { name: 'Maya Patel', headshot: '', bio: 'High ROIC retailers.' },
    analysts: [{ name: 'Hannah Zhou', headshot: '', bio: 'Global staples coverage.' }],
    reports: [{ title: 'Convenience Retail Landscape', url: '/reports/retail-landscape.pdf' }]
  },
  'real-estate-health-care': {
    name: 'Real Estate & Health Care',
    holdings: [
      { ticker: 'SIA', company: 'Sienna Senior Living', allocation: 7, performance: 4 }
    ],
    portfolioManager: { name: 'Omar Singh', headshot: '', bio: 'Defensive yield + growth.' },
    analysts: [{ name: 'Julia Costa', headshot: '', bio: 'HC services & REITs.' }],
    reports: [{ title: 'Senior Living REITs: Rate vs Occupancy', url: '/reports/reits-senior.pdf' }]
  },
  crypto: {
    name: 'Crypto',
    holdings: [
      { ticker: 'BTC', company: 'Bitcoin', allocation: 5, performance: 20 },
      { ticker: 'ETH', company: 'Ethereum', allocation: 4, performance: 15 }
    ],
    portfolioManager: { name: 'Ava Chen', headshot: '', bio: 'Risk-managed exposure to digital assets.' },
    analysts: [{ name: 'Max Ivanov', headshot: '', bio: 'On-chain & L2s.' }],
    reports: [{ title: 'ETH Staking Dynamics', url: '/reports/eth-staking.pdf' }]
  },
  marketing: {
    name: 'Marketing',
    holdings: [],
    portfolioManager: { name: 'Nora Malik', headshot: '', bio: 'Brand, outreach, and events.' },
    analysts: [{ name: 'Arjun Mehta', headshot: '', bio: 'Comms & content.' }],
    reports: [{ title: 'Event Playbook 2025', url: '/reports/event-playbook.pdf' }]
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