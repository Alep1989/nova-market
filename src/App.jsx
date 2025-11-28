import { useState } from 'react'
import Swal from 'sweetalert2'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './components/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme.css';

function AppContent() {
  const [cartItems, setCartItems] = useState([])

  function handleAdd(product) {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
      return [...prev, { ...product, quantity: 1 }]
    })

    Swal.fire({
      icon: 'success',
      title: '¡Agregado!',
      text: 'Producto agregado al carrito',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    })
  }

  function handleRemove(id) {
    setCartItems(prev => prev.filter(p => p.id !== id))
  }

  function handleUpdateQuantity(id, newQuantity) {
    setCartItems(prev => prev.map(p =>
      p.id === id ? { ...p, quantity: newQuantity } : p
    ))
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <div className="nm-container">
        <AppRoutes
          cartItems={cartItems}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </div>
      <Footer />
    </BrowserRouter>
  )
}

import { ThemeProvider } from './context/ThemeContext';
import { ProductsProvider } from './context/ProductsContext';

function App() {

  return (
    <ThemeProvider>
      <ProductsProvider>
        <AuthProvider Ingreso={<AppContent />} />
      </ProductsProvider>
    </ThemeProvider>
  )
}

export default App