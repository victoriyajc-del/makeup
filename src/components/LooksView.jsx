import LookCard from './LookCard.jsx';

const OCCASIONS = ['everyday', 'glam', 'natural', 'night-out', 'wedding', 'editorial', 'other'];

export default function LooksView({ looks, search, filter, onFilterChange, onNew, onEdit, onDelete, onToggleFav }) {
  const filtered = looks.filter(l => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.notes.toLowerCase().includes(q) ||
      l.products.some(p => p.toLowerCase().includes(q));
    const matchFilter =
      filter === 'all'
        ? true
        : filter === 'fav'
        ? l.fav
        : l.occasion === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="toolbar">
        <h2 className="section-title">
          My <span>Glam Looks</span>
        </h2>
        <div className="toolbar-right">
          <select
            className="filter-select"
            value={filter}
            onChange={e => onFilterChange(e.target.value)}
          >
            <option value="all">All Looks</option>
            <option value="fav">Favorites Only</option>
            {OCCASIONS.map(o => (
              <option key={o} value={o}>
                {o.charAt(0).toUpperCase() + o.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
          <button className="btn-primary" onClick={onNew}>
            + New Look
          </button>
        </div>
      </div>

      <div className="cards-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💄</div>
            <p>No looks found. Create your first glam look!</p>
          </div>
        ) : (
          filtered.map(look => (
            <LookCard
              key={look.id}
              look={look}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleFav={onToggleFav}
            />
          ))
        )}
      </div>
    </div>
  );
}
