import React, { useState } from 'react'
import { Link, useLocation} from 'react-router-dom'

const Header = () => {
    const location = useLocation(); // Get current route
  const [selectedLink, setSelectedLink] = useState(location.pathname); 


    const handleLinkChange = (linkName) => {
        setSelectedLink(linkName)
        
    }
    return (
        <div className='w-screen h-[10vh] flex justify-center items-center '>
            <nav className='flex justify-between fixed  items-center px-20 h-[8vh] rounded-full   bg-blue-400 w-[60%] mx-auto'>
                <div className="logo">
                    <Link to="/" className='text-2xl font-bold italic lowercase '>Dee_Lolade</Link>
                </div>
                <ul className="nav-links flex space-x-4 " >
                    <li><Link to='/' onClick={() => { handleLinkChange("/") }} className={`text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-3xl ${selectedLink === "/" ? "bg-white text-blue-400" : ""}`}> Dashboard</Link></li>
                    <li><Link to='/sign-in' onClick={() => { handleLinkChange("/sign-in") }} className={`text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-3xl ${selectedLink === "/sign-in" ? "bg-white  text-blue-400" : ""}`}> Sign In </Link></li>
                    <li><Link to='/sign-up' onClick={() => { handleLinkChange("/sign-up") }} className={`text-white hover:bg-white hover:text-blue-500 py-2 px-4 rounded-3xl ${selectedLink === "/sign-up" ? "bg-white  text-blue-400" : ""}`}> Sign Up </Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
