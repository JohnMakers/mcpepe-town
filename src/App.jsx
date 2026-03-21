import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TownMap from './pages/TownMap';
import Cinema from './pages/Cinema';
import Gallery from './pages/Gallery';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The root URL shows the map */}
        <Route path="/" element={<TownMap />} />
        
        {/* The /cinema URL shows our new theater page */}
        <Route path="/cinema" element={<Cinema />} />

        {/* The /gallery URL shows our new gallery page */}
        <Route path="/gallery" element={<Gallery />} />

      </Routes>
    </BrowserRouter>
  );
}