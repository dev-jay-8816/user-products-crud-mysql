import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="h4">MyApp</h1>
                    <nav>
                        <ul className="nav">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/">All Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/user-product">Your Product</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link text-white" to="/add-product">Add Product</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
  )
}

export default Header
