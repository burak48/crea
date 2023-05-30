import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const resetForm = () => {
        setUsername('')
        setPassword('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username,
                password,
            })

            if (response.status === 200) {
                const {token} = response.data
                localStorage.setItem('token', token)
                navigate('/home')
            } else {
                console.log('Authentication failed')
            }
        } catch (error) {
            console.log('An error occurred:', error)
        } finally {
            resetForm()
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white p-8 rounded shadow" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
