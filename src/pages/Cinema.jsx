import React, { useState } from 'react';
import cinemaBg from '../assets/cinema1.png';
import ticketBg from '../assets/ticket1.png';
import { useData } from '../context/DataContext';

function TicketItem({ movie, onSelect }) {
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const [isTicketHovered, setIsTicketHovered] = useState(false); 

  return (
    <div 
      onMouseEnter={() => setIsTicketHovered(true)}
      onMouseLeave={() => setIsTicketHovered(false)}
      onClick={() => onSelect(movie)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1000 / 330', 
        backgroundImage: `url(${ticketBg})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        transform: isTicketHovered ? 'scale(1.03) translateY(-4px)' : 'scale(1) translateY(0)',
        filter: isTicketHovered ? 'drop-shadow(0 15px 25px rgba(0,0,0,0.8)) brightness(1.05)' : 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))',
        transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
      }}
    >
      {/* The Title */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '25%', 
          top: '12%', 
          width: '50%', 
          height: '50%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',     
          border: 'none', 
          overflow: 'hidden'
        }}
      >
        <h3 style={{ 
          margin: 0, 
          fontSize: 'clamp(14px, 3.5cqi, 22px)', 
          fontWeight: '900', 
          color: '#0f172a', 
          lineHeight: '1.1', 
          textAlign: 'center', 
          letterSpacing: '-0.5px', 
          textShadow: '1px 1px 0px rgba(255, 255, 255, 0.7)' 
        }}>
          {movie.title}
        </h3>
      </div>

      {/* The Subtitle */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '24.4%', 
          top: '73%', 
          width: '53%', 
          height: '15%', 
          display: 'flex', 
          justifyContent: 'flex-start', 
          alignItems: 'center',     
          border: 'none', 
          overflow: 'hidden' 
        }}
      >
        <p style={{ 
          margin: 0, 
          fontSize: 'clamp(10px, 2cqi, 14px)', 
          fontWeight: '800', 
          color: '#334155', 
          lineHeight: '1.2', 
          textAlign: 'left', 
          textShadow: '1px 1px 0px rgba(255, 255, 255, 0.7)' 
        }}>
          {movie.subtitle}
        </p>
      </div>

      {/* The (i) Hover Button */}
      <div 
        onMouseEnter={(e) => { e.stopPropagation(); setIsTooltipHovered(true); }}
        onMouseLeave={(e) => { e.stopPropagation(); setIsTooltipHovered(false); }}
        style={{ 
          position: 'absolute', 
          cursor: 'help',
          left: '91%',  
          top: '11%', 
          width: '4.5%', 
          aspectRatio: '1/1',
          backgroundColor: '#000', 
          color: '#fff', 
          borderRadius: '50%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          fontWeight: 'bold', 
          fontSize: 'clamp(8px, 2cqi, 14px)', 
          border: 'none', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}
      >
        i
      </div>

      {/* The Tooltip */}
      {isTooltipHovered && (
        <div 
          style={{ 
            position: 'absolute', 
            right: '10%', 
            top: '-30%', 
            width: '40%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)', 
            backdropFilter: 'blur(4px)', 
            color: '#fff', 
            padding: '4%', 
            borderRadius: '8px', 
            border: 'none', 
            fontSize: 'clamp(10px, 2.5cqi, 16px)', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.9)', 
            zIndex: 60,
            pointerEvents: 'none' 
          }}
        >
          {movie.description}
        </div>
      )}
    </div>
  );
}

export default function Cinema() {
  const { movies } = useData();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(false);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin: 0, position: 'relative', fontFamily: 'sans-serif', containerType: 'inline-size' }}>
      
      {/* THE MAGIC WRAPPER */}
      <div style={{ 
        position: 'relative', 
        width: '100vw', 
        minWidth: '1200px', // Forces the sweet spot scale on mobile
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        
        <img 
          src={cinemaBg} 
          alt="Cinema Interior" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            display: 'block', 
            maxWidth: 'none', // Prevents Tailwind from squishing it!
            userSelect: 'none', 
            pointerEvents: 'none',
            filter: isModalOpen ? 'blur(12px) brightness(0.5)' : 'none',
            transition: 'filter 0.5s ease'
          }}
        />

        {/* THE YOUTUBE SCREEN LAYER */}
        {!isModalOpen && selectedMovie && (
          <div style={{ 
            position: 'absolute', 
            zIndex: 10,
            top: '30%', 
            left: '36%', 
            width: '29%', 
            height: '31%',
            backgroundColor: '#000'
          }}>
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${selectedMovie.ytId}?autoplay=1&rel=0`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              style={{ display: 'block' }}
            ></iframe>
          </div>
        )}
      </div>

      {/* THE TRANSLUCENT GLASS TICKET MODAL */}
      {isModalOpen && (
        <div style={{ position: 'absolute', zIndex: 50, top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          
          <div style={{ 
            backgroundColor: 'rgba(10, 15, 30, 0.45)', 
            backdropFilter: 'blur(16px)',              
            border: '1px solid rgba(6, 182, 212, 0.3)', 
            borderRadius: '24px', 
            padding: '40px 30px', 
            width: '100%', 
            maxWidth: '650px',                          
            maxHeight: '90vh', 
            overflowY: 'auto', 
            boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(6, 182, 212, 0.1)' 
          }}>
            
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '35px' }}>
              <h2 style={{ 
                color: '#fff', 
                margin: 0, 
                fontSize: 'clamp(24px, 5vw, 40px)', 
                textTransform: 'uppercase', 
                letterSpacing: '4px', 
                fontWeight: '900', 
                fontFamily: '"Courier New", Courier, monospace', 
                textShadow: '0 0 5px #06b6d4, 0 0 15px #06b6d4, 0 0 30px #06b6d4', 
                textAlign: 'center'
              }}>
                Movies Available
              </h2>
              {selectedMovie && ( 
                <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', right: 0, background: 'none', border: 'none', color: '#fff', textShadow: '0 0 10px #06b6d4', fontSize: '36px', cursor: 'pointer', padding: '0', lineHeight: '1' }}>&times;</button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {movies.map((movie) => (
                <TicketItem key={movie.id} movie={movie} onSelect={handleSelectMovie} />
              ))}
            </div>

          </div>
        </div>
      )}

      {/* RE-OPEN MODAL BUTTON */}
      {!isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(true)}
          style={{ 
            position: 'absolute', 
            zIndex: 40, 
            bottom: '30px', 
            right: '30px', 
            width: 'clamp(80px, 12vw, 140px)', 
            aspectRatio: '1000/330', 
            backgroundImage: `url(${ticketBg})`, 
            backgroundSize: '100% 100%', 
            cursor: 'pointer', 
            borderRadius: '8px', 
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.5), 0 0 30px rgba(6, 182, 212, 0.3), inset 0 0 10px rgba(6, 182, 212, 0.4)',
            border: '1px solid rgba(6, 182, 212, 0.8)', 
            transition: 'all 0.3s ease' 
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(6, 182, 212, 0.9), 0 0 50px rgba(6, 182, 212, 0.6), inset 0 0 15px rgba(6, 182, 212, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.5), 0 0 30px rgba(6, 182, 212, 0.3), inset 0 0 10px rgba(6, 182, 212, 0.4)';
          }}
          title="Choose a different movie"
        />
      )}

    </div>
  );
}