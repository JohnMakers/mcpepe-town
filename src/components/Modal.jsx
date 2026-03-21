import React from 'react';

export default function Modal({ building, onClose }) {
  if (!building) return null;

  return (
    // The dark overlay blocking the map
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(4px)', // Adds a glass effect if supported
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, // Guarantees it is on top of everything
      fontFamily: 'sans-serif'
    }}>
      
      {/* The Modal Box */}
      <div style={{
        backgroundColor: '#0f172a',
        border: '2px solid #06b6d4',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '450px',
        width: '90%',
        boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)',
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}>
        
        {/* 'X' Close Button in corner */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', color: '#64748b', fontSize: '24px', cursor: 'pointer' }}
        >
          &times;
        </button>
        
        <h2 style={{ color: '#22d3ee', fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {building.name}
        </h2>
        
        <p style={{ color: '#cbd5e1', fontSize: '18px', marginBottom: '32px', lineHeight: '1.5' }}>
          {building.description}
        </p>
        
        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <a 
            href={building.link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ flex: 1, backgroundColor: '#06b6d4', color: '#000', padding: '14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}
          >
            Enter {building.name.split(' ')[0]}
          </a>
          <button 
            onClick={onClose}
            style={{ flex: 1, backgroundColor: 'transparent', border: '2px solid #475569', color: 'white', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}