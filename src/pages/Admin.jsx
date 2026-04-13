import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

// Helper to calculate exactly where an artwork will spawn in the 2.5D gallery
const getPlacementLabel = (index, total) => {
  const extraSlots = Math.max(0, total - 11);
  const transitionsNeeded = Math.ceil(extraSlots / 3);
  
  let oddTransitions = [];
  let evenTransitions = [];

  for (let i = 1; i <= transitionsNeeded; i++) {
    if (i % 2 !== 0) oddTransitions.unshift(`Transition ${i} (Left)`);
    else evenTransitions.push(`Transition ${i} (Right)`);
  }

  const roomSequence = ['Left Wall', ...oddTransitions, 'Center Room', ...evenTransitions, 'Right Wall'];
  
  let currentIndexTracker = 0;
  for (let room of roomSequence) {
    let capacity = (room === 'Left Wall' || room === 'Right Wall') ? 4 : 3;
    if (index >= currentIndexTracker && index < currentIndexTracker + capacity) {
      return { room, slot: index - currentIndexTracker + 1 };
    }
    currentIndexTracker += capacity;
  }
  return { room: 'Limbo', slot: 0 };
};

export default function Admin() {
  const { movies, setMovies, gallery, setGallery } = useData();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // UI State
  const [activeTab, setActiveTab] = useState('gallery');
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Form States
  const [movieForm, setMovieForm] = useState({ title: '', subtitle: '', description: '', ytId: '' });
  const [galleryForm, setGalleryForm] = useState({ artist: '', title: '', price: '', image: '', buyLink: '' });

  // --- AUTHENTICATION ---
  useEffect(() => {
    const authStatus = sessionStorage.getItem('mcpepe_admin_auth');
    if (authStatus === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'pepeadmin') { // <-- YOUR ADMIN PASSWORD HERE
      setIsAuthenticated(true);
      sessionStorage.setItem('mcpepe_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mcpepe_admin_auth');
  };

  // --- ADD / DELETE LOGIC ---
  const handleAddMovie = (e) => {
    e.preventDefault();
    setMovies([{ ...movieForm, id: Date.now().toString() }, ...movies]);
    setMovieForm({ title: '', subtitle: '', description: '', ytId: '' });
  };

  const handleAddArt = (e) => {
    e.preventDefault();
    setGallery([...gallery, { ...galleryForm, id: Date.now().toString() }]);
    setGalleryForm({ artist: '', title: '', price: '', image: '', buyLink: '' });
  };

  const deleteMovie = (id) => setMovies(movies.filter(m => m.id !== id));
  const deleteArt = (id) => setGallery(gallery.filter(g => g.id !== id));

  // --- DRAG AND DROP LOGIC (GALLERY) ---
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Transparent drag image so the ghost doesn't block view
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newGallery = [...gallery];
    const draggedItem = newGallery.splice(draggedIndex, 1)[0];
    newGallery.splice(dropIndex, 0, draggedItem);
    setGallery(newGallery);
    setDraggedIndex(null);
  };

  // --- STYLES ---
  const s = {
    wrapper: { width: '100vw', height: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    loginBox: { marginTop: '15vh', background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    header: { width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px' },
    container: { width: '100%', maxWidth: '1000px', padding: '0 20px 60px 20px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' },
    tabs: { display: 'flex', gap: '10px' },
    tabBtn: (active) => ({ padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', background: active ? '#06b6d4' : '#1e293b', color: active ? '#fff' : '#94a3b8', boxShadow: active ? '0 4px 14px 0 rgba(6, 182, 212, 0.39)' : 'none' }),
    input: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff', marginBottom: '16px', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' },
    btnPrimary: { width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#fff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 14px 0 rgba(6, 182, 212, 0.39)' },
    btnDanger: { background: '#ef4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
    card: { background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
    listItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '12px', transition: 'all 0.2s' },
    dragHandle: { cursor: 'grab', padding: '0 10px', color: '#64748b', fontSize: '20px', userSelect: 'none' },
    badge: { display: 'inline-block', padding: '4px 8px', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '6px' }
  };

  // --- LOGIN RENDER ---
  if (!isAuthenticated) {
    return (
      <div style={s.wrapper}>
        <div style={s.loginBox}>
          <h2 style={{ margin: '0 0 24px 0', color: '#fff' }}>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" placeholder="Enter Password" value={passwordInput} 
              onChange={e => setPasswordInput(e.target.value)} 
              style={{ ...s.input, textAlign: 'center' }} autoFocus 
            />
            {loginError && <p style={{ color: '#ef4444', fontSize: '14px', margin: '0 0 16px 0' }}>{loginError}</p>}
            <button type="submit" style={s.btnPrimary}>Log in</button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN ADMIN RENDER ---
  return (
    <div style={s.wrapper}>
      {/* HEADER */}
      <header style={s.header}>
        <h1 style={{ margin: 0, fontSize: '24px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          McPepe Town • Admin Control
        </h1>
        <div style={s.tabs}>
          <button style={s.tabBtn(activeTab === 'gallery')} onClick={() => setActiveTab('gallery')}>Gallery Setup</button>
          <button style={s.tabBtn(activeTab === 'cinema')} onClick={() => setActiveTab('cinema')}>Cinema Setup</button>
          <button style={{ ...s.tabBtn(false), marginLeft: '20px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444' }} onClick={handleLogout}>Log Out</button>
        </div>
      </header>

      {/* TWO COLUMN LAYOUT */}
      <div style={{...s.container, display: window.innerWidth < 768 ? 'block' : 'grid'}}>
        
        {/* LEFT COLUMN: ADD NEW FORMS */}
        <div>
          {activeTab === 'gallery' ? (
            <div style={s.card}>
              <h3 style={{ margin: '0 0 20px 0', color: '#fff' }}>Mint New Artwork</h3>
              <form onSubmit={handleAddArt}>
                <input required placeholder="Artist Name" value={galleryForm.artist} onChange={e => setGalleryForm({...galleryForm, artist: e.target.value})} style={s.input} />
                <input required placeholder="Artwork Title" value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} style={s.input} />
                <input required placeholder="Price (e.g., 0.5 ETH)" value={galleryForm.price} onChange={e => setGalleryForm({...galleryForm, price: e.target.value})} style={s.input} />
                <input required placeholder="Image URL (.jpg, .png)" value={galleryForm.image} onChange={e => setGalleryForm({...galleryForm, image: e.target.value})} style={s.input} />
                <input required placeholder="Buy Link (OpenSea etc)" value={galleryForm.buyLink} onChange={e => setGalleryForm({...galleryForm, buyLink: e.target.value})} style={s.input} />
                <button type="submit" style={s.btnPrimary}>+ Add to Gallery</button>
              </form>
            </div>
          ) : (
            <div style={s.card}>
              <h3 style={{ margin: '0 0 20px 0', color: '#fff' }}>Add New Movie</h3>
              <form onSubmit={handleAddMovie}>
                <input required placeholder="Title" value={movieForm.title} onChange={e => setMovieForm({...movieForm, title: e.target.value})} style={s.input} />
                <input required placeholder="Subtitle" value={movieForm.subtitle} onChange={e => setMovieForm({...movieForm, subtitle: e.target.value})} style={s.input} />
                <textarea required placeholder="Description..." value={movieForm.description} onChange={e => setMovieForm({...movieForm, description: e.target.value})} style={{...s.input, height: '100px', resize: 'vertical'}} />
                <input required placeholder="YouTube ID (e.g., dQw4w9WgXcQ)" value={movieForm.ytId} onChange={e => setMovieForm({...movieForm, ytId: e.target.value})} style={s.input} />
                <button type="submit" style={s.btnPrimary}>+ Add to Cinema</button>
              </form>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: LIST AND REORDER */}
        <div>
          {activeTab === 'gallery' && (
            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#fff' }}>Live Exhibition ({gallery.length} Items)</h3>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Drag to reorder ↕</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {gallery.map((g, index) => {
                  const placement = getPlacementLabel(index, gallery.length);
                  return (
                    <div 
                      key={g.id} 
                      draggable 
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      style={{ 
                        ...s.listItem, 
                        border: draggedIndex === index ? '1px dashed #06b6d4' : '1px solid #334155',
                        background: draggedIndex === index ? 'rgba(6, 182, 212, 0.05)' : '#0f172a'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={s.dragHandle}>⠿</div>
                        {g.image && <div style={{ width: '40px', height: '40px', borderRadius: '6px', backgroundImage: `url(${g.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>{index + 1}. {g.title}</div>
                          <div style={{ color: '#94a3b8', fontSize: '12px' }}>by {g.artist}</div>
                          <div style={s.badge}>📍 {placement.room} • Slot {placement.slot}</div>
                        </div>
                      </div>
                      <button onClick={() => deleteArt(g.id)} style={s.btnDanger}>Remove</button>
                    </div>
                  );
                })}
                {gallery.length === 0 && <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>The gallery is currently empty.</p>}
              </div>
            </div>
          )}

          {activeTab === 'cinema' && (
            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#fff' }}>Now Playing ({movies.length} Movies)</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {movies.map((m, index) => (
                  <div key={m.id} style={s.listItem}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ background: '#1e293b', width: '40px', height: '40px', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#06b6d4', fontWeight: 'bold' }}>{index + 1}</div>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>{m.title}</div>
                        <div style={{ color: '#94a3b8', fontSize: '12px' }}>YT ID: {m.ytId}</div>
                      </div>
                    </div>
                    <button onClick={() => deleteMovie(m.id)} style={s.btnDanger}>Remove</button>
                  </div>
                ))}
                {movies.length === 0 && <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>The cinema is currently empty.</p>}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}