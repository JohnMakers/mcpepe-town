import React, { useState } from 'react';
import artLeft from '../assets/art_left.png';
import artCenter from '../assets/art_center.png';
import artRight from '../assets/art_right.png';

// Updated Database: Preserved all your manual 3D coordinates! Added 'buyLink'.
const GALLERY_DATA = {
  left: {
    bg: artLeft,
    frames: [
      { 
        id: 'l1', artist: 'Satoshi', title: 'The Genesis', price: '0.5 ETH', image: 'https://i.pinimg.com/originals/42/ee/cb/42eecb3a6858e165f255de7a1914130a.jpg', buyLink: 'https://opensea.io',
        canvas: { x: '24.5%', y: '26%', w: '11.5%', h: '44.5%', transform: 'perspective(500px) rotateY(25deg) skewY(2deg)' },
        plaque: { x: '23.5%', y: '83.8%', w: '12%', h: '8.5%', transform: 'perspective(1000px) rotateY(10deg) skewY(-15.8deg)' }
      },
      { 
        id: 'l2', artist: 'Pepeangelo', title: 'Rare Pepe #1', price: '0.2 ETH', image: 'https://p7.hiclipart.com/preview/40/519/760/pepe-the-frog-bernie-sanders-dank-meme-stash-know-your-meme-meme.jpg', buyLink: 'https://opensea.io',
        canvas: { x: '39.8%', y: '32.8%', w: '7.3%', h: '33.8%', transform: 'perspective(600px) rotateY(35deg) skewY(2deg)' },
        plaque: { x: '39%', y: '77%', w: '8%', h: '7%', transform: 'perspective(1000px) rotateY(18deg) skewY(-17deg)' }
      },
      { 
        id: 'l3', artist: 'Anon', title: 'Hold the Line', price: '0.1 ETH', image: 'https://ih1.redbubble.net/image.777377635.0584/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u3.jpg', buyLink: 'https://opensea.io',
        canvas: { x: '49.7%', y: '36.3%', w: '4.5%', h: '28.5%', transform: 'perspective(200px) rotateY(18deg) skewY(2deg)' },
        plaque: { x: '48.5%', y: '73.4%', w: '6%', h: '5%', transform: 'perspective(1000px) rotateY(15deg) skewY(-17deg)' }
      },
      { 
        id: 'l4', artist: 'Vitalik', title: 'Gas Wars', price: '1.2 ETH', image: 'https://media.tenor.com/rQEkWPL0P3UAAAAe/dank-meme-pepe.png', buyLink: 'https://opensea.io',
        canvas: { x: '76.5%', y: '37.5%', w: '8.7%', h: '22.2%', transform: 'perspective(1000px) rotateY(5deg) skewY(0deg)' },
        plaque: { x: '75%', y: '70.8%', w: '11.6%', h: '5.6%', transform: 'perspective(1000px) rotateY(5deg) skewY(2.5deg)' }
      },
    ]
  },
  center: {
    bg: artCenter,
    frames: [
      { 
        id: 'c1', artist: 'McPepe', title: 'The Architect', price: '5.0 ETH', image: 'https://thumbs.dreamstime.com/b/young-conceptual-image-large-stone-shape-human-brain-conceptual-image-large-stone-shape-110748113.jpg', buyLink: 'https://opensea.io',
        canvas: { x: '23.8%', y: '34.9%', w: '12.5%', h: '32.2%', transform: 'none' },
        plaque: { x: '22.7%', y: '76.5%', w: '14.6%', h: '7%', transform: 'none' }
      },
      { 
        id: 'c2', artist: 'McPepe', title: 'Masterpiece', price: '10.0 ETH', image: 'https://ih1.redbubble.net/image.1829569460.5193/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg', buyLink: 'https://opensea.io',
        canvas: { x: '44.4%', y: '34.8%', w: '12.3%', h: '32.3%', transform: 'none' },
        plaque: { x: '43.1%', y: '76.5%', w: '14.6%', h: '7%', transform: 'none' }
      },
      { 
        id: 'c3', artist: 'McPepe', title: 'The Vision', price: '5.0 ETH', image: 'https://rarepepes.com/wp-content/uploads/2021/08/DANKPEPE.jpg', buyLink: 'https://opensea.io',
        canvas: { x: '64.8%', y: '34.7%', w: '12.4%', h: '32.4%', transform: 'none' },
        plaque: { x: '63.8%', y: '76.5%', w: '14.7%', h: '7%', transform: 'none' }
      },
    ]
  },
  right: {
    bg: artRight,
    frames: [
      { 
        id: 'r1', artist: 'Doge', title: 'Much Wow', price: '0.1 ETH', image: 'https://w0.peakpx.com/wallpaper/193/497/HD-wallpaper-feelsbadman-pepe-frog-pepe-the-frog-meme-memes-dank-meme-dank-memes-pepe-frog-frog-pepe.jpg', buyLink: 'https://opensea.io',
        canvas: { x: '26.7%', y: '35.2%', w: '6.2%', h: '29.2%', transform: 'perspective(600px) rotateY(-18deg) skewY(-1.3deg)' },
        plaque: { x: '26.5%', y: '73.2%', w: '7%', h: '6.5%', transform: 'perspective(1000px) rotateY(-10deg) skewY(8.5deg)' }
      },
      { 
        id: 'r2', artist: 'Anon', title: 'To the Moon', price: '0.4 ETH', image: 'https://pics.craiyon.com/2023-06-30/ed12f26c424445c1bf03f556147b6037.webp', buyLink: 'https://opensea.io',
        canvas: { x: '37%', y: '32%', w: '7.3%', h: '34.5%', transform: 'perspective(600px) rotateY(-17deg) skewY(-1.3deg)' },
        plaque: { x: '36%', y: '76%', w: '9.3%', h: '7%', transform: 'perspective(1000px) rotateY(-18deg) skewY(8deg)' }
      },
      { 
        id: 'r3', artist: 'Pepeangelo', title: 'Dip Buyer', price: '0.8 ETH', image: 'https://image.tensorartassets.com/cdn-cgi/image/anim=true,plain=false,w=500,q=85/workflow_template_showcase/773688270748985218/744a94f1-1829-d045-00a0-0c0733b707ec.png', buyLink: 'https://opensea.io',
        canvas: { x: '49.5%', y: '28.3%', w: '11.8%', h: '40.1%', transform: 'perspective(600px) rotateY(-18deg) skewY(-1deg)' },
        plaque: { x: '49%', y: '79.6%', w: '13.6%', h: '8.1%', transform: 'perspective(1000px) rotateY(-22deg) skewY(8deg)' }
      },
      { 
        id: 'r4', artist: 'Satoshi', title: 'Diamond Hands', price: '2.5 ETH', image: 'https://p4.wallpaperbetter.com/wallpaper/218/773/217/pepe-meme-gadsden-flag-humor-wallpaper-preview.jpg', buyLink: 'https://opensea.io',
        canvas: { x: '69.3%', y: '23.5%', w: '18.6%', h: '47.4%', transform: 'perspective(600px) rotateY(-13deg) skewY(-1.5deg)' },
        plaque: { x: '67.9%', y: '84.6%', w: '21.6%', h: '10.3%', transform: 'perspective(1000px) rotateY(-26deg) skewY(7.6deg)' }
      },
    ]
  }
};

