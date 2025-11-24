import { useState, useEffect } from "react"

export default function Admin() {
    const [products, setProducts] = useState([])
    const [form, setForm] = useState({
        nombre: '', detalle: '', imagen: '', precio: ''
    })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    function fetchProducts() {
        fetch('https://692477473ad095fb847450fd.mockapi.io/productos')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err))
    }

    function validate() {
        const e = {}
        if (!form.nombre.trim()) e.nombre = 'Nombre es requerido'
        if (!form.detalle.trim()) e.detalle = 'Detalle es requerido'
        if (!form.imagen.trim()) e.imagen = 'Imagen es requerido'
        if (!form.precio.trim()) e.precio = 'Precio es requerido'
        return e
    }

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    function openAddModal() {
        setForm({ nombre: '', detalle: '', imagen: '', precio: '' })
        setEditingId(null)
        setErrors({})
        setShowModal(true)
    }

    function handleEdit(product) {
        setForm({
            nombre: product.nombre,
            detalle: product.detalle,
            imagen: product.imagen,
            precio: product.precio
        })
        setEditingId(product.id)
        setErrors({})
        setShowModal(true)
    }

    function handleDelete(id) {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return

        fetch(`https://692477473ad095fb847450fd.mockapi.io/productos/${id}`, {
            method: 'DELETE'
        })
            .then(() => fetchProducts())
            .catch(err => console.error(err))
    }

    function handleSubmit(e) {
        e.preventDefault()
        const v = validate()
        setErrors(v)
        if (Object.keys(v).length === 0) {
            const method = editingId ? 'PUT' : 'POST'
            const url = editingId
                ? `https://692477473ad095fb847450fd.mockapi.io/productos/${editingId}`
                : 'https://692477473ad095fb847450fd.mockapi.io/productos'

            fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
                .then(() => {
                    setSubmitted(true)
                    fetchProducts()
                    setShowModal(false)
                    setTimeout(() => setSubmitted(false), 3000)
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <main className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Panel de Administración</h3>
                <button className="btn btn-success" onClick={openAddModal}>Agregar Producto Nuevo</button>
            </div>

            {submitted && <div className="alert alert-success">Operación exitosa</div>}

            <div className="row g-3">
                {products.map(p => (
                    <div key={p.id} className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-body d-flex align-items-center gap-3">
                                {p.imagen ? (
                                    <img src={p.imagen} alt={p.nombre} style={{ width: '115px', height: '115px', objectFit: 'cover' }} className="rounded" />
                                ) : (
                                    <div className="rounded bg-light d-flex align-items-center justify-content-center text-center p-2" style={{ width: '115px', height: '115px' }}>
                                        {p.nombre}
                                    </div>
                                )}
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">{p.nombre}</h5>
                                    <p className="mb-1 text-muted small">{p.detalle}</p>
                                    <div className="fw-bold text-primary">${p.precio}</div>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(p)}>Editar</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Manual Implementation */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editingId ? 'Editar Producto' : 'Agregar Producto'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input name="nombre" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} value={form.nombre} onChange={handleChange} />
                                        {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción</label>
                                        <input name="detalle" className={`form-control ${errors.detalle ? 'is-invalid' : ''}`} value={form.detalle} onChange={handleChange} />
                                        {errors.detalle && <div className="invalid-feedback">{errors.detalle}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Imagen (URL)</label>
                                        <input name="imagen" className={`form-control ${errors.imagen ? 'is-invalid' : ''}`} value={form.imagen} onChange={handleChange} />
                                        {errors.imagen && <div className="invalid-feedback">{errors.imagen}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Precio</label>
                                        <input name="precio" className={`form-control ${errors.precio ? 'is-invalid' : ''}`} value={form.precio} onChange={handleChange} />
                                        {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
                                    </div>
                                    <div className="d-flex justify-content-end gap-2">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary">{editingId ? 'Guardar Cambios' : 'Agregar'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}