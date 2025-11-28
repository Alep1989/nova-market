import { useState } from 'react'
import Swal from 'sweetalert2'

export default function Contacto() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Nombre es requerido'
    if (!form.phone.trim()) e.phone = 'Teléfono es requerido'
    else if (!/^[0-9]+$/.test(form.phone)) e.phone = 'Teléfono debe contener sólo números'
    if (!form.email.trim()) e.email = 'Email es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.message.trim()) e.message = 'Mensaje es requerido'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length === 0) {
      setSubmitted(true)
      setForm({ name: '', phone: '', email: '', message: '' })
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Nos pondremos en contacto contigo a la brevedad.',
        confirmButtonColor: '#4f46e5'
      })
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <main className="container py-4">
      <h2 className="mb-4">Contacto</h2>
      <form onSubmit={handleSubmit} noValidate className="mx-auto" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={form.name} onChange={handleChange} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={form.phone} onChange={handleChange} />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={form.email} onChange={handleChange} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea name="message" className={`form-control ${errors.message ? 'is-invalid' : ''}`} value={form.message} onChange={handleChange} rows="4" />
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </main>
  )
}
