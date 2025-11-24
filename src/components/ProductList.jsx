<<<<<<< HEAD
import ProductCard from './ProductCard'

export default function ProductList({ products, onAdd }) {
  if (!products) return null
  return (
    <section className="row g-4 mt-3">
      {products.map(p => (
        <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <ProductCard product={p} onAdd={onAdd} />
        </div>
      ))}
    </section>
  )
}
=======
import ProductCard from './ProductCard'
import './productlist.css'

export default function ProductList({ products, onAdd }){
  if(!products) return null
  return (
    <section className="product-list">
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </section>
  )
}
>>>>>>> 20fbfeed492d95954dedfb3d16f74ce02d4ae96e
