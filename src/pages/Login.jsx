import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login({ onSuccess }) {
  const { login } = useAuth();
  const [usser, setUsser] = useState('');
  const [password, setPasswrd] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('User:', usser, 'Password:', password);

    fetch('https://692477473ad095fb847450fd.mockapi.io/usuarios')
      .then(res => res.json())
      .then(users => {
        const foundUser = users.find(u => u.usuario === usser && u.password === password);
        if (foundUser) {
          login(foundUser.usuario);
          onSuccess();
        } else {
          alert('Credenciales incorrectas');
        }
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        alert('Error al iniciar sesión');
      });
  };

  return (
    <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="usser" className="form-label">Usuario: </label>
          <input
            type="text"
            id="usser"
            className="form-control"
            value={usser}
            onChange={(e) => setUsser(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña: </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPasswrd(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
      </form>
    </div>
  );
}