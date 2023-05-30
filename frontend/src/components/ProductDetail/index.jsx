import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function ProductDetail() {
    const {id} = useParams() // get the ID from the URL
    const [product, setProduct] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [newRating, setNewRating] = useState(0)
    const [activeTab, setActiveTab] = useState('details')

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/product/${id}`)
                setProduct(response.data)
                setComments(response.data.comments)
            } catch (error) {
                console.error('Error fetching product detail:', error)
            }
        }

        fetchProductDetail()
    }, [id])

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`http://localhost:3001/product/${id}`, {
                comment: newComment,
                rating: newRating,
            })

            setComments([...comments, response.data.comment])

            setNewComment('')
            setNewRating(0)

            const updatedProduct = {...product}
            updatedProduct.totalComments = response.data.totalComments
            updatedProduct.averageRating = response.data.averageRating

            setProduct(updatedProduct)
        } catch (error) {
            console.error('Error submitting comment:', error)
        }
    }

    if (!product) {
        return <div>Loading...</div>
    }

    let totalComments = comments.length

    const calculateAverageRating = (comments) => {
        if (comments.length === 0) {
            return 'No ratings yet'
        }

        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0)
        const averageRating = parseInt(totalRating / comments.length)

        return `${averageRating}`
    }

    return (
        <div className="flex justify-center items-center min-h-screen my-8">
            <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
                <img src={product.image} alt={product.name} className="w-full mb-4 rounded-lg" />
                <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                <p className="text-lg mb-4">{product.description}</p>
                <p className="text-lg font-bold mb-2">Price: {product.price}</p>
                <p className="text-lg mb-2">Arrival Date: {product.arrivalDate}</p>
                <p className="text-lg mb-2">Total Comments: {totalComments}</p>
                <div className="flex items-center mt-2">
                    <p className="text-lg mb-2">Average Rating: </p>
                    <span className="text-yellow-500 inline-flex text-lg mb-2 mr-2">
                        {Array.from({length: calculateAverageRating(comments)}).map((_, index) => (
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
                    <p className="text-lg mb-2">{calculateAverageRating(comments)}</p>
                </div>
                <div className="my-4">
                    <ul className="flex border-b">
                        <li className="-mb-px mr-1">
                            <button
                                className={`bg-transparent hover:bg-blue-600 hover:text-white text-blue-500 font-semibold py-2 px-4 border-b-2 ${
                                    activeTab === 'details'
                                        ? 'border-blue-500'
                                        : 'border-transparent'
                                }`}
                                onClick={() => handleTabClick('details')}
                            >
                                Details
                            </button>
                        </li>
                        <li className="-mb-px mr-1">
                            <button
                                className={`bg-transparent hover:bg-blue-600 hover:text-white text-blue-500 font-semibold py-2 px-4 border-b-2 ${
                                    activeTab === 'comments'
                                        ? 'border-blue-500'
                                        : 'border-transparent'
                                }`}
                                onClick={() => handleTabClick('comments')}
                            >
                                Comments
                            </button>
                        </li>
                    </ul>
                    <div>
                        {activeTab === 'details' && (
                            <div className="mt-4">
                                <p>{product.details}</p>
                            </div>
                        )}
                        {activeTab === 'comments' && (
                            <div className="mt-4">
                                <ul>
                                    {comments.map((comment) => (
                                        <li key={comment.id} className="mb-2">
                                            <p>{comment.username}</p>
                                            <p>{comment.comment}</p>
                                            <p>{comment.rating} stars</p>
                                        </li>
                                    ))}
                                </ul>
                                <form onSubmit={handleCommentSubmit} className="mt-4">
                                    {/* Comment Form */}
                                    <div className="mb-4">
                                        <label htmlFor="comment" className="block mb-2 font-medium">
                                            Comment:
                                        </label>
                                        <textarea
                                            id="comment"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            className="border border-gray-300 rounded-md p-2 w-full h-32 resize-none focus:outline-none focus:ring focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="rating" className="block mb-2 font-medium">
                                            Rating:
                                        </label>
                                        <select
                                            id="rating"
                                            value={newRating}
                                            onChange={(e) => setNewRating(parseInt(e.target.value))}
                                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                                            required
                                        >
                                            <option value={0}>Select Rating</option>
                                            <option value={1}>1 Star</option>
                                            <option value={2}>2 Stars</option>
                                            <option value={3}>3 Stars</option>
                                            <option value={4}>4 Stars</option>
                                            <option value={5}>5 Stars</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
