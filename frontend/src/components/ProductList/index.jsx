import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function ProductList() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            console.log('User not logged in')
            navigate('/login')
            return
        }

        // Set the Authorization header with the token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products`)
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
    }, [navigate])

    return (
        <div className="container mx-auto pb-8">
            <h1 className="text-2xl font-bold my-4">Product List</h1>
            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border border-gray-300 rounded p-4">
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="flex flex-col justify-between"
                        >
                            <img src={product.image} alt={product.name} className="w-full mb-2" />
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-gray-600">${product.price}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-yellow-500 inline-flex">
                                    {Array.from({length: product.score}).map((_, index) => (
                                        <svg
                                            key={index}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18.832 8.843l-5.742-.834L10 2.269 7.91 8.01 2.167 8.843l4.148 4.035-.978 5.694L10 15.063l5.664 2.506-.978-5.694 4.148-4.035z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ))}
                                </span>
                                <span className="text-gray-600 ml-1">{product.score}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList
