export default function Header({ search, onSearch, view, onViewChange }) {
  return (
    <header>
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">💄</span>
          <span className="logo-text">Pink Glam Planner</span>
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search looks..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
        <div className="header-actions">
          <div className="tabs">
            <button
              className={`tab-btn${view === 'looks' ? ' active' : ''}`}
              onClick={() => onViewChange('looks')}
            >
              My Looks
            </button>
            <button
              className={`tab-btn${view === 'products' ? ' active' : ''}`}
              onClick={() => onViewChange('products')}
            >
              Products
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
