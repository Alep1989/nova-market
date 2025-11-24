import React from 'react'

export default function Cart({ items, onRemove }) {
  const total = items.reduce((s, i) => s + i.precio * i.quantity, 0)
  return (
    <aside className="card shadow-sm p-3 mb-4">
      <h2 className="h4 mb-3">Carrito</h2>
      {items.length === 0 ? (
        <p className="text-muted">El carrito está vacío</p>
      ) : (
        <ul className="list-group list-group-flush">
          {items.map(it => (
            <li key={it.id} className="list-group-item d-flex gap-3 align-items-center px-0">
              {it.imagen ? (
                <img src={it.imagen} alt={it.nombre} className="rounded" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
              ) : (
                <div className="rounded bg-light d-flex align-items-center justify-content-center small text-center" style={{ width: '48px', height: '48px' }}>
                  {it.nombre.substring(0, 3)}
                </div>
              )}
              <div>
                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{it.nombre}</div>
                <div className="text-muted small">Cantidad: {it.quantity}</div>
                <div className="text-primary fw-bold">${(it.precio * it.quantity).toFixed(2)}</div>
              </div>
              <button onClick={() => onRemove(it.id)} className="btn btn-sm btn-outline-danger ms-auto">Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <div className="h5 mt-3 text-end border-top pt-2">Total: ${total.toFixed(2)}</div>
    </aside>
  )
}
