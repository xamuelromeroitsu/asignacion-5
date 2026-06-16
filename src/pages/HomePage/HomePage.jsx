import { useState, useMemo } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { useCart } from '../../contexts/CartContext'
import ProductCard from '../../components/ProductCard/ProductCard'
import Skeleton from '../../components/Skeleton/Skeleton'
import './HomePage.css'

function HomePage() {
  const { products, loading, error, retry } = useProducts()
  const { cartItems, cartCount, cartTotal, addToCart, updateQuantity } = useCart()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const categories = useMemo(
    () => ['all', ...new Set(products.map((p) => p.category))],
    [products],
  )

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesQuery =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)

      return matchesCategory && matchesQuery
    })
  }, [products, query, category])

  if (loading) {
    return (
      <>
        <header className="hero-banner">
          <p className="eyebrow">Catalogo comercial</p>
          <h1 className="hero-title">LunaShop</h1>
          <p className="hero-copy">Cargando tu catálogo premium...</p>
        </header>
        <div className="products-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <header className="hero-banner">
          <p className="eyebrow">Catalogo comercial</p>
          <h1 className="hero-title">LunaShop</h1>
          <p className="hero-copy">Algo salio mal al cargar tu tienda. Reintenta para continuar.</p>
        </header>
        <p className="status-message error">Hubo un error: {error}</p>
        <button type="button" className="retry-button" onClick={retry}>
          Reintentar
        </button>
      </>
    )
  }

  return (
    <>
      <header className="hero-banner">
        <p className="eyebrow">Catalogo comercial</p>
        <h1 className="hero-title">LunaShop</h1>
        <p className="hero-copy">
          Busca por nombre o categoria para encontrar exactamente lo que necesitas en el catalogo.
        </p>

        <div className="hero-controls">
          <label className="field-group">
            <span>Buscar</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej. jacket, electronics, men..."
            />
          </label>

          <label className="field-group">
            <span>Categoria</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === 'all' ? 'Todas las categorias' : item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <div className="content-grid">
        <section className="catalog-column" aria-label="Listado de productos">
          <div className="section-heading">
            <h2>Productos</h2>
            <p>{filteredProducts.length} articulo(s) encontrado(s)</p>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </section>

        <aside className="cart-panel" aria-label="Resumen del carrito">
          <div className="cart-header">
            <p className="eyebrow">Carrito</p>
            <h2>Tu compra</h2>
          </div>

          <p className="cart-summary">{cartCount} articulo(s) agregado(s)</p>

          {cartItems.length === 0 ? (
            <p className="empty-cart">Aun no agregaste productos al carrito.</p>
          ) : (
            <ul className="cart-list">
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <div className="cart-item-info">
                    <strong>{product.title}</strong>
                    <p>${product.price.toFixed(2)} c/u</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="qty-value">{quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <span className="cart-line-total">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="cart-total-box">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </>
  )
}

export default HomePage
