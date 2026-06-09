const API_URL = 'https://fakestoreapi.com/products'

export async function getProducts() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los productos.')
  }

  return response.json()
}

export async function fetchProducts() {
  return getProducts()
}
