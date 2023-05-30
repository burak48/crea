import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import Star from '../Star'

function ProductList() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [navigate, token])

    useEffect(() => {
        // Set the Authorization header with the token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`)
                if (response.status === 200) {
                    setProducts(response.data)
                } else {
                    console.log('Failed to fetch products')
                }
            } catch (error) {
                console.log('An error occurred:', error)
            }
        }

        fetchProducts()
    }, [token])

    return (
        <>
            {token && (
                <div className="container mx-auto p-4 sm:pb-8">
                    <h1 className="text-2xl font-bold my-4">Product List</h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {products.map((product) => (
                            <div key={product.id} className="border border-gray-300 rounded p-4">
                                <Link
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                    className="flex flex-col justify-between"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full mb-2"
                                    />
                                    <h2 className="text-lg font-semibold">{product.name}</h2>
                                    <p className="text-gray-600">${product.price}</p>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-500 inline-flex">
                                            {Array.from({length: product.score}).map((_, index) => (
                                                <Star key={index} />
                                            ))}
                                        </span>
                                        <span className="text-gray-600 ml-1">{product.score}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductList
