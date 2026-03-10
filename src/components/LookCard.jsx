function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function LookCard({ look, onEdit, onDelete, onToggleFav }) {
  const { id, name, occasion, notes, products, color, fav, createdAt } = look;
  const strip = color || '#eb2f96';
  const visibleProducts = products.slice(0, 5);
  const extraCount = products.length - 5;

  function handleDelete() {
    if (window.confirm('Delete this look?')) {
      onDelete(id);
    }
  }

  return (
    <div className="look-card">
      <div
        className="card-color-strip"
        style={{ background: `linear-gradient(90deg, ${strip}99, ${strip}, ${strip}cc)` }}
      />
      <div className="card-body">
        <div className="card-header">
          <div className="card-title">{name}</div>
          <button
            className="fav-btn"
            onClick={() => onToggleFav(id)}
            title={fav ? 'Unfavorite' : 'Favorite'}
          >
            {fav ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="card-occasion">{occasion}</div>
        {notes && <div className="card-notes">{notes}</div>}
        {products.length > 0 && (
          <div className="products-section">
            <div className="products-label">Products</div>
            <div className="products-list">
              {visibleProducts.map((p, i) => (
                <span key={i} className="product-tag">{p}</span>
              ))}
              {extraCount > 0 && (
                <span className="product-tag">+{extraCount} more</span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="card-footer">
        <span className="card-date">{formatDate(createdAt)}</span>
        <div className="card-actions">
          <button className="icon-btn" onClick={() => onEdit(id)} title="Edit">✏️</button>
          <button className="icon-btn" onClick={handleDelete} title="Delete">🗑️</button>
        </div>
      </div>
    </div>
  );
}
