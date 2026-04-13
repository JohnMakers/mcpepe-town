import React, { useState, useRef, useEffect } from 'react';
import Modal from '../components/Modal';
import { BUILDINGS } from '../data/mapConfig';
import townMap from '../assets/town.png'; 

export default function TownMap() {
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Track ONLY X scroll position (0.0 to 1.0)
  const [scrollX, setScrollX] = useState(0.5);
  const scrollContainerRef = useRef(null);

  const clickableBuildings = BUILDINGS.filter(b => b.id !== 'tower');

  const updateScrollProgress = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxX = scrollWidth - clientWidth;
      setScrollX(maxX > 0 ? scrollLeft / maxX : 0.5);
    }
  };

  // Dedicated function to center the map mathematically
  const centerMap = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
      updateScrollProgress();
    }
  };

  useEffect(() => {
    // Failsafe for if the image is heavily cached and loads instantly
    const timer = setTimeout(centerMap, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        /* 1. MOBILE FIRST SCROLLING - Pure Horizontal Pan */
        .map-viewport {
          width: 100vw;
          height: 100vh;
          background-color: #000;
          overflow-x: auto;
          overflow-y: hidden; /* Locks out vertical scrolling */
          overscroll-behavior: none; /* Stops rubber-banding/swiping out of bounds */
          position: relative;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; 
          -ms-overflow-style: none;
        }
        .map-viewport::-webkit-scrollbar { display: none; }
        
        .map-wrapper {
          position: relative;
          height: 100vh;
          width: max-content;
          display: inline-block;
        }

        .map-image {
          display: block;
          height: 100vh; /* Perfectly eliminates top and bottom black bars */
          width: auto;   /* Scales width dynamically to preserve the map */
          max-width: none;
          user-select: none;
          pointer-events: none;
          transition: filter 0.4s ease;
        }

        /* 2. DESKTOP OVERRIDE: Stretches map to strictly cover the entire monitor */
        @media (min-width: 1024px) {
          .map-viewport {
            overflow: hidden;
            display: block;
          }
          .map-wrapper {
            height: 100vh;
            width: 100vw;
          }
          .map-image {
            width: 100vw;
            height: 100vh;
            object-fit: fill; /* Forces the image to stretch and cover the dead space */
            max-width: none;
            max-height: none;
          }
          .scroll-track-x { display: none !important; }
        }

        /* SCROLL INDICATOR (Horizontal Only) */
        .scroll-track-x {
          position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
          width: 40vw; max-width: 200px; height: 4px;
          background-color: rgba(255, 255, 255, 0.2); border-radius: 4px; z-index: 30; pointer-events: none;
        }
        .scroll-ball-x {
          position: absolute; top: 50%; width: 12px; height: 12px;
          background-color: #fff; border-radius: 50%; box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
          transform: translate(-50%, -50%); transition: left 0.05s linear;
        }

        /* TOWN-STYLE BUILDINGS BUTTON */
        @keyframes float-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .buildings-fab {
          position: fixed; bottom: 40px; right: clamp(20px, 5vw, 40px);
          background: #15803d; 
          color: #fff; border: 3px solid #22c55e; border-radius: 12px;
          padding: 14px 28px; font-family: 'Courier New', Courier, monospace; 
          font-weight: 900; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; 
          cursor: pointer; z-index: 40;
          box-shadow: 0 8px 0 #14532d, 0 15px 20px rgba(0,0,0,0.6);
          animation: float-bounce 3s infinite ease-in-out;
          transition: all 0.1s ease;
        }
        .buildings-fab:active {
          transform: translateY(6px) !important;
          box-shadow: 0 2px 0 #14532d, 0 5px 10px rgba(0,0,0,0.6) !important;
        }
        .buildings-fab:hover {
          background: #16a34a;
          transform: translateY(-2px);
        }
        
        /* QUICK MENU DRAWER - Earthy/Retro Theme */
        .quick-menu-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
          z-index: 45; display: flex; justify-content: center; align-items: flex-end;
          opacity: 0; animation: fadeIn 0.2s forwards;
        }
        .quick-menu-card {
          background: #0f172a; border-top: 4px solid #22c55e;
          border-radius: 24px 24px 0 0; width: 100%; max-width: 500px; padding: 30px 24px 40px 24px;
          transform: translateY(100%); animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          box-shadow: 0 -10px 40px rgba(22, 163, 74, 0.2);
        }
        
        .menu-title {
          margin: 0 auto; text-align: center; font-size: 24px; font-family: 'Courier New', Courier, monospace;
          font-weight: 900; text-transform: uppercase; letter-spacing: 2px;
          color: #22c55e; text-shadow: 2px 2px 0 #064e3b;
        }
        
        .menu-close-btn {
          position: absolute; right: 0; background: none; border: none; color: #64748b;
          font-size: 32px; cursor: pointer; transition: color 0.2s; line-height: 1;
        }
        .menu-close-btn:hover { color: #22c55e; }

        .menu-item {
          width: 100%; background: #1e293b; border: 2px solid #334155;
          color: #f8fafc; padding: 16px; border-radius: 12px; margin-bottom: 12px;
          font-family: 'Courier New', Courier, monospace; font-weight: bold; font-size: 16px; 
          text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.2s ease;
        }
        .menu-item:hover {
          background: #15803d; border-color: #22c55e; color: #fff; transform: scale(1.02);
          box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3);
        }

        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes slideUp { to { transform: translateY(0); } }
      `}</style>

      <div ref={scrollContainerRef} className="map-viewport" onScroll={updateScrollProgress}>
        <div className="map-wrapper">
          
          <img 
            src={townMap} 
            alt="Map of McPepe Town" 
            className="map-image"
            onLoad={centerMap} /* Critical fix: waits for image to load before panning to center */
            style={{ filter: activeBuilding || isMenuOpen ? 'blur(8px) brightness(0.4)' : 'none' }}
          />

          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}>
            {BUILDINGS.map((b) => (
              <div
                key={b.id}
                onClick={() => b.id !== 'tower' && setActiveBuilding(b)}
                style={{
                  position: 'absolute', left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`,
                  cursor: b.id !== 'tower' ? 'pointer' : 'default',
                }}
              />
            ))}
          </div>
        </div>

        {/* SCROLL INDICATOR (X ONLY) */}
        {!activeBuilding && !isMenuOpen && (
          <div className="scroll-track-x"><div className="scroll-ball-x" style={{ left: `${scrollX * 100}%` }} /></div>
        )}

        {/* THEMED BUILDINGS BUTTON */}
        {!activeBuilding && !isMenuOpen && (
          <button className="buildings-fab" onClick={() => setIsMenuOpen(true)}>
            Buildings
          </button>
        )}

        {/* QUICK MENU DRAWER */}
        {isMenuOpen && (
          <div className="quick-menu-overlay" onClick={() => setIsMenuOpen(false)}>
            <div className="quick-menu-card" onClick={(e) => e.stopPropagation()}>
              
              <div style={{ position: 'relative', marginBottom: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h3 className="menu-title">Directory</h3>
                <button className="menu-close-btn" onClick={() => setIsMenuOpen(false)}>&times;</button>
              </div>

              {clickableBuildings.map((b) => (
                <button 
                  key={b.id} 
                  className="menu-item"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveBuilding(b);
                  }}
                >
                  {b.name}
                </button>
              ))}

            </div>
          </div>
        )}

        <Modal building={activeBuilding} onClose={() => setActiveBuilding(null)} />
      </div>
    </>
  );
}