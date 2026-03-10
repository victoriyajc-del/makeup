import ProductCard from './ProductCard.jsx';

export default function ProductsView({ looks }) {
  const productMap = {};
  looks.forEach(l => {
    l.products.forEach(p => {
      const key = p.trim().toLowerCase();
      if (!productMap[key]) {
        productMap[key] = { name: p, looks: [] };
      }
      productMap[key].looks.push(l.name);
    });
  });

  const entries = Object.values(productMap).sort((a, b) => b.looks.length - a.looks.length);

  return (
    <div>
      <div className="toolbar">
        <h2 className="section-title">
          Tracked <span>Products</span>
        </h2>
      </div>

      <div className="products-grid">
        {entries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💊</div>
            <p>No products tracked yet. Add some to your looks!</p>
          </div>
        ) : (
          entries.map((entry, i) => (
            <ProductCard key={i} name={entry.name} looks={entry.looks} />
          ))
        )}
      </div>
    </div>
  );
}
