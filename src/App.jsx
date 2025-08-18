import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Stats from './components/Stats.jsx';
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

function Home(){
  return (
    <main id="main">
      <Hero />
      <About />
  <Stats />
  <Founders />
      <Philosophy />
  <Industries />
      {/* Replaced old Portfolio with Performance */}
      <Performance />
      <Events />
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
      <Helmet>
        <title>Queens Hedge Fund (QHF) — Empowering students with real-world investment experience</title>
        <meta name="description" content="Queens Hedge Fund (QHF) is a student-led investment group based in Kingston, Ontario."/>
        <meta property="og:title" content="Queens Hedge Fund (QHF)" />
        <meta property="og:description" content="Empowering students with real-world investment experience and financial expertise" />
        <meta property="og:type" content="website" />
      </Helmet>
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