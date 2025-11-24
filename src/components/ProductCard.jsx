<<<<<<< HEAD
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product, onAdd }) {
  const { user } = useAuth();

  return (
    <article className="card h-100 shadow-sm border-0">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        {product.imagen ? (
          <img src={product.imagen} alt={product.nombre} className="card-img-top p-3" style={{ height: '200px', objectFit: 'contain' }} />
        ) : (
          <div className="d-flex align-items-center justify-content-center bg-light text-secondary p-3" style={{ height: '200px' }}>
            {product.nombre}
          </div>
        )}
      </Link>
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h6 mb-2">
          <Link to={`/product/${product.id}`} className="text-decoration-none text-dark stretched-link">{product.nombre}</Link>
        </h3>
        <p className="card-text fw-bold text-primary mb-3">${product.precio}</p>
        {user && (
          <button onClick={(e) => { e.preventDefault(); onAdd(product); }} className="btn btn-primary mt-auto w-100 position-relative" style={{ zIndex: 2 }}>
            Agregar
          </button>
        )}
      </div>
    </article>
  )
}
=======
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
>>>>>>> 20fbfeed492d95954dedfb3d16f74ce02d4ae96e
