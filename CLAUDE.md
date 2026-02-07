# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Queen's Hedge Fund (QHF) website — a React SPA for the student-run hedge fund at Queen's University. Dark-themed, glassmorphism aesthetic with burgundy/gold brand colors. Deployed on Vercel.

## Commands

- `npm run dev` — Start dev server (port 5173)
- `npm run build` — Production build (Vite)
- `npm run preview` — Preview production build locally

No linter, formatter, or test suite is configured.

## Architecture

**Stack:** React 18 + Vite + Tailwind CSS 3 + React Router 6 (BrowserRouter). No TypeScript.

**Routing** (`src/App.jsx`):
- `/` — Home page (composed of section components: Hero, About, Philosophy, Founders, Industries, Alumni, Join)
- `/teams` — TeamsHub grid of all sector teams
- `/teams/:slug` — Individual TeamPage (slug matches keys in `TEAMS` object)
- `/events` — EventsPage with featured events
- `/research` — ResearchPage with annual reports and stock pitches

**Data layer** (`src/data.js`): All content is hardcoded — team rosters, events, performance data, reports, stock pitches. No API calls or CMS. The `TEAMS` object is keyed by slug (e.g., `'mining-materials'`, `'consumer-staples-retail'`). `TEAM_CATEGORIES` defines display order.

**Utility modules** (`src/lib/`):
- `assets.js` — `asset()` helper that prepends `import.meta.env.BASE_URL` to public file paths
- `headshots.js` — Maps person names to JPG filenames in `public/headshots/`; uses a static lookup table + cache
- `animation.js` — `revealOnScroll()` (IntersectionObserver-based fade-in), `countTo()` (rAF count-up), reduced-motion support via `localStorage('qhf-reduce-motion')` + custom event

**SEO:** `react-helmet-async` in `App.jsx` generates dynamic meta/OG tags and JSON-LD schema per route.

**Styling approach:** Tailwind utilities in JSX + custom CSS classes in `src/index.css` (`.glass`, `.btn`, `.dropdown-panel`, `.team-card`, `.reveal`, page-fade transitions). Brand colors defined in `tailwind.config.js`: `burgundy: '#4A1C27'`, `goldA: '#C5A16D'`, `goldB: '#E2C784'`.

## Key Conventions

- Static assets go in `public/` and are referenced via the `asset()` helper, not direct imports
- Headshots live in `public/headshots/` and are resolved by name lookup in `src/lib/headshots.js`
- Team icons are PNGs in `public/icons/` (recently migrated from SVG)
- Company/placement logos are in `public/logos/`
- Components use `useRef` + `useEffect` with `revealOnScroll()` for scroll-triggered animations
- The `withHeadshot()` wrapper in `data.js` auto-attaches headshot URLs to person objects
- `vercel.json` has a catch-all rewrite to `index.html` for SPA routing
- The contact form in Join uses `data-netlify="true"` attribute (Netlify Forms)
