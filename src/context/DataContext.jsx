import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext();

// Default data (your original hardcoded data)
const defaultMovies = [
  { id: 'keonne', title: 'The Keonne Rodriguez Story', subtitle: 'The documentary behind the Samourai', description: 'Animated exploration of the life, times, and controversies surrounding Keonne Rodriguez.', ytId: 'dQw4w9WgXcQ' },
  { id: 'piratebay', title: 'The Pirate Bay Hack', subtitle: 'True Crime Documentary', description: 'A deep dive into the world\'s most resilient torrent site and the digital battles fought to keep it online.', ytId: 'dQw4w9WgXcQ' },
  { id: 'Samourai', title: 'Samourai Wallet: The Skinwalker and the Suburbs', subtitle: 'Keonne notes in jail', description: 'How a simple wallet app became a battlefield for digital freedom.', ytId: '7iztez7fAYQ' },
  { id: 'epstein', title: 'The Epstein Saga', subtitle: 'Investigative Report', description: 'Uncovering the dark web of digital connections in one of the most infamous true crime cases of our time.', ytId: 'dQw4w9WgXcQ' }
];

const defaultGallery = [
  { id: 'l1', artist: 'Satoshi', title: 'The Genesis', price: '0.5 ETH', image: 'https://i.pinimg.com/originals/42/ee/cb/42eecb3a6858e165f255de7a1914130a.jpg', buyLink: 'https://opensea.io' },
  { id: 'l2', artist: 'Pepeangelo', title: 'Rare Pepe #1', price: '0.2 ETH', image: 'https://p7.hiclipart.com/preview/40/519/760/pepe-the-frog-bernie-sanders-dank-meme-stash-know-your-meme-meme.jpg', buyLink: 'https://opensea.io' },
  { id: 'l3', artist: 'Anon', title: 'Hold the Line', price: '0.1 ETH', image: 'https://ih1.redbubble.net/image.777377635.0584/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u3.jpg', buyLink: 'https://opensea.io' },
  { id: 'l4', artist: 'Vitalik', title: 'Gas Wars', price: '1.2 ETH', image: 'https://media.tenor.com/rQEkWPL0P3UAAAAe/dank-meme-pepe.png', buyLink: 'https://opensea.io' },
  { id: 'c1', artist: 'McPepe', title: 'The Architect', price: '5.0 ETH', image: 'https://thumbs.dreamstime.com/b/young-conceptual-image-large-stone-shape-human-brain-conceptual-image-large-stone-shape-110748113.jpg', buyLink: 'https://opensea.io' },
  { id: 'c2', artist: 'McPepe', title: 'Masterpiece', price: '10.0 ETH', image: 'https://ih1.redbubble.net/image.1829569460.5193/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg', buyLink: 'https://opensea.io' },
  { id: 'c3', artist: 'McPepe', title: 'The Vision', price: '5.0 ETH', image: 'https://rarepepes.com/wp-content/uploads/2021/08/DANKPEPE.jpg', buyLink: 'https://opensea.io' },
  { id: 'r1', artist: 'Doge', title: 'Much Wow', price: '0.1 ETH', image: 'https://w0.peakpx.com/wallpaper/193/497/HD-wallpaper-feelsbadman-pepe-frog-pepe-the-frog-meme-memes-dank-meme-dank-memes-pepe-frog-frog-pepe.jpg', buyLink: 'https://opensea.io' },
  { id: 'r2', artist: 'Anon', title: 'To the Moon', price: '0.4 ETH', image: 'https://pics.craiyon.com/2023-06-30/ed12f26c424445c1bf03f556147b6037.webp', buyLink: 'https://opensea.io' },
  { id: 'r3', artist: 'Pepeangelo', title: 'Dip Buyer', price: '0.8 ETH', image: 'https://image.tensorartassets.com/cdn-cgi/image/anim=true,plain=false,w=500,q=85/workflow_template_showcase/773688270748985218/744a94f1-1829-d045-00a0-0c0733b707ec.png', buyLink: 'https://opensea.io' },
  { id: 'r4', artist: 'Satoshi', title: 'Diamond Hands', price: '2.5 ETH', image: 'https://p4.wallpaperbetter.com/wallpaper/218/773/217/pepe-meme-gadsden-flag-humor-wallpaper-preview.jpg', buyLink: 'https://opensea.io' }
];

export function DataProvider({ children }) {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('mcpepe_movies');
    return saved ? JSON.parse(saved) : defaultMovies;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('mcpepe_gallery');
    return saved ? JSON.parse(saved) : defaultGallery;
  });

  useEffect(() => {
    localStorage.setItem('mcpepe_movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('mcpepe_gallery', JSON.stringify(gallery));
  }, [gallery]);

  return (
    <DataContext.Provider value={{ movies, setMovies, gallery, setGallery }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);