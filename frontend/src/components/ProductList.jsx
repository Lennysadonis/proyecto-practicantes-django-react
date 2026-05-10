import { useEffect, useState } from "react"
import { getAllProducts, deleteProduct } from "../api/products"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

export function ProductList() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  async function loadProducts() {
    const res = await getAllProducts()
    setProducts(res.data)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = async (id) => {
    const accepted = window.confirm("¿Estás seguro de eliminar este producto?")
    if (accepted) {
      await deleteProduct(id)
      toast.success('Producto eliminado', {
        position: "bottom-right",
        style: { background: "#333", color: "#fff" }
      })
      loadProducts()
    }
  }

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50', fontFamily: 'sans-serif', margin: 0 }}>📦 Inventario de Productos</h2>
        <span style={{ backgroundColor: '#3498db', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '14px' }}>
          {products.length} artículos
        </span>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px' 
      }}>
        {products.map(product => (
          <div 
            key={product.id} 
            onClick={() => navigate(`/productos/${product.id}`)}
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              padding: '20px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              border: '1px solid #eee'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ color: '#2c3e50', marginTop: 0, borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
              {product.nombre}
            </h3>
            <p style={{ color: '#7f8c8d', fontSize: '14px', height: '40px', overflow: 'hidden' }}>
              {product.descripcion || "Sin descripción disponible."}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>
                ${product.precio}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(product.id)
                }}
                style={{ 
                  backgroundColor: '#e74c3c', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}