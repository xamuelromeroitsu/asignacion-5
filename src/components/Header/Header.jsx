import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../hooks/useFavorites'
import './Header.css'

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function StarIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function Header() {
  const { cartCount } = useCart()
  const { favoritesCount } = useFavorites()
  const { pathname } = useLocation()

  const linkClass = (path) => (pathname === path ? 'active' : '')

  return (
    <header className="site-header">
      <Link to="/" className="site-logo">LunaShop</Link>

      <nav className="site-nav">
        <Link to="/" className={linkClass('/')}>Inicio</Link>
        <Link to="/about" className={linkClass('/about')}>Sobre nosotros</Link>
        <Link to="/contact" className={linkClass('/contact')}>Contacto</Link>
        <Link to="/favorites" className={`nav-icon-link ${linkClass('/favorites')}`} aria-label="Favoritos">
          <StarIcon filled={favoritesCount > 0} />
          {favoritesCount > 0 && <span className="nav-badge">{favoritesCount}</span>}
        </Link>
        <Link to="/" className="nav-icon-link" aria-label="Carrito de compras">
          <CartIcon />
          {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
        </Link>
      </nav>
    </header>
  )
}

export default Header
