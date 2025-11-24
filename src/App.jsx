import { useState } from 'react'
<<<<<<< HEAD
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
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contacto from './pages/Contacto'
import ProductDetail from './pages/ProductDetail'
import Cart from './components/Cart'
import './styles/variables.css'
import './App.css'

function App(){
  const [cartItems, setCartItems] = useState([])

  function handleAdd(product){
    setCartItems(prev => {
      const exists = prev.find(p => p.id === product.id)
      if(exists) return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
>>>>>>> 20fbfeed492d95954dedfb3d16f74ce02d4ae96e
      return [...prev, { ...product, quantity: 1 }]
    })
  }

<<<<<<< HEAD
  function handleRemove(id) {
=======
  function handleRemove(id){
>>>>>>> 20fbfeed492d95954dedfb3d16f74ce02d4ae96e
    setCartItems(prev => prev.filter(p => p.id !== id))
  }

  return (
<<<<<<< HEAD
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <div className="nm-container">
        <AppRoutes
          cartItems={cartItems}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
=======
    <BrowserRouter>
      <Header />
      <div className="nm-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home onAdd={handleAdd} />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/product/:id" element={<ProductDetail onAdd={handleAdd} />} />
            <Route path="/cart" element={<Cart items={cartItems} onRemove={handleRemove} />} />
            <Route path="*" element={<main><h2>Página no encontrada</h2></main>} />
          </Routes>
        </div>
>>>>>>> 20fbfeed492d95954dedfb3d16f74ce02d4ae96e
      </div>
      <Footer />
    </BrowserRouter>
  )
}

<<<<<<< HEAD
import { ThemeProvider } from './context/ThemeContext';

function App() {

  return (
    <ThemeProvider>
      <AuthProvider Ingreso={<AppContent />} />
    </ThemeProvider>
  )
}

export default App
=======
export default App
>>>>>>> 20fbfeed492d95954dedfb3d16f74ce02d4ae96e
