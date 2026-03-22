import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'; // Changed to HashRouter
import TownMap from './pages/TownMap';
import Cinema from './pages/Cinema';
import Gallery from './pages/Gallery';

export default function App() {
  return (
    // Replaced BrowserRouter with HashRouter
    <HashRouter>
      <Routes>
        {/* The root URL shows the map */}
        <Route path="/" element={<TownMap />} />
        
        {/* The /cinema URL shows our new theater page */}
        <Route path="/cinema" element={<Cinema />} />

        {/* The /gallery URL shows our new gallery page */}
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </HashRouter>
  );
}