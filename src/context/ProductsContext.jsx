import { createContext, useContext, useState, useEffect } from 'react'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Cargar productos al montar el componente
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch('https://692477473ad095fb847450fd.mockapi.io/productos')
            if (!response.ok) throw new Error('Error al cargar productos')
            const data = await response.json()
            setProducts(data)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching products:', err)
        } finally {
            setLoading(false)
        }
    }

    const addProduct = async (productData) => {
        try {
            const response = await fetch('https://692477473ad095fb847450fd.mockapi.io/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            })
            if (!response.ok) throw new Error('Error al agregar producto')
            const newProduct = await response.json()
            setProducts(prev => [...prev, newProduct])
            return { success: true, product: newProduct }
        } catch (err) {
            console.error('Error adding product:', err)
            return { success: false, error: err.message }
        }
    }

    const updateProduct = async (id, productData) => {
        try {
            const response = await fetch(`https://692477473ad095fb847450fd.mockapi.io/productos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            })
            if (!response.ok) throw new Error('Error al actualizar producto')
            const updatedProduct = await response.json()
            setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p))
            return { success: true, product: updatedProduct }
        } catch (err) {
            console.error('Error updating product:', err)
            return { success: false, error: err.message }
        }
    }

    const deleteProduct = async (id) => {
        try {
            console.log('Intentando eliminar producto con ID:', id)
            const response = await fetch(`https://692477473ad095fb847450fd.mockapi.io/productos/${id}`, {
                method: 'DELETE'
            })
            console.log('Respuesta del servidor:', response.status, response.statusText)
            if (!response.ok) {
                const errorText = await response.text()
                console.error('Error del servidor:', errorText)
                throw new Error('Error al eliminar producto')
            }
            setProducts(prev => prev.filter(p => p.id !== id))
            console.log('Producto eliminado exitosamente')
            return { success: true }
        } catch (err) {
            console.error('Error deleting product:', err)
            return { success: false, error: err.message }
        }
    }

    const value = {
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct
    }

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductsContext)
    if (!context) {
        throw new Error('useProducts debe ser usado dentro de ProductsProvider')
    }
    return context
}
