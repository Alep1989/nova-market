import React from 'react'
import './cart.css'

export default function Cart({ items, onRemove }){
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
  return (
    <aside className="cart">
      <h2>Carrito</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {items.map(it => (
            <li key={it.id} className="cart-item">
              <img src={it.image} alt={it.title} />
              <div>
                <div className="title">{it.title}</div>
                <div className="qty">Cantidad: {it.quantity}</div>
                <div className="price">${(it.price * it.quantity).toFixed(2)}</div>
              </div>
              <button onClick={() => onRemove(it.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">Total: ${total.toFixed(2)}</div>
    </aside>
  )
}
