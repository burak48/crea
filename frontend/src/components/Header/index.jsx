import {useNavigate} from 'react-router-dom'

function Header() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
    }

    return (
        <div>
            <header className="bg-gray-100 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">CREA</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </header>
        </div>
    )
}

export default Header
