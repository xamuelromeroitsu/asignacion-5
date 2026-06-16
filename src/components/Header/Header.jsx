import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const { pathname } = useLocation()

  const linkClass = (path) => (pathname === path ? 'active' : '')

  return (
    <header className="site-header">
      <Link to="/" className="site-logo">LunaShop</Link>

      <nav className="site-nav">
        <Link to="/" className={linkClass('/')}>Inicio</Link>
        <Link to="/about" className={linkClass('/about')}>Sobre nosotros</Link>
        <Link to="/contact" className={linkClass('/contact')}>Contacto</Link>
      </nav>
    </header>
  )
}

export default Header
