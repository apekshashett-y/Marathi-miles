import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MoodRecommendation from './components/MoodRecommendation/MoodRecommendation';
import PlaceExplorer from './components/PlaceExplorer/PlaceExplorer';
import PastPort from './components/Passport/PastPort';
import SmartExplorationV2 from './components/Passport/SmartExplorationV2';

const MainApp = () => {
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState(location.state?.section || "home");
  const heroSectionRef = useRef(null);
  const moodRecommendationsRef = useRef(null);
  const passportRef = useRef(null);
  const placeExplorerRef = useRef(null);

  const scrollToSection = (section) => {
    setTimeout(() => {
      const navbarHeight = 80;

      if (section === "home") {
        const heroElement = document.getElementById('home');
        if (heroElement) {
          const elementPosition = heroElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (section === "mood-recommendations") {
        const moodElement = document.getElementById('mood-recommendations');
        if (moodElement) {
          const elementPosition = moodElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else if (section === "passport") {
        const passportElement = document.getElementById('passport');
        if (passportElement) {
          const elementPosition = passportElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else if (section === "place-explorer") {
        const placeElement = document.getElementById('place-explorer');
        if (placeElement) {
          const elementPosition = placeElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  };

  useEffect(() => {
    scrollToSection(currentSection);
  }, [currentSection]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "mood-recommendations":
        return (
          <div ref={moodRecommendationsRef} id="mood-recommendations">
            <MoodRecommendation />
          </div>
        );
      case "passport":
        return (
          <div ref={passportRef} id="passport">
            <PastPort />
          </div>
        );
      case "place-explorer":
        return (
          <div ref={placeExplorerRef} id="place-explorer">
            <PlaceExplorer />
          </div>
        );
      case "home":
      default:
        return null;
    }
  };

  return (
    <>
      <Header
        onSectionChange={setCurrentSection}
        heroSectionRef={heroSectionRef}
      />
      {renderCurrentSection()}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/pastport/:fortId/smart-exploration" element={<SmartExplorationV2 />} />
    </Routes>
  );
};

export default App;