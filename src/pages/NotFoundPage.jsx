import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page-content not-found">
      <h1>404</h1>
      <p>Pagina no encontrada</p>
      <Link to="/" className="product-button">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFoundPage
