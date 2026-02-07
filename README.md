# Queen's Hedge Fund

The official website for Queen's Hedge Fund (QHF) — a student-run hedge fund at Queen's University in Kingston, Ontario.

**Live site:** Deployed on Vercel

## Tech Stack

- **React 18** — Component-based UI
- **Vite** — Build tool and dev server
- **Tailwind CSS 3** — Utility-first styling
- **React Router 6** — Client-side routing
- **Recharts** — Performance charts
- **react-helmet-async** — SEO and meta tags

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the dev server at [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview   # preview the build locally
```

## Project Structure

```
src/
├── App.jsx              # Router and layout
├── data.js              # All content (teams, events, reports, pitches)
├── index.css            # Custom CSS (glassmorphism, animations, transitions)
├── lib/
│   ├── animation.js     # Scroll reveal and reduced-motion support
│   ├── assets.js        # Public asset path helper
│   └── headshots.js     # Name-to-headshot lookup
└── components/
    ├── Hero.jsx         # Landing hero with particle canvas and typing effect
    ├── About.jsx        # What We Do / Why QHF
    ├── Philosophy.jsx   # Investment philosophy pillars
    ├── Founders.jsx     # Founder cards with modal detail view
    ├── Industries.jsx   # Our Teams grid (home page)
    ├── Alumni.jsx       # Member placement logo marquee
    ├── Performance.jsx  # Portfolio vs benchmark charts
    ├── Join.jsx         # Eligibility info and contact form
    ├── Nav.jsx          # Navigation bar with mobile drawer
    ├── TeamsHub.jsx     # /teams — all sector pods overview
    ├── TeamPage.jsx     # /teams/:slug — individual team detail
    ├── EventsPage.jsx   # /events — speaker sessions and tutorials
    └── ResearchPage.jsx # /research — annual reports and stock pitches

public/
├── headshots/           # Team member photos
├── icons/               # Sector team icons (PNG)
├── logos/               # Company/placement logos
└── logos_minimal/       # Minimal logo variants
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page — Hero, About, Philosophy, Founders, Our Teams, Member Placements, Join |
| `/teams` | Overview grid of all sector pods with metrics |
| `/teams/:slug` | Individual team — holdings, members, and research |
| `/events` | Featured speaker sessions and investment tutorials |
| `/research` | Annual performance reports and historical stock pitches |

## Design

- **Theme:** Dark background with glassmorphism panels
- **Brand colors:** Burgundy (`#4A1C27`), Gold A (`#C5A16D`), Gold B (`#E2C784`)
- **Animations:** Scroll-triggered reveals with reduced-motion support
- **Responsive:** Mobile-first with Tailwind breakpoints (`sm`, `md`, `lg`, `xl`)

## Deployment

Deployed on **Vercel** with a catch-all rewrite (`vercel.json`) for SPA routing. Push to `main` to trigger a production deploy.

## License

All rights reserved. This project is proprietary to Queen's Hedge Fund.
