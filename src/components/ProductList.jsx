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
