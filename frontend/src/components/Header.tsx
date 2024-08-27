import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthData } from '../context/AuthContext'

const Header = () => {

    const {setToken} = useAuthData();
    const navigate = useNavigate()


    const handleLogout = () => {
        setToken(null);
        navigate('/');
    }

  return (
    <header className="bg-dark text-white py-3">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="h4">MyApp</h1>
                    <nav>
                        <ul className="nav">
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" to="/">All Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" to="/user-product">Your Product</NavLink>
                            </li>
                            <li className="nav-item">
                            <span className="nav-link text-white" onClick={handleLogout}>Logout</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
  )
}

export default Header
