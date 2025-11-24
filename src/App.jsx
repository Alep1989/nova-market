import { useState } from 'react'
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
  }

  function handleRemove(id) {
    setCartItems(prev => prev.filter(p => p.id !== id))
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <div className="nm-container">
        <AppRoutes
          cartItems={cartItems}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </div>
      <Footer />
    </BrowserRouter>
  )
}

import { ThemeProvider } from './context/ThemeContext';

function App() {

  return (
    <ThemeProvider>
      <AuthProvider Ingreso={<AppContent />} />
    </ThemeProvider>
  )
}

export default App