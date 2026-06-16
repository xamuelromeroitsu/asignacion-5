import { useState, useEffect, useCallback } from 'react'
import { getProducts } from '../api/fakeStore'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Hubo un error al cargar los productos.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { products, loading, error, retry: fetchData }
}
