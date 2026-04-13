import React from 'react';

export default function Modal({ building, onClose }) {
  if (!building) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }
        @keyframes modalPopUp {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .arcade-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background-color: rgba(0, 0, 0, 0.7); display: flex;
          justify-content: center; align-items: center; z-index: 9999;
          animation: modalFadeIn 0.2s ease-out forwards;
        }
        
        .arcade-modal-card {
          background: #0f172a; border: 4px solid #22c55e;
          border-radius: 16px; padding: 32px 24px; max-width: 420px; width: 90%;
          box-shadow: 0 10px 30px rgba(22, 163, 74, 0.2), inset 0 0 20px rgba(0,0,0,0.8);
          text-align: center; position: relative;
          animation: modalPopUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          font-family: 'Courier New', Courier, monospace;
        }
        
        .arcade-close-btn {
          position: absolute; top: 12px; right: 16px; background: none; border: none;
          color: #64748b; font-size: 36px; cursor: pointer; line-height: 1;
          transition: color 0.2s; font-family: sans-serif;
        }
        .arcade-close-btn:hover { color: #22c55e; }
        
        /* Satisfying Retro 3D Buttons */
        .arcade-primary-btn {
          background: #15803d; color: #fff; border: 3px solid #22c55e;
          padding: 14px; border-radius: 8px; text-decoration: none;
          font-weight: bold; font-size: 16px; text-transform: uppercase;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 6px 0 #14532d; transition: transform 0.1s, box-shadow 0.1s, background 0.1s; 
          flex: 2; letter-spacing: 1px;
        }
        .arcade-primary-btn:active {
          transform: translateY(6px); box-shadow: 0 0px 0 #14532d;
        }
        .arcade-primary-btn:hover { 
          background: #16a34a; transform: translateY(-2px); box-shadow: 0 8px 0 #14532d; 
        }
        
        .arcade-secondary-btn {
          background: #1e293b; border: 3px solid #334155; color: #f8fafc;
          padding: 14px; border-radius: 8px; cursor: pointer;
          font-weight: bold; font-size: 16px; text-transform: uppercase;
          box-shadow: 0 6px 0 #0f172a; transition: transform 0.1s, box-shadow 0.1s, background 0.1s; 
          flex: 1; font-family: 'Courier New', Courier, monospace; letter-spacing: 1px;
        }
        .arcade-secondary-btn:active {
          transform: translateY(6px); box-shadow: 0 0px 0 #0f172a;
        }
        .arcade-secondary-btn:hover { 
          background: #334155; transform: translateY(-2px); box-shadow: 0 8px 0 #0f172a; 
        }
      `}</style>
      
      <div className="arcade-modal-overlay" onClick={handleOverlayClick}>
        <div className="arcade-modal-card" onClick={(e) => e.stopPropagation()}>
          
          <button className="arcade-close-btn" onClick={onClose}>&times;</button>
          
          <h2 style={{ 
            margin: '0 0 16px 0', fontSize: '28px', fontWeight: '900', 
            textTransform: 'uppercase', letterSpacing: '2px', color: '#22c55e',
            textShadow: '2px 2px 0 #064e3b'
          }}>
            {building.name}
          </h2>
          
          <div style={{ width: '60px', height: '4px', background: '#22c55e', margin: '0 auto 24px auto' }} />

          <p style={{ color: '#cbd5e1', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6', fontWeight: 'bold' }}>
            {building.description}
          </p>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            {/* The Magic Fix: target="_blank" guarantees a new tab */}
            <a 
              href={building.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="arcade-primary-btn"
            >
              Enter
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
            
            <button onClick={onClose} className="arcade-secondary-btn">
              Close
            </button>
          </div>

        </div>
      </div>
    </>
  );
}