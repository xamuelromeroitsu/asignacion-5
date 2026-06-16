import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../hooks/useFavorites'
import { useTheme } from '../../contexts/ThemeContext'
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

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function Header() {
  const { cartCount } = useCart()
  const { favoritesCount } = useFavorites()
  const { theme, toggleTheme } = useTheme()
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
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
        >
          <span className="theme-toggle-icon">
            {theme === 'light' ? <SunIcon /> : <MoonIcon />}
          </span>
        </button>
      </nav>
    </header>
  )
}

export default Header
