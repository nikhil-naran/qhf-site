import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Philosophy from './components/Philosophy.jsx';
import Founders from './components/Founders.jsx';
import Industries from './components/Industries.jsx';
import Events from './components/Events.jsx';
// Team section removed from Home
import Alumni from './components/Alumni.jsx';
import Join from './components/Join.jsx';
import Footer from './components/Footer.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import TeamsHub from './components/TeamsHub.jsx';
import TeamPage from './components/TeamPage.jsx';
import Performance from './components/Performance.jsx';

function ScrollToHash(){
  const loc = useLocation();
  useEffect(()=>{
    if (loc.hash) {
      const el = document.querySelector(loc.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [loc.pathname, loc.hash]);
  return null;
}

function PageFade({ children }) {
  const loc = useLocation();
  const [state, setState] = useState('enter');
  useEffect(() => { setState('enter'); }, [loc.pathname]);
  return <div className={`page-fade-${state} page-fade-enter-active`}>{children}</div>;
}

function DefaultSeo(){
  const loc = useLocation();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://www.queenshedgefund.com';
  const canonicalUrl = new URL(`${loc.pathname}${loc.search}`, origin).toString();
  const ogImage = `${origin}/QHF-home.png`;
  const description = "Queen's Hedge Fund (QHF) is the student-run hedge fund at Queen's University in Kingston, Ontario, delivering real investment training, research, and portfolio experience.";
  const title = "Queen's Hedge Fund (QHF) | Queen's University Student Hedge Fund";
  const keywords = [
    "Queens Hedge Fund",
    "Queen's Hedge Fund",
    "Queen's University hedge fund",
    "QHF",
    "student investment fund",
    "Queens student asset management"
  ].join(', ');

  const founders = [
    {
      '@type': 'Person',
      name: 'Anson El Ayari',
      sameAs: 'https://www.linkedin.com/in/anson-el-ayari/'
    },
    {
      '@type': 'Person',
      name: 'Nikhil Naran',
      sameAs: 'https://www.linkedin.com/in/nikhilnaran/'
    },
    {
      '@type': 'Person',
      name: 'Ava El Ayari',
      sameAs: 'https://www.linkedin.com/in/ava-el-ayari/'
    }
  ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: "Queen's Hedge Fund",
    alternateName: 'QHF',
    description,
    url: canonicalUrl,
    logo: `${origin}/QHF-2.svg`,
    areaServed: 'CA',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '143 Union Street',
      addressLocality: 'Kingston',
      addressRegion: 'ON',
      postalCode: 'K7L 3N6',
      addressCountry: 'CA'
    },
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: "Queen's University",
      url: 'https://www.queensu.ca/'
    },
    founder: founders
  };

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Queen's Hedge Fund" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Queen's Hedge Fund crest" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Queen's Hedge Fund crest" />
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
    </Helmet>
  );
}

function Home(){
  return (
    <main id="main">
      <Hero />
      <About />
      <Philosophy />
      <Founders />
      <Industries />
      {/* <Performance /> removed */}
      {/* <Events /> removed */}
      <Alumni />
      <Join />
    </main>
  );
}

export default function App() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const val = JSON.parse(localStorage.getItem('qhf-reduce-motion') || 'false');
    setReduced(val);
    const onChange = (e) => setReduced(!!e.detail);
    window.addEventListener('qhf-reduce-motion-change', onChange);
    return () => window.removeEventListener('qhf-reduce-motion-change', onChange);
  }, []);

  return (
    <BrowserRouter>
      <DefaultSeo />
      <div id="progressBar" aria-hidden="true"></div>
      <Nav />
      <ScrollToHash />
      <PageFade>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<TeamsHub />} />
          <Route path="/teams/:slug" element={<TeamPage />} />
        </Routes>
      </PageFade>
      <Footer reduced={reduced} />
      <ProgressBar />
    </BrowserRouter>
  );
}
