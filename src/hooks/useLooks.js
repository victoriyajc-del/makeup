import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pgmp_looks';

const SEED_LOOKS = [
  {
    id: '1',
    name: 'Soft Pink Everyday',
    occasion: 'everyday',
    notes: 'Light foundation, rosy blush, mascara & tinted lip balm. Fresh and effortless.',
    products: ["Fenty Pro Filt'r Foundation", 'NARS Blush in Orgasm', 'Rare Beauty Mascara', 'Summer Fridays Lip Butter'],
    color: '#ff85b5',
    fav: true,
    createdAt: Date.now() - 5 * 86400000,
  },
  {
    id: '2',
    name: 'Golden Glam Night',
    occasion: 'glam',
    notes: 'Cut crease with gold shimmer, bold lash, contoured cheeks, glossy nude lip.',
    products: ['Charlotte Tilbury Pillow Talk', 'Pat McGrath Gold Eye Shadow', 'Anastasia Beverly Hills Contour Kit'],
    color: '#f7d06a',
    fav: true,
    createdAt: Date.now() - 10 * 86400000,
  },
  {
    id: '3',
    name: 'Romantic Wedding',
    occasion: 'wedding',
    notes: 'Dewy skin, halo eye in rose gold, blush drape, long-wear nude lip.',
    products: ['Giorgio Armani Luminous Silk', 'Charlotte Tilbury Filmstar Bronze & Glow'],
    color: '#c77dff',
    fav: false,
    createdAt: Date.now() - 20 * 86400000,
  },
];

function loadLooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {
    // ignore parse errors
  }
  return null;
}

function saveLooks(looks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(looks));
}

export function useLooks() {
  const [looks, setLooks] = useState(() => {
    const stored = loadLooks();
    if (stored) return stored;
    // Seed on first visit
    saveLooks(SEED_LOOKS);
    return SEED_LOOKS;
  });

  useEffect(() => {
    saveLooks(looks);
  }, [looks]);

  function addLook({ name, occasion, notes, products, color }) {
    const newLook = {
      id: Date.now().toString(),
      name,
      occasion,
      notes,
      products,
      color,
      fav: false,
      createdAt: Date.now(),
    };
    setLooks(prev => [newLook, ...prev]);
  }

  function updateLook(id, updates) {
    setLooks(prev =>
      prev.map(l => (l.id === id ? { ...l, ...updates, updatedAt: Date.now() } : l))
    );
  }

  function deleteLook(id) {
    setLooks(prev => prev.filter(l => l.id !== id));
  }

  function toggleFav(id) {
    setLooks(prev =>
      prev.map(l => (l.id === id ? { ...l, fav: !l.fav } : l))
    );
  }

  return { looks, addLook, updateLook, deleteLook, toggleFav };
}
