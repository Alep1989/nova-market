import { useState } from 'react'
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
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function handleRemove(id){
    setCartItems(prev => prev.filter(p => p.id !== id))
  }

  return (
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
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
