import { NavLink } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
  return (
    <nav className="nm-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        Inicio
      </NavLink>
      <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active' : ''}>
        Contacto
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
        Carrito
      </NavLink>
    </nav>
  )
}
