import { Routes, Route, Navigate } from 'react-router-dom'
import { ProductList } from './components/ProductList'
import { ProductForm } from './components/ProductForm'
import { Header } from './components/Header'
import { Toaster } from 'react-hot-toast' // 1. Importar

function App() {
  return (
    <>
      <Header />
      <Toaster /> {/* 2. Colocar aquí */}
      <Routes>
        <Route path="/" element={<Navigate to="/productos" />} />
        <Route path="/productos" element={<ProductList />} />
        <Route path="/productos-crear" element={<ProductForm />} />
        <Route path="/productos/:id" element={<ProductForm />} />
      </Routes>
    </>
  )
}

export default App