export default function Gallery() {
  const [currentRoom, setCurrentRoom] = useState('center');
  const [selectedArt, setSelectedArt] = useState(null);

  const roomData = GALLERY_DATA[currentRoom];

  const handleNav = (direction) => {
    if (currentRoom === 'center') {
      setCurrentRoom(direction === 'left' ? 'left' : 'right');
    } else if (currentRoom === 'left' && direction === 'right') {
      setCurrentRoom('center');
    } else if (currentRoom === 'right' && direction === 'left') {
      setCurrentRoom('center');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin: 0, position: 'relative', fontFamily: 'sans-serif' }}>
      
      {/* BACKGROUND & CANVASES WRAPPER */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        
        <img 
          src={roomData.bg} 
          alt={`${currentRoom} gallery view`}
          style={{ 
            display: 'block', 
            maxWidth: '100vw',  
            maxHeight: '100vh', 
            width: 'auto', 
            height: 'auto', 
            userSelect: 'none', 
            pointerEvents: 'none',
            filter: selectedArt ? 'blur(12px) brightness(0.3)' : 'none',
            transition: 'filter 0.5s ease, opacity 0.3s ease'
          }}
        />

        {/* MCPEPE ART GALLERY - CENTER ROOM TITLE */}
        {!selectedArt && currentRoom === 'center' && (
          <div style={{
            position: 'absolute',
            top: '1%', // Placed perfectly between the ceiling decor and the frames
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 5,
            width: '100%',
            border: 'none',
          }}>
            <h1 style={{
              margin: 0,
              fontFamily: '"Georgia", "Times New Roman", serif', // Elegant art gallery serif
              fontSize: 'clamp(24px, 4vw, 54px)', // Responsive, big sizing
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '8px',
              // Rich Golden Metallic Gradient
              background: 'linear-gradient(to right, #b8860b, #ffd700, #fff8dc, #ffd700, #b8860b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              // Deep physical drop shadow to make it pop off the wall
              filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.8)) drop-shadow(0px 2px 4px rgba(0,0,0,0.6))'
            }}>
              McPepe Art Gallery
            </h1>
          </div>
        )}

        {/* MAPPING OVER THE ARTWORKS */}
        {!selectedArt && roomData.frames.map((frame) => (
          <React.Fragment key={frame.id}>
            
            {/* 1. THE CANVAS HITBOX */}
            <div
              onClick={() => setSelectedArt(frame)}
              style={{
                position: 'absolute',
                left: frame.canvas.x,
                top: frame.canvas.y,
                width: frame.canvas.w,
                height: frame.canvas.h,
                transform: frame.canvas.transform,
                cursor: 'pointer',
                backgroundColor: frame.image ? 'transparent' : 'rgba(255,255,255,0.7)', 
                backgroundImage: frame.image ? `url(${frame.image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: 'none', // Removed debug border
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = `${frame.canvas.transform} scale(1.03)`;
                e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = frame.canvas.transform;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />

            {/* 2. THE PLAQUE TEXT */}
            <div
              style={{
                position: 'absolute',
                left: frame.plaque.x,
                top: frame.plaque.y,
                width: frame.plaque.w,
                height: frame.plaque.h,
                transform: frame.plaque.transform,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none', 
                border: 'none', // Removed debug border
                color: 'rgba(60, 40, 10, 0.9)', 
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold',
                fontSize: 'clamp(8px, 1.5cqi, 18px)',
                textTransform: 'uppercase',
                textAlign: 'center',
                textShadow: '1px 1px 0px rgba(255, 255, 255, 0.5)' 
              }}
            >
              {frame.title}
            </div>
            
          </React.Fragment>
        ))}
      </div>

      {/* MODERN NAVIGATION ARROWS */}
      {!selectedArt && currentRoom !== 'left' && (
        <button 
          onClick={() => handleNav('left')}
          style={{ 
            position: 'absolute', left: '3%', top: '50%', transform: 'translateY(-50%)', 
            background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06b6d4', 
            width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer', zIndex: 20, 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5), inset 0 0 10px rgba(6, 182, 212, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
          onMouseOver={(e) => { 
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; 
            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.4), inset 0 0 15px rgba(6, 182, 212, 0.4)';
            e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.8)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={(e) => { 
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; 
            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5), inset 0 0 10px rgba(6, 182, 212, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
            e.currentTarget.style.color = '#06b6d4';
          }}
        >
          {/* SVG Left Chevron */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}
      
      {!selectedArt && currentRoom !== 'right' && (
        <button 
          onClick={() => handleNav('right')}
          style={{ 
            position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)', 
            background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06b6d4', 
            width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer', zIndex: 20, 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5), inset 0 0 10px rgba(6, 182, 212, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
          onMouseOver={(e) => { 
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; 
            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.4), inset 0 0 15px rgba(6, 182, 212, 0.4)';
            e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.8)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={(e) => { 
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; 
            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5), inset 0 0 10px rgba(6, 182, 212, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
            e.currentTarget.style.color = '#06b6d4';
          }}
        >
          {/* SVG Right Chevron */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}

      {/* EXPANDED ART MODAL - BACKGROUND CLICK CLOSES IT */}
      {selectedArt && (
        <div 
          onClick={() => setSelectedArt(null)} // Clicking the dark overlay closes the modal
          style={{ position: 'absolute', zIndex: 50, top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
        >
          
          <div 
            onClick={(e) => e.stopPropagation()} // Prevents clicks INSIDE the modal from bubbling up and closing it
            style={{ 
              backgroundColor: 'rgba(15, 17, 23, 0.85)', 
              backdropFilter: 'blur(24px)',              
              border: '1px solid rgba(255, 255, 255, 0.08)', 
              borderRadius: '24px', 
              padding: '40px', 
              width: '100%', 
              maxWidth: '460px',                          
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 30px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.1)' 
            }}
          >
            
            {/* Expanded Image Area with Glow */}
            <div style={{ 
              width: '100%', 
              aspectRatio: '1 / 1.2', 
              backgroundColor: '#0f111a', 
              backgroundImage: selectedArt.image ? `url(${selectedArt.image})` : 'linear-gradient(135deg, #1e293b, #0f172a)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '16px',
              marginBottom: '32px',
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }} />

            {/* Art Info - Metallic Gradient Text */}
            <h2 style={{ 
              margin: '0 0 6px 0', 
              fontSize: '32px', 
              textAlign: 'center',
              fontWeight: '800',
              background: 'linear-gradient(to right, #ffffff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              {selectedArt.title}
            </h2>
            
            {/* Elegant Artist Name Layout */}
            <p style={{ 
              margin: '0 0 32px 0', 
              fontSize: '15px', 
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{color: '#64748b'}}>Created by</span> 
              <span style={{ 
                color: '#c084fc', 
                textShadow: '0 0 10px rgba(192, 132, 252, 0.4), 0 0 20px rgba(192, 132, 252, 0.2)' 
              }}>
                {selectedArt.artist}
              </span>
            </p>

            {/* Premium Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
              
              {/* Ghost Back Button */}
              <button 
                onClick={() => setSelectedArt(null)}
                style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '14px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '15px', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.target.style.color = '#fff'; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.03)'; e.target.style.color = '#cbd5e1'; }}
              >
                Back
              </button>
              
              {/* Web3 CTA Buy Button */}
              <button 
                onClick={() => window.open(selectedArt.buyLink, '_blank')}
                style={{ flex: 2, background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', border: 'none', color: '#fff', padding: '14px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', boxShadow: '0 10px 20px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)', transition: 'transform 0.1s, filter 0.2s', textTransform: 'uppercase', letterSpacing: '1px' }}
                onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.filter = 'brightness(1.1)'; }}
                onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.filter = 'brightness(1)'; }}
              >
                Buy • {selectedArt.price}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}