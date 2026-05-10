import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createProduct, getProduct, updateProduct } from '../api/products'
import { useNavigate, useParams } from 'react-router-dom'

export function ProductForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const navigate = useNavigate()
    const params = useParams() // Aquí capturamos el ID de la URL si existe

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            // Si hay ID en la URL, estamos editando
            await updateProduct(params.id, data)
        } else {
            // Si no hay ID, estamos creando
            await createProduct(data)
        }
        navigate('/productos')
    })

    useEffect(() => {
        async function loadProduct() {
            if (params.id) {
                // Si hay un ID, pedimos los datos de ese producto a Django
                const res = await getProduct(params.id)
                // Llenamos el formulario con los datos recibidos
                setValue('nombre', res.data.nombre)
                setValue('descripcion', res.data.descripcion)
                setValue('precio', res.data.precio)
            }
        }
        loadProduct()
    }, [params.id, setValue])

    return (
        <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>{params.id ? "Editar Producto" : "Crear Producto"}</h2>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Nombre del producto"
                    {...register("nombre", { required: true })}
                    style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                {errors.nombre && <span style={{ color: 'red' }}>El nombre es obligatorio</span>}

                <textarea 
                    placeholder="Descripción"
                    {...register("descripcion")}
                    style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
                ></textarea>

                <input 
                    type="text" 
                    placeholder="Precio"
                    {...register("precio", { required: true })}
                    style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                {errors.precio && <span style={{ color: 'red' }}>El precio es obligatorio</span>}

                <button style={{ width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {params.id ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </div>
    )
}