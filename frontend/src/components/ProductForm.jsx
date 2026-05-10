import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createProduct, getProduct, updateProduct } from '../api/products'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast' // <--- Importamos las notificaciones

export function ProductForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const navigate = useNavigate()
    const params = useParams()

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (params.id) {
                // Modo Edición
                await updateProduct(params.id, data)
                toast.success('¡Producto actualizado con éxito! 🚀', {
                    position: "bottom-right",
                    style: { background: "#333", color: "#fff" }
                })
            } else {
                // Modo Creación
                await createProduct(data)
                toast.success('¡Producto creado correctamente! ✨', {
                    position: "bottom-right",
                    style: { background: "#333", color: "#fff" }
                })
            }
            navigate('/productos')
        } catch (error) {
            toast.error('Hubo un error al procesar la solicitud ❌')
            console.error(error)
        }
    })

    useEffect(() => {
        async function loadProduct() {
            if (params.id) {
                const res = await getProduct(params.id)
                setValue('nombre', res.data.nombre)
                setValue('descripcion', res.data.descripcion)
                setValue('precio', res.data.precio)
            }
        }
        loadProduct()
    }, [params.id, setValue])

    return (
        <div style={{ 
            maxWidth: '450px', 
            margin: '40px auto', 
            padding: '30px', 
            border: '1px solid #ddd', 
            borderRadius: '12px', 
            background: '#ffffff', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
        }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px', fontFamily: 'sans-serif' }}>
                {params.id ? "✏️ Editar Producto" : "➕ Nuevo Producto"}
            </h2>

            <form onSubmit={onSubmit}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#555' }}>Nombre:</label>
                <input 
                    type="text" 
                    placeholder="Ej: Aceite Sintético 10W40"
                    {...register("nombre", { required: true })}
                    style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
                {errors.nombre && <span style={{ color: 'red', fontSize: '13px' }}>El nombre es obligatorio</span>}

                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#555', marginTop: '10px' }}>Descripción:</label>
                <textarea 
                    placeholder="Escribe los detalles aquí..."
                    {...register("descripcion")}
                    style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '100px', boxSizing: 'border-box' }}
                ></textarea>

                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#555' }}>Precio ($):</label>
                <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    {...register("precio", { required: true })}
                    style={{ display: 'block', width: '100%', marginBottom: '20px', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
                {errors.precio && <span style={{ color: 'red', fontSize: '13px' }}>El precio es obligatorio</span>}

                <button style={{ 
                    width: '100%', 
                    padding: '14px', 
                    background: params.id ? '#007bff' : '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background 0.3s'
                }}>
                    {params.id ? "Actualizar Cambios" : "Guardar Producto"}
                </button>
            </form>
        </div>
    )
}