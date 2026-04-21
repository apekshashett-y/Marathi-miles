import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MoodRecommendation from './components/MoodRecommendation/MoodRecommendation';
import PlaceExplorer from './components/PlaceExplorer/PlaceExplorer';
import PastPort from './components/Passport/PastPort';
import SmartExplorationV2 from './components/Passport/SmartExplorationV2';

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

      {/* Smart Exploration (inside PastPort flow) */}
      <Route
        path="/pastport/:fortId/smart-exploration"
        element={<SmartExplorationV2 />}
      />
    </Routes>
  );
};

export default App;