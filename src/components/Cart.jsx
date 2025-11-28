import React from 'react'
import { formatPrice } from '../utils/formatPrice'

export default function Cart({ items, onRemove, onUpdateQuantity }) {
  const subtotal = items.reduce((s, i) => s + (Number(i.precio) || 0) * (i.quantity || 1), 0)

  const handleQuantityChange = (id, delta) => {
    const item = items.find(i => i.id === id)
    const newQuantity = item.quantity + delta
    if (newQuantity >= 1) {
      onUpdateQuantity(id, newQuantity)
    }
  }

  return (
    <div className="container py-4">
      <h2 className="h3 mb-4">Carrito de Compras</h2>

      {items.length === 0 ? (
        <div className="alert alert-info">
          <p className="mb-0">El carrito está vacío</p>
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart Items Section */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                {items.map(it => (
                  <div key={it.id} className="d-flex gap-3 align-items-center pb-3 mb-3 border-bottom">
                    {it.imagen ? (
                      <img src={it.imagen} alt={it.nombre || 'Producto'} className="rounded" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                    ) : (
                      <div className="rounded bg-light d-flex align-items-center justify-content-center small text-center" style={{ width: '80px', height: '80px' }}>
                        {(it.nombre || '???').substring(0, 3)}
                      </div>
                    )}

                    <div className="flex-grow-1">
                      <div className="fw-bold mb-1">{it.nombre || 'Producto sin nombre'}</div>
                      <div className="text-primary fw-bold">{formatPrice(it.precio)}</div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(it.id, -1)}
                        className="btn btn-sm btn-outline-secondary"
                        disabled={it.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="fw-bold px-2" style={{ minWidth: '30px', textAlign: 'center' }}>
                        {it.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(it.id, 1)}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-end" style={{ minWidth: '100px' }}>
                      <div className="fw-bold text-primary mb-2">
                        {formatPrice((Number(it.precio) || 0) * (it.quantity || 1))}
                      </div>
                      <button
                        onClick={() => onRemove(it.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h5 className="card-title mb-3">Resumen del Pedido</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                  <span>Envío:</span>
                  <span className="text-success fw-bold">GRATIS</span>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <span className="h5 mb-0">Total:</span>
                  <span className="h4 mb-0 text-primary fw-bold">{formatPrice(subtotal)}</span>
                </div>

                <button className="btn btn-primary w-100 btn-lg">
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
