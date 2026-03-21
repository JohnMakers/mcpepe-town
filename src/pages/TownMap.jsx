import React, { useState } from 'react';

// Notice how all of these now use '../' to go up one folder level!
import Modal from '../components/Modal';
import { BUILDINGS } from '../data/mapConfig';
import townMap from '../assets/town.png'; 

// Renamed the component from App to TownMap for best practices
export default function TownMap() {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden', margin: 0, position: 'relative' }}>
    

      {/* Map Container */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        
        <img 
          src={townMap} 
          alt="Town Map" 
          style={{ 
            display: 'block', 
            minWidth: '100vw',  
            minHeight: '100vh', 
            width: 'auto', 
            height: 'auto', 
            userSelect: 'none', 
            pointerEvents: 'none' 
          }}
        />

        {/* Interactive Hitbox Layer */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}>
          
          {/* VISIBLE Hitboxes for manual tweaking */}
          {BUILDINGS.map((b) => (
            <div
              key={b.id}
              onClick={() => b.id !== 'tower' && setActiveBuilding(b)}
              style={{
                position: 'absolute',
                left: `${b.x}%`, 
                top: `${b.y}%`, 
                width: `${b.w}%`, 
                height: `${b.h}%`,
                cursor: b.id !== 'tower' ? 'pointer' : 'default',
                backgroundColor: 'transparent', // Change to 'rgba(255, 0, 0, 0.3)' for visible hitboxes during development
                border: 'none', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
            </div>
          ))}
        </div>
      </div>

      <Modal building={activeBuilding} onClose={() => setActiveBuilding(null)} />
    </div>
  );
}