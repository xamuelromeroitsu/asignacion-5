import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
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
