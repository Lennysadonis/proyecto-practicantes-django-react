import { Link } from 'react-router-dom'

export function Header() {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem', 
      background: '#242424', 
      color: 'white',
      marginBottom: '20px' 
    }}>
      <Link to="/productos" style={{ color: 'white', textDecoration: 'none' }}>
        <h1>📦 Product App</h1>
      </Link>
      
      <div>
        <button style={{ padding: '10px 15px', cursor: 'pointer' }}>
          <Link to="/productos-crear" style={{ textDecoration: 'none', color: 'inherit' }}>
            Añadir Producto
          </Link>
        </button>
      </div>
    </nav>
  )
}