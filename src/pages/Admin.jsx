import { useProducts } from '../context/ProductsContext'
import { useState } from "react"
import Swal from 'sweetalert2'
import { formatPrice } from '../utils/formatPrice'

export default function Admin() {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts()
    const [form, setForm] = useState({
        nombre: '', detalle: '', imagen: '', precio: ''
    })
    const [errors, setErrors] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState(null)

    function validate() {
        const e = {}
        if (!form.nombre.trim()) e.nombre = 'Nombre es requerido'

        // Validación de descripción: mínimo 10 caracteres
        if (!form.detalle.trim()) {
            e.detalle = 'Detalle es requerido'
        } else if (form.detalle.trim().length < 10) {
            e.detalle = 'El detalle debe tener al menos 10 caracteres'
        }

        if (!form.imagen.trim()) e.imagen = 'Imagen es requerido'

        // Validación de precio: debe ser un número mayor a 0
        if (!form.precio.trim()) {
            e.precio = 'Precio es requerido'
        } else {
            const precioNum = parseFloat(form.precio)
            if (isNaN(precioNum)) {
                e.precio = 'El precio debe ser un número válido'
            } else if (precioNum <= 0) {
                e.precio = 'El precio debe ser mayor a 0'
            }
        }

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

    async function handleDelete(id) {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        })

        if (!result.isConfirmed) return

        console.log('Eliminando producto con ID:', id)
        const deleteResult = await deleteProduct(id)
        console.log('Resultado de eliminación:', deleteResult)

        if (deleteResult.success) {
            Swal.fire(
                '¡Eliminado!',
                'El producto ha sido eliminado.',
                'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al eliminar producto: ${deleteResult.error || 'Error desconocido'}`
            })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const v = validate()
        setErrors(v)
        if (Object.keys(v).length === 0) {
            const result = editingId
                ? await updateProduct(editingId, form)
                : await addProduct(form)

            if (result.success) {
                setShowModal(false)
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: editingId ? 'Producto actualizado correctamente' : 'Producto agregado correctamente',
                    timer: 2000,
                    showConfirmButton: false
                })
            } else {
                setErrors({ submit: result.error })
            }
        }
    }

    return (
        <main className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Panel de Administración</h3>
                <button className="btn btn-success" onClick={openAddModal}>Agregar Producto Nuevo</button>
            </div>

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
                                    <div className="fw-bold text-primary">{formatPrice(p.precio)}</div>
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
                                        <input
                                            name="precio"
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                                            value={form.precio}
                                            onChange={handleChange}
                                        />
                                        {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
                                    </div>
                                    {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
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