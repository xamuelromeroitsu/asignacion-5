import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import './Header.css'

function Header() {
  const { cartCount } = useCart()
  const { pathname } = useLocation()

  const linkClass = (path) => (pathname === path ? 'active' : '')

  return (
    <header className="site-header">
      <Link to="/" className="site-logo">LunaShop</Link>

      <nav className="site-nav">
        <Link to="/" className={linkClass('/')}>Inicio</Link>
        <Link to="/about" className={linkClass('/about')}>Sobre nosotros</Link>
        <Link to="/contact" className={linkClass('/contact')}>Contacto</Link>
        <Link to="/" className="cart-link" aria-label="Carrito de compras">
          Carrito
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </nav>
    </header>
  )
}

export default Header
