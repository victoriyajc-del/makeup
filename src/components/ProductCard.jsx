export default function ProductCard({ name, looks }) {
  const visibleLooks = looks.slice(0, 4);
  const extraCount = looks.length - 4;

  return (
    <div className="product-card">
      <div className="product-card-name">{name}</div>
      <div className="product-card-usage">
        Used in {looks.length} look{looks.length !== 1 ? 's' : ''}
      </div>
      <div className="product-card-looks">
        {visibleLooks.map((lookName, i) => (
          <span key={i} className="look-ref">{lookName}</span>
        ))}
        {extraCount > 0 && (
          <span className="look-ref">+{extraCount}</span>
        )}
      </div>
    </div>
  );
}
