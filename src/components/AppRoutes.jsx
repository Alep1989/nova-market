import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contacto from '../pages/Contacto';
import Login from '../pages/Login';
import ProductDetail from '../pages/ProductDetail';
import Cart from './Cart';
import Admin from '../pages/Admin';
import RutaProtegida from './RutaProtegida';

export default function AppRoutes({ cartItems, onAdd, onRemove }) {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Home onAdd={onAdd} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/product/:id" element={<ProductDetail onAdd={onAdd} />} />
        <Route
          path="/cart"
          element={
            <RutaProtegida
              Ingreso={<Cart items={cartItems} onRemove={onRemove} />}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <RutaProtegida
              onlyAdmin={true}
              Ingreso={<Admin onAdd={onAdd} />}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<main><h2>Página no encontrada</h2></main>} />
      </Routes>
    </div>
  );
}