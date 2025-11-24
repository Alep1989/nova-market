import React, { useState, useEffect } from 'react'
import ProductList from '../components/ProductList'
import { useProducts } from '../context/ProductsContext'

export default function Home({ onAdd }) {
  const { products, loading, error } = useProducts()

  // Estados para búsqueda, filtros y paginación
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('none') // 'none', 'price-asc', 'price-desc', 'name-asc', 'name-desc'
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return parseFloat(a.precio) - parseFloat(b.precio)
      case 'price-desc':
        return parseFloat(b.precio) - parseFloat(a.precio)
      case 'name-asc':
        return a.nombre.localeCompare(b.nombre)
      case 'name-desc':
        return b.nombre.localeCompare(a.nombre)
      default:
        return 0
    }
  })

  // Calcular paginación
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)

  // Resetear a página 1 cuando cambia la búsqueda o el filtro
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortBy])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error al cargar: {error}</p>

  return (
    <main className="container py-4">
      <h2 className="mb-4">Productos</h2>

      {/* Barra de búsqueda */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filtros de ordenamiento */}
        <div className="col-md-6">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="none">Sin ordenar</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
          </select>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mb-3">
        <small className="text-muted">
          Mostrando {paginatedProducts.length} de {sortedProducts.length} productos
          {searchTerm && ` (filtrado por "${searchTerm}")`}
        </small>
      </div>

      {/* Lista de productos */}
      {sortedProducts.length === 0 ? (
        <div className="alert alert-info">
          No se encontraron productos que coincidan con tu búsqueda.
        </div>
      ) : (
        <>
          <ProductList products={paginatedProducts} onAdd={onAdd} />

          {/* Paginación */}
          {totalPages > 1 && (
            <nav aria-label="Navegación de productos" className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1
                  // Mostrar solo páginas cercanas a la actual
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </li>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <li key={page} className="page-item disabled"><span className="page-link">...</span></li>
                  }
                  return null
                })}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </main>
  )
}
