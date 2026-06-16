import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../../api/fakeStore'
import { useCart } from '../../contexts/CartContext'
import './ProductDetailPage.css'

function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    let active = true
    setLoading(true)
    setError(null)

    getProduct(Number(id))
      .then((data) => {
        if (active) setProduct(data)
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Error al cargar el producto.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="product-detail">
        <p className="status-message">Cargando producto...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-detail">
        <p className="status-message error">{error || 'Producto no encontrado.'}</p>
        <Link to="/" className="back-link">Volver al catalogo</Link>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">&larr; Volver al catalogo</Link>

      <div className="detail-content">
        <img src={product.image} alt={product.title} className="detail-image" />

        <div className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <button
            type="button"
            className="product-button"
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
