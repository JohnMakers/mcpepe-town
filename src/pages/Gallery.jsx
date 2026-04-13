import React, { useState, useRef, useEffect, useMemo } from 'react';
import artLeft from '../assets/art_left.png';
import artCenter from '../assets/art_center.png';
import artRight from '../assets/art_right.png';
import artTransition from '../assets/art_transition.png'; 
import comingSoonImg from '../assets/coming_soon.png'; 
import { useData } from '../context/DataContext';

const BASE_SLOTS = {
  left: {
    bg: artLeft,
    frames: [
      { canvas: { x: '24.5%', y: '26%', w: '11.5%', h: '44.5%', transform: 'perspective(500px) rotateY(25deg) skewY(2deg)' }, plaque: { x: '23.5%', y: '83.8%', w: '12%', h: '8.5%', transform: 'perspective(1000px) rotateY(10deg) skewY(-15.8deg)' } },
      { canvas: { x: '39.8%', y: '32.8%', w: '7.3%', h: '33.8%', transform: 'perspective(600px) rotateY(35deg) skewY(2deg)' }, plaque: { x: '39%', y: '77%', w: '8%', h: '7%', transform: 'perspective(1000px) rotateY(18deg) skewY(-17deg)' } },
      { canvas: { x: '49.7%', y: '36.3%', w: '4.5%', h: '28.5%', transform: 'perspective(200px) rotateY(18deg) skewY(2deg)' }, plaque: { x: '48.5%', y: '73.4%', w: '6%', h: '5%', transform: 'perspective(1000px) rotateY(15deg) skewY(-17deg)' } },
      { canvas: { x: '76.5%', y: '37.5%', w: '8.7%', h: '22.2%', transform: 'perspective(1000px) rotateY(5deg) skewY(0deg)' }, plaque: { x: '75%', y: '70.8%', w: '11.6%', h: '5.6%', transform: 'perspective(1000px) rotateY(5deg) skewY(2.5deg)' } },
    ]
  },
  center: {
    bg: artCenter,
    frames: [
      { canvas: { x: '23.8%', y: '34.9%', w: '12.5%', h: '32.2%', transform: 'none' }, plaque: { x: '22.7%', y: '76.5%', w: '14.6%', h: '7%', transform: 'none' } },
      { canvas: { x: '44.4%', y: '34.8%', w: '12.3%', h: '32.3%', transform: 'none' }, plaque: { x: '43.1%', y: '76.5%', w: '14.6%', h: '7%', transform: 'none' } },
      { canvas: { x: '64.8%', y: '34.7%', w: '12.4%', h: '32.4%', transform: 'none' }, plaque: { x: '63.8%', y: '76.5%', w: '14.7%', h: '7%', transform: 'none' } },
    ]
  },
  right: {
    bg: artRight,
    frames: [
      { canvas: { x: '26.7%', y: '35.2%', w: '6.2%', h: '29.2%', transform: 'perspective(600px) rotateY(-18deg) skewY(-1.3deg)' }, plaque: { x: '26.5%', y: '73.2%', w: '7%', h: '6.5%', transform: 'perspective(1000px) rotateY(-10deg) skewY(8.5deg)' } },
      { canvas: { x: '37%', y: '32%', w: '7.3%', h: '34.5%', transform: 'perspective(600px) rotateY(-17deg) skewY(-1.3deg)' }, plaque: { x: '36%', y: '76%', w: '9.3%', h: '7%', transform: 'perspective(1000px) rotateY(-18deg) skewY(8deg)' } },
      { canvas: { x: '49.5%', y: '28.3%', w: '11.8%', h: '40.1%', transform: 'perspective(600px) rotateY(-18deg) skewY(-1deg)' }, plaque: { x: '49%', y: '79.6%', w: '13.6%', h: '8.1%', transform: 'perspective(1000px) rotateY(-22deg) skewY(8deg)' } },
      { canvas: { x: '69.3%', y: '23.5%', w: '18.6%', h: '47.4%', transform: 'perspective(600px) rotateY(-13deg) skewY(-1.5deg)' }, plaque: { x: '67.9%', y: '84.6%', w: '21.6%', h: '10.3%', transform: 'perspective(1000px) rotateY(-26deg) skewY(7.6deg)' } },
    ]
  },
  transition: {
    bg: artTransition,
    frames: [
      { canvas: { x: '23.8%', y: '34.9%', w: '12.5%', h: '32.2%', transform: 'none' }, plaque: { x: '22.7%', y: '76.5%', w: '14.6%', h: '7%', transform: 'none' } },
      { canvas: { x: '44.4%', y: '34.8%', w: '12.3%', h: '32.3%', transform: 'none' }, plaque: { x: '43.1%', y: '76.5%', w: '14.6%', h: '7%', transform: 'none' } },
      { canvas: { x: '64.8%', y: '34.7%', w: '12.4%', h: '32.4%', transform: 'none' }, plaque: { x: '63.8%', y: '76.5%', w: '14.7%', h: '7%', transform: 'none' } },
    ]
  }
};

export default function Gallery() {
  const { gallery } = useData(); 
  
  const galleryRooms = useMemo(() => {
    const totalArt = gallery.length;
    const extraSlotsNeeded = Math.max(0, totalArt - 11);
    const transitionRoomsNeeded = Math.ceil(extraSlotsNeeded / 3);

    let oddTransitions = [];
    let evenTransitions = [];

    for (let i = 1; i <= transitionRoomsNeeded; i++) {
      if (i % 2 !== 0) oddTransitions.unshift(`transition_${i}`);
      else evenTransitions.push(`transition_${i}`);
    }

    const roomSequence = ['left', ...oddTransitions, 'center', ...evenTransitions, 'right'];

    let currentItemIndex = 0;
    return roomSequence.map((roomId) => {
      const templateType = roomId.startsWith('transition') ? 'transition' : roomId;
      const template = BASE_SLOTS[templateType];

      const frames = template.frames.map((frameCanvas) => {
        const data = gallery[currentItemIndex];
        currentItemIndex++;

        if (data) {
          return { ...frameCanvas, data };
        } else {
          return {
            ...frameCanvas,
            data: {
              id: `empty-${currentItemIndex}`,
              title: 'Coming Soon',
              artist: 'Admin',
              price: '---',
              image: comingSoonImg,
              buyLink: '#',
              isComingSoon: true
            }
          };
        }
      });

      return { id: roomId, bg: template.bg, frames };
    });
  }, [gallery]);

  const centerIndex = galleryRooms.findIndex(r => r.id === 'center');
  const [roomIndex, setRoomIndex] = useState(centerIndex > -1 ? centerIndex : 0);
  const [entryPosition, setEntryPosition] = useState('center');
  
  const [selectedArt, setSelectedArt] = useState(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0.5); 
  const scrollContainerRef = useRef(null);

  const currentRoomData = galleryRooms[roomIndex];

  const updateScrollProgress = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(container.scrollLeft / maxScroll);
      } else {
        setScrollProgress(0.5);
      }
    }
  };

  const positionCamera = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      if (entryPosition === 'left') {
        container.scrollLeft = 0;
      } else if (entryPosition === 'right') {
        container.scrollLeft = container.scrollWidth - container.clientWidth;
      } else {
        container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
      }
      updateScrollProgress();
    }
  };

  useEffect(() => {
    positionCamera();
  }, [roomIndex, entryPosition, galleryRooms]);

  const handleNav = (direction) => {
    if (direction === 'left' && roomIndex > 0) {
      setRoomIndex(roomIndex - 1);
      setEntryPosition('right');
    } else if (direction === 'right' && roomIndex < galleryRooms.length - 1) {
      setRoomIndex(roomIndex + 1);
      setEntryPosition('left');
    }
  };

  const handleTouchStart = (e) => {
    setShowTooltip(false);
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    
    if (Math.abs(dx) > 40) {
      const isAtLeftEdge = container.scrollLeft <= 10;
      const isAtRightEdge = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

      if (dx > 0 && isAtLeftEdge && roomIndex > 0) handleNav('left');
      else if (dx < 0 && isAtRightEdge && roomIndex < galleryRooms.length - 1) handleNav('right');
    }
    setTouchStart(null);
  };

  return (
    <>
      <style>{`
        /* FIX: Adjusted Wrapper and Desktop Viewport Scaling */
        .gallery-viewport { width: 100vw; height: 100vh; background-color: #000; position: relative; overflow-x: auto; overflow-y: hidden; font-family: sans-serif; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; }
        .gallery-viewport::-webkit-scrollbar { display: none; }
        .gallery-content-wrapper { position: relative; display: inline-block; height: 100vh; text-align: left; }
        .gallery-bg-image { display: block; height: 100vh; width: auto; max-width: none; max-height: none; }
        
        .custom-scroll-indicator { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 40vw; max-width: 200px; height: 3px; background-color: rgba(255, 255, 255, 0.2); border-radius: 4px; z-index: 30; pointer-events: none; }
        .custom-scroll-ball { position: absolute; top: 50%; width: 10px; height: 10px; background-color: #ffffff; border-radius: 50%; box-shadow: 0 0 8px rgba(255, 255, 255, 0.8); transform: translate(-50%, -50%); transition: left 0.05s linear; }
        
        /* Forces Desktop to perfectly cover the entire area */
        @media (min-width: 1024px) {
          .gallery-viewport { overflow: hidden; display: block; }
          .gallery-content-wrapper { height: 100vh; width: 100vw; }
          .gallery-bg-image { width: 100vw; height: 100vh; object-fit: fill; }
          .mobile-tooltip, .custom-scroll-indicator { display: none !important; }
        }
        
        @keyframes float-up { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-6px); } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        .mobile-tooltip { position: fixed; bottom: 45px; left: 50%; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); color: #06b6d4; padding: 10px 20px; border-radius: 30px; border: 1px solid rgba(6, 182, 212, 0.3); box-shadow: 0 10px 25px rgba(0,0,0,0.5), inset 0 0 10px rgba(6, 182, 212, 0.1); z-index: 40; pointer-events: none; display: flex; align-items: center; gap: 12px; animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards, float-up 2.5s infinite ease-in-out 0.6s; }
        .mobile-tooltip-text { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; white-space: nowrap; }
      `}</style>

      <div ref={scrollContainerRef} className="gallery-viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onScroll={updateScrollProgress}>
        <div className="gallery-content-wrapper">
          <img 
            src={currentRoomData.bg} alt={`gallery view`} className="gallery-bg-image" onLoad={positionCamera}
            style={{ userSelect: 'none', pointerEvents: 'none', filter: selectedArt ? 'blur(12px) brightness(0.3)' : 'none', transition: 'filter 0.5s ease, opacity 0.3s ease' }}
          />

          {!selectedArt && currentRoomData.frames.map((frame, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => setSelectedArt(frame.data)}
                style={{
                  position: 'absolute', left: frame.canvas.x, top: frame.canvas.y, width: frame.canvas.w, height: frame.canvas.h,
                  transform: frame.canvas.transform, cursor: 'pointer',
                  backgroundColor: frame.data.image ? 'transparent' : 'rgba(255,255,255,0.7)', 
                  backgroundImage: frame.data.image ? `url(${frame.data.image})` : 'none',
                  backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = `${frame.canvas.transform} scale(1.03)`; e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.6)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = frame.canvas.transform; e.currentTarget.style.boxShadow = 'none'; }}
              />
              <div style={{
                position: 'absolute', left: frame.plaque.x, top: frame.plaque.y, width: frame.plaque.w, height: frame.plaque.h,
                transform: frame.plaque.transform, display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none', 
                color: 'rgba(60, 40, 10, 0.9)', fontFamily: 'Georgia, serif', fontWeight: 'bold', 
                
                /* FIX: Switched from broken cqi to highly stable vh */
                fontSize: 'clamp(6px, 1.8vh, 22px)', 
                lineHeight: '1.1',
                padding: '0 2%',
                overflow: 'hidden',

                textTransform: 'uppercase', textAlign: 'center', textShadow: '1px 1px 0px rgba(255, 255, 255, 0.5)' 
              }}>
                {frame.data.title}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* CUSTOM SCROLL INDICATOR */}
        {!selectedArt && (
          <div className="custom-scroll-indicator">
            <div className="custom-scroll-ball" style={{ left: `${scrollProgress * 100}%` }} />
          </div>
        )}

        {/* MOBILE TOOLTIP */}
        {showTooltip && !selectedArt && (
          <div className="mobile-tooltip">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            <span className="mobile-tooltip-text">Swipe to explore</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        )}

        {/* MAIN TITLE (FIXED CLAMPING AND ADDED LINE HEIGHT) */}
        {!selectedArt && currentRoomData.id === 'center' && (
          <div style={{ position: 'fixed', top: 'clamp(15px, 4vh, 40px)', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 5, width: '90%', maxWidth: '1000px' }}>
            <h1 style={{ margin: 0, lineHeight: '1.2', fontFamily: '"Georgia", "Times New Roman", serif', fontSize: 'clamp(20px, 4vh, 45px)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: 'clamp(3px, 1vw, 8px)', background: 'linear-gradient(to right, #b8860b, #ffd700, #fff8dc, #ffd700, #b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.8)) drop-shadow(0px 2px 4px rgba(0,0,0,0.6))' }}>
              McPepe Art Gallery
            </h1>
          </div>
        )}

        {/* ROOM NAVIGATION BUTTONS */}
        {!selectedArt && roomIndex > 0 && (
          <button onClick={() => handleNav('left')} style={{ position: 'fixed', left: 'clamp(10px, 3%, 30px)', top: '50%', transform: 'translateY(-50%)', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06b6d4', width: 'clamp(40px, 10vw, 60px)', height: 'clamp(40px, 10vw, 60px)', borderRadius: '50%', cursor: 'pointer', zIndex: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5), inset 0 0 10px rgba(6, 182, 212, 0.1)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)'; e.currentTarget.style.color = '#06b6d4'; }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
        )}
        
        {!selectedArt && roomIndex < galleryRooms.length - 1 && (
          <button onClick={() => handleNav('right')} style={{ position: 'fixed', right: 'clamp(10px, 3%, 30px)', top: '50%', transform: 'translateY(-50%)', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06b6d4', width: 'clamp(40px, 10vw, 60px)', height: 'clamp(40px, 10vw, 60px)', borderRadius: '50%', cursor: 'pointer', zIndex: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5), inset 0 0 10px rgba(6, 182, 212, 0.1)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)'; e.currentTarget.style.color = '#06b6d4'; }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        )}

        {/* MODAL LAYER */}
        {selectedArt && (
          <div onClick={() => setSelectedArt(null)} style={{ position: 'fixed', zIndex: 50, top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
            <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'rgba(15, 17, 23, 0.85)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', padding: 'clamp(20px, 5vw, 40px)', width: '90%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
              <div style={{ width: '100%', aspectRatio: '1 / 1.2', backgroundColor: '#0f111a', backgroundImage: selectedArt.image ? `url(${selectedArt.image})` : 'linear-gradient(135deg, #1e293b, #0f172a)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '16px', marginBottom: 'clamp(16px, 4vw, 32px)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }} />
              <h2 style={{ margin: '0 0 6px 0', fontSize: 'clamp(24px, 6vw, 32px)', textAlign: 'center', fontWeight: '800', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>{selectedArt.title}</h2>
              <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{color: '#64748b'}}>Created by</span> <span style={{ color: '#c084fc', textShadow: '0 0 10px rgba(192, 132, 252, 0.4)' }}>{selectedArt.artist}</span></p>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <button onClick={() => setSelectedArt(null)} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '14px 10px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' }}>Back</button>
                {!selectedArt.isComingSoon && (
                  <button onClick={() => window.open(selectedArt.buyLink, '_blank')} style={{ flex: 2, background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', border: 'none', color: '#fff', padding: '14px 10px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 10px 20px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)' }}>Buy • {selectedArt.price}</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}