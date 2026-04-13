import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import TownMap from './pages/TownMap';
import Cinema from './pages/Cinema';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin'; // We will create this next

export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<TownMap />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </HashRouter>
    </DataProvider>
  );
}