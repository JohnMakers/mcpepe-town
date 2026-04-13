import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export default function Admin() {
  const { movies, setMovies, gallery, setGallery } = useData();
  const [activeTab, setActiveTab] = useState('cinema');

  // Form states
  const [movieForm, setMovieForm] = useState({ title: '', subtitle: '', description: '', ytId: '' });
  const [galleryForm, setGalleryForm] = useState({ artist: '', title: '', price: '', image: '', buyLink: '' });

  const handleAddMovie = (e) => {
    e.preventDefault();
    setMovies([...movies, { ...movieForm, id: Date.now().toString() }]);
    setMovieForm({ title: '', subtitle: '', description: '', ytId: '' });
  };

  const handleAddArt = (e) => {
    e.preventDefault();
    setGallery([...gallery, { ...galleryForm, id: Date.now().toString() }]);
    setGalleryForm({ artist: '', title: '', price: '', image: '', buyLink: '' });
  };

  const deleteMovie = (id) => setMovies(movies.filter(m => m.id !== id));
  const deleteArt = (id) => setGallery(gallery.filter(g => g.id !== id));

  const styles = {
    container: { padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#111', color: '#fff', minHeight: '100vh' },
    tabBtn: { padding: '10px 20px', marginRight: '10px', cursor: 'pointer', backgroundColor: '#333', border: 'none', color: '#fff', borderRadius: '4px' },
    activeTab: { backgroundColor: '#06b6d4' },
    form: { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px', marginBottom: '40px', backgroundColor: '#222', padding: '20px', borderRadius: '8px' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#111', color: '#fff' },
    submitBtn: { padding: '10px', backgroundColor: '#10b981', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' },
    listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#222', padding: '10px', marginBottom: '10px', borderRadius: '4px' },
    deleteBtn: { backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <h1>McPepe Admin Dashboard</h1>
      <div style={{ marginBottom: '20px' }}>
        <button 
          style={{ ...styles.tabBtn, ...(activeTab === 'cinema' ? styles.activeTab : {}) }} 
          onClick={() => setActiveTab('cinema')}
        >Cinema Config</button>
        <button 
          style={{ ...styles.tabBtn, ...(activeTab === 'gallery' ? styles.activeTab : {}) }} 
          onClick={() => setActiveTab('gallery')}
        >Gallery Config</button>
      </div>

      {activeTab === 'cinema' && (
        <div>
          <h2>Add New Movie</h2>
          <form style={styles.form} onSubmit={handleAddMovie}>
            <input required placeholder="Title" value={movieForm.title} onChange={e => setMovieForm({...movieForm, title: e.target.value})} style={styles.input} />
            <input required placeholder="Subtitle" value={movieForm.subtitle} onChange={e => setMovieForm({...movieForm, subtitle: e.target.value})} style={styles.input} />
            <textarea required placeholder="Description" value={movieForm.description} onChange={e => setMovieForm({...movieForm, description: e.target.value})} style={{...styles.input, height: '80px'}} />
            <input required placeholder="YouTube ID (e.g., dQw4w9WgXcQ)" value={movieForm.ytId} onChange={e => setMovieForm({...movieForm, ytId: e.target.value})} style={styles.input} />
            <button type="submit" style={styles.submitBtn}>Add Movie</button>
          </form>

          <h2>Current Movies ({movies.length})</h2>
          {movies.map(m => (
            <div key={m.id} style={styles.listItem}>
              <div>
                <strong>{m.title}</strong> - {m.ytId}
              </div>
              <button onClick={() => deleteMovie(m.id)} style={styles.deleteBtn}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'gallery' && (
        <div>
          <h2>Add New Artwork</h2>
          <form style={styles.form} onSubmit={handleAddArt}>
            <input required placeholder="Artist Name" value={galleryForm.artist} onChange={e => setGalleryForm({...galleryForm, artist: e.target.value})} style={styles.input} />
            <input required placeholder="Artwork Title" value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} style={styles.input} />
            <input required placeholder="Price (e.g., 0.5 ETH)" value={galleryForm.price} onChange={e => setGalleryForm({...galleryForm, price: e.target.value})} style={styles.input} />
            <input required placeholder="Image URL" value={galleryForm.image} onChange={e => setGalleryForm({...galleryForm, image: e.target.value})} style={styles.input} />
            <input required placeholder="Buy Link (OpenSea etc)" value={galleryForm.buyLink} onChange={e => setGalleryForm({...galleryForm, buyLink: e.target.value})} style={styles.input} />
            <button type="submit" style={styles.submitBtn}>Add Artwork</button>
          </form>

          <h2>Current Artworks ({gallery.length})</h2>
          <p style={{color: '#999', fontSize: '14px'}}>Note: The gallery displays 11 artworks per page. Infinite scroll/pages applies automatically.</p>
          {gallery.map((g, index) => (
            <div key={g.id} style={styles.listItem}>
              <div>
                <strong>#{index + 1} - {g.title}</strong> by {g.artist} ({g.price})
              </div>
              <button onClick={() => deleteArt(g.id)} style={styles.deleteBtn}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}