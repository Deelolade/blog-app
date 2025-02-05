import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <nav className='flex justify-around'>
                <div className="logo">
                    <Link to="/">Dee_Lolade</Link>
                </div>
                <ul className="nav-links flex space-x-4 " >
                    <li><Link to="/"> Dashboard</Link></li>
                    <li><Link to="/sign-in"> Sign In </Link></li>
                    <li><Link to="/sign-up"> Sign Up </Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
