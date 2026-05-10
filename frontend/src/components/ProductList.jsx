import { useEffect, useState } from "react"
import { getAllProducts, deleteProduct } from "../api/products"
import { useNavigate } from "react-router-dom"

export function ProductList() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  // Función para obtener los datos de la API
  async function loadProducts() {
    const res = await getAllProducts()
    setProducts(res.data)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Función para manejar el borrado
  const handleDelete = async (id) => {
    const accepted = window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    if (accepted) {
      await deleteProduct(id)
      loadProducts() // Recargamos la lista inmediatamente
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Productos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {products.map(product => (
          <div 
            key={product.id} 
            style={{ 
              border: '1px solid #ccc', 
              padding: '15px', 
              borderRadius: '8px',
              cursor: 'pointer' 
            }}
            onClick={() => navigate(`/productos/${product.id}`)} // Para editar después
          >
            <h3 style={{ margin: '0 0 10px 0' }}>{product.nombre}</h3>
            <p>{product.descripcion}</p>
            <p><strong>Precio:</strong> ${product.precio}</p>
            
            <button 
              onClick={(e) => {
                e.stopPropagation() // Evita que se dispare el click de edición
                handleDelete(product.id)
              }}
              style={{ 
                background: '#ff4d4d', 
                color: 'white', 
                border: 'none', 
                padding: '5px 10px', 
                borderRadius: '4px',
                cursor: 'pointer' 
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}