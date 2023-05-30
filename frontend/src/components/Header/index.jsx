import {useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'

function Header() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <div>
            <header className="bg-gray-100 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link to={localStorage.getItem('token') ? '/home' : '/login'}>CREA</Link>
                </h1>
                {localStorage.getItem('token') && (
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </header>
        </div>
    )
}

export default Header
