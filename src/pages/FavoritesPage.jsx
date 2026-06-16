import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useFavorites } from '../hooks/useFavorites'
import { useCart } from '../contexts/CartContext'
import ProductCard from '../components/ProductCard/ProductCard'
import Skeleton from '../components/Skeleton/Skeleton'
import './FavoritesPage.css'

function FavoritesPage() {
  const { products, loading } = useProducts()
  const { favorites, isFavorite, toggleFavorite } = useFavorites()
  const { addToCart } = useCart()

  const favoriteProducts = products.filter((p) => favorites.includes(p.id))

  if (loading) {
    return (
      <div className="favorites-page">
        <h1>Mis Favoritos</h1>
        <div className="products-grid">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="favorites-page">
        <div className="favorites-empty">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <h2>Aún no tienes favoritos</h2>
          <p>Agrega productos a tus favoritos haciendo clic en la estrella de cada producto.</p>
          <Link to="/" className="product-button">Ver catálogo</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-page">
      <h1>Mis Favoritos</h1>
      <p>{favoriteProducts.length} producto(s) guardado(s)</p>
      <div className="products-grid" style={{ marginTop: '20px' }}>
        {favoriteProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={isFavorite(product.id)}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage
