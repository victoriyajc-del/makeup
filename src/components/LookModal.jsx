import { useState, useEffect, useRef } from 'react';

const OCCASIONS = ['everyday', 'glam', 'natural', 'night-out', 'wedding', 'editorial', 'other'];

const COLORS = [
  '#ffb3c6', '#ff85b5', '#eb2f96', '#c41d7f',
  '#ffd6a5', '#f7d06a', '#ff6b8a', '#c77dff',
  '#b5ead7', '#a8dadc', '#e9c46a', '#f4a261',
];

const DEFAULT_COLOR = COLORS[1];

export default function LookModal({ open, editLook, onSave, onClose }) {
  const [name, setName] = useState('');
  const [occasion, setOccasion] = useState('everyday');
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [notes, setNotes] = useState('');
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState('');
  const nameRef = useRef(null);

  // Populate form when opening
  useEffect(() => {
    if (open) {
      if (editLook) {
        setName(editLook.name);
        setOccasion(editLook.occasion);
        setColor(editLook.color || DEFAULT_COLOR);
        setNotes(editLook.notes);
        setProducts([...editLook.products]);
      } else {
        setName('');
        setOccasion('everyday');
        setColor(DEFAULT_COLOR);
        setNotes('');
        setProducts([]);
      }
      setProductInput('');
      // Focus name input after render
      setTimeout(() => nameRef.current && nameRef.current.focus(), 50);
    }
  }, [open, editLook]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  function addProduct() {
    const val = productInput.trim();
    if (!val) return;
    if (!products.includes(val)) {
      setProducts(prev => [...prev, val]);
    }
    setProductInput('');
  }

  function handleProductKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addProduct();
    }
  }

  function removeProduct(idx) {
    setProducts(prev => prev.filter((_, i) => i !== idx));
  }

  function handleSave() {
    if (!name.trim()) {
      alert('Please enter a look name!');
      return;
    }
    onSave({ name: name.trim(), occasion, notes: notes.trim(), products, color });
  }

  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="modal-header">
          <div className="modal-title" id="modalTitle">
            {editLook ? '✏️ Edit Look' : '✨ New Glam Look'}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="inputName">Look Name</label>
            <input
              ref={nameRef}
              type="text"
              id="inputName"
              placeholder="e.g. Rosy Date Night"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputOccasion">Occasion</label>
            <select
              id="inputOccasion"
              className="form-select"
              value={occasion}
              onChange={e => setOccasion(e.target.value)}
            >
              {OCCASIONS.map(o => (
                <option key={o} value={o}>
                  {o.charAt(0).toUpperCase() + o.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Color Vibe</label>
            <div className="color-row">
              {COLORS.map(c => (
                <div
                  key={c}
                  className={`color-swatch${color === c ? ' selected' : ''}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                  title={c}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputNotes">Notes & Steps</label>
            <textarea
              id="inputNotes"
              placeholder="Describe your look, steps, tips..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Products Used</label>
            <div className="tag-input-wrap">
              <input
                type="text"
                id="productInput"
                placeholder="e.g. Charlotte Tilbury Pillow Talk"
                value={productInput}
                onChange={e => setProductInput(e.target.value)}
                onKeyDown={handleProductKeyDown}
              />
              <button className="btn-outline" onClick={addProduct}>Add</button>
            </div>
            {products.length > 0 && (
              <div className="tags-preview">
                {products.map((p, i) => (
                  <span key={i} className="tag-pill">
                    {p}
                    <button
                      className="tag-remove"
                      onClick={() => removeProduct(i)}
                      title="Remove"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Look</button>
        </div>
      </div>
    </div>
  );
}
