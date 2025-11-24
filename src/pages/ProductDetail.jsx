<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetail({ onAdd }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://692477473ad095fb847450fd.mockapi.io/productos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado')
        return res.json()
      })
      .then(data => setProduct(data))
      .catch(err => setError(err.message || 'Error'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Cargando producto...</p>
  if (error) return <p>Error: {error}</p>
  if (!product) return null

  return (
    <article>
      <h2>{product.nombre}</h2>
      {product.imagen ? (
        <img src={product.imagen} alt={product.nombre} style={{ maxWidth: 200 }} />
      ) : (
        <div style={{ maxWidth: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc' }}>
          {product.nombre}
        </div>
      )}
      <p>{product.detalle}</p>
      <p>Precio: ${product.precio}</p>
      <button onClick={() => onAdd(product)}>Agregar al carrito</button>
    </article>
  )
}
=======
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetail({ onAdd }){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if(!res.ok) throw new Error('Producto no encontrado')
        return res.json()
      })
      .then(data => setProduct(data))
      .catch(err => setError(err.message || 'Error'))
      .finally(() => setLoading(false))
  }, [id])

  if(loading) return <p>Cargando producto...</p>
  if(error) return <p>Error: {error}</p>
  if(!product) return null

  return (
    <article>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{maxWidth:200}} />
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <button onClick={() => onAdd(product)}>Agregar al carrito</button>
    </article>
  )
}

>>>>>>> 20fbfeed492d95954dedfb3d16f74ce02d4ae96e
