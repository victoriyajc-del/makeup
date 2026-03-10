export default function StatsBar({ looks }) {
  const total = looks.length;
  const favs = looks.filter(l => l.fav).length;
  const uniqueProducts = new Set(
    looks.flatMap(l => l.products.map(p => p.trim().toLowerCase()))
  ).size;

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <div className="stat-icon">💄</div>
        <div className="stat-info">
          <div className="stat-num">{total}</div>
          <div className="stat-label">Total Looks</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">❤️</div>
        <div className="stat-info">
          <div className="stat-num">{favs}</div>
          <div className="stat-label">Favorites</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">💊</div>
        <div className="stat-info">
          <div className="stat-num">{uniqueProducts}</div>
          <div className="stat-label">Products Tracked</div>
        </div>
      </div>
    </div>
  );
}
