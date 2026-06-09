import { useEffect, useMemo, useState } from 'react'
import { getProducts } from './api/fakeStore'
import ProductCard from './components/ProductCard/ProductCard'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState({})
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const cartItems = useMemo(() => Object.values(cart), [cart])
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )
  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems],
  )

  const categories = useMemo(
    () => ['all', ...new Set(products.map((product) => product.category))],
    [products],
  )

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [products, query, category])

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart[product.id]

      return {
        ...currentCart,
        [product.id]: {
          product,
          quantity: existingItem ? existingItem.quantity + 1 : 1,
        },
      }
    })
  }

  useEffect(() => {
    let active = true

    const loadProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getProducts()

        if (active) {
          setProducts(data)
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Hubo un error al cargar los productos.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <main className="app-shell">
        <header className="hero-banner">
          <p className="eyebrow">Catalogo comercial</p>
          <h1 className="hero-title">LunaShop</h1>
          <p className="hero-copy">Cargando tu catálogo premium...</p>
        </header>
        <p className="status-message">Cargando productos...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="app-shell">
        <header className="hero-banner">
          <p className="eyebrow">Catalogo comercial</p>
          <h1 className="hero-title">LunaShop</h1>
          <p className="hero-copy">Algo salió mal al cargar tu tienda. Reintenta para continuar.</p>
        </header>
        <p className="status-message error">⚠️ Hubo un error: {error}</p>
        <button type="button" className="product-button" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header className="hero-banner">
        <p className="eyebrow">Catalogo comercial</p>
        <h1 className="hero-title">LunaShop</h1>
        <p className="hero-copy">
          Busca por nombre o categoría para encontrar exactamente lo que necesitas en el catálogo.
        </p>

        <div className="hero-controls">
          <label className="field-group">
            <span>Buscar</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ej. jacket, electronics, men..."
            />
          </label>

          <label className="field-group">
            <span>Categoría</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === 'all' ? 'Todas las categorías' : item}
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
              <p>{filteredProducts.length} artículo(s) encontrado(s)</p>
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

            <p className="cart-summary">{cartCount} artículo(s) agregado(s)</p>

            {cartItems.length === 0 ? (
              <p className="empty-cart">Aún no agregaste productos al carrito.</p>
            ) : (
              <ul className="cart-list">
                {cartItems.map(({ product, quantity }) => (
                  <li key={product.id} className="cart-item">
                    <div>
                      <strong>{product.title}</strong>
                      <p>{quantity} x ${product.price.toFixed(2)}</p>
                    </div>
                    <span>${(product.price * quantity).toFixed(2)}</span>
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
    </main>
  )
}

export default App
