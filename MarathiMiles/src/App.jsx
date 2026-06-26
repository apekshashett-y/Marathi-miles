import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MoodRecommendation from './components/MoodRecommendation/MoodRecommendation';
import PlaceExplorer from './components/PlaceExplorer/PlaceExplorer';
import PastPort from './components/Passport/PastPort';
import SmartExplorationV2 from './components/Passport/SmartExplorationV2';
import RaigadSmartExplorationPage from './components/Passport/RaigadSmartExplorationPage';
import SinhagadSmartExplorationPage from './components/Passport/SinhagadSmartExplorationPage';
import PratapgadSmartExplorationPage from './components/Passport/PratapgadSmartExplorationPage';
import LohagadSmartExplorationPage from './components/Passport/LohagadSmartExplorationPage';

/* HOME PAGE */
const MainApp = () => {
  return (
    <>
      <Header />
      <div id="home">
        {/* Your existing Home UI stays here */}
      </div>
      <Footer />
    </>
  );
};

/* PASSPORT PAGE - navbar + PastPort content + full footer */
const PassportPage = () => (
  <>
    <Header />
    <PastPort />
    <Footer />
  </>
);

/* MOOD PAGE */
const MoodPage = () => (
  <>
    <Header />
    <MoodRecommendation />
    <Footer />
  </>
);

/* PLACE EXPLORER PAGE */
const PlaceExplorerPage = () => (
  <>
    <Header />
    <PlaceExplorer />
    <Footer />
  </>
);

/* MAIN ROUTES */
const App = () => {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<MainApp />} />

      {/* Passport - navbar shown, hero hidden, full footer shown */}
      <Route path="/passport" element={<PassportPage />} />

      {/* Mood - navbar shown, hero hidden, full footer shown */}
      <Route path="/mood" element={<MoodPage />} />

      {/* Place Explorer - navbar shown, hero hidden, full footer shown */}
      <Route path="/place-explorer" element={<PlaceExplorerPage />} />

      {/* Smart Exploration - SHIVNERI V2 Route */}
      <Route path="/pastport/shivneri/smart-exploration-v2" element={<SmartExplorationV2 />} />

      {/* Smart Exploration - RAIGAD Route */}
      <Route path="/pastport/raigad/smart-exploration-page" element={<RaigadSmartExplorationPage />} />

      {/* Smart Exploration - SINHAGAD Route */}
      <Route path="/pastport/sinhagad/smart-exploration-page" element={<SinhagadSmartExplorationPage />} />

      {/* Smart Exploration - PRATAPGAD Route */}
      <Route path="/pastport/pratapgad/smart-exploration-page" element={<PratapgadSmartExplorationPage />} />

      {/* Smart Exploration - LOHAGAD Route */}
      <Route path="/pastport/lohagad/smart-exploration-page" element={<LohagadSmartExplorationPage />} />
    </Routes>
  );
};

export default App;