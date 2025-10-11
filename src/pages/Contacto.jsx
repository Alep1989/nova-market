import { useState } from 'react'
import './contacto.css'

export default function Contacto(){
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate(){
    const e = {}
    if(!form.name.trim()) e.name = 'Nombre es requerido'
    if(!form.phone.trim()) e.phone = 'Teléfono es requerido'
    else if(!/^[0-9]+$/.test(form.phone)) e.phone = 'Teléfono debe contener sólo números'
    if(!form.email.trim()) e.email = 'Email es requerido'
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if(!form.message.trim()) e.message = 'Mensaje es requerido'
    return e
  }

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e){
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if(Object.keys(v).length === 0){
      setSubmitted(true)
      setForm({ name: '', phone: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <main className="contact-page">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit} noValidate className="contact-form">
        <label>
          Nombre
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <div className="error">{errors.name}</div>}
        </label>

        <label>
          Teléfono
          <input name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </label>

        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <div className="error">{errors.email}</div>}
        </label>

        <label>
          Mensaje
          <textarea name="message" value={form.message} onChange={handleChange} />
          {errors.message && <div className="error">{errors.message}</div>}
        </label>

        <button type="submit">Enviar</button>
        {submitted && <div className="success">Mensaje enviado correctamente</div>}
      </form>
    </main>
  )
}
