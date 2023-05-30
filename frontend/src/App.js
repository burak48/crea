import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'
import Header from './components/Header'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
