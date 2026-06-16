const API_URL = 'https://fakestoreapi.com/products'

export async function getProducts() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los productos.')
  }

  return response.json()
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('No se pudo cargar el producto.')
  }

  return response.json()
}
