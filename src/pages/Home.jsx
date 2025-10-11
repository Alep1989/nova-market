import { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'

export default function Home({ onAdd }){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => setError(err.message || 'Error'))
      .finally(() => setLoading(false))
  }, [])

  if(loading) return <p>Cargando productos...</p>
  if(error) return <p>Error al cargar: {error}</p>

  return (
    <main>
      <h2>Productos</h2>
      <ProductList products={products} onAdd={onAdd} />
    </main>
  )
}

