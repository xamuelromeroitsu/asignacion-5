import './ProductCard.css'

function ProductCard({ product, onAddToCart, isFavorite, onToggleFavorite }) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="product-image" />
        <button
          type="button"
          className={`fav-button ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(product.id)}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <div className="product-content">
        <p className="product-category">{product.category}</p>
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            type="button"
            className="product-button"
            onClick={() => onAddToCart(product)}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
