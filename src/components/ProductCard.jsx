import { Link } from 'react-router-dom'
import './productcard.css'

export default function ProductCard({ product, onAdd }){
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="card-link">
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="product-info">
        <h3>
          <Link to={`/product/${product.id}`} className="card-link-title">{product.title}</Link>
        </h3>
        <p className="price">${product.price}</p>
        <button onClick={() => onAdd(product)}>Agregar</button>
      </div>
    </article>
  )
}
