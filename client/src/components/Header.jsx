import { useEffect } from "react";
import React, { useState } from 'react'
import { Link, useLocation} from 'react-router-dom'
import {useSelector} from "react-redux";

const Header = () => {
    const location = useLocation(); // Get current route
  const [selectedLink, setSelectedLink] = useState(location.pathname); 
    const handleLinkChange = (linkName) => {
        setSelectedLink(linkName)
        
    }
    const { currentUser } = useSelector(state => state.user)
// const currentUser = useSelector(state => state.user);


    return (
        <div className='w-screen h-[10vh] flex justify-center items-center '>
            <nav className='flex justify-between fixed  items-center px-20 h-[8vh] rounded-full   bg-blue-400 w-[60%] mx-auto'>
                <div className="logo">
                    <Link to="/" className='text-2xl font-bold italic lowercase '>Dee_Lolade</Link>
                </div>
                <ul className="nav-links flex space-x-4  items-center justify-between" >
                    {currentUser ? (
                        <>
                    <li><Link to='/' onClick={() => { handleLinkChange("/") }} className={`text-white hover:bg-white hover:text-blue-400 py-2 px-4 rounded-3xl ${selectedLink === "/" ? " bg-black text-blue-500" : ""}`}> Dashboard</Link></li>
                        <Link to='/profile'><img src={currentUser.profilePicture} alt="" className='w-10 h-10 rounded-full' /></Link></>
                    ) : (
                        <>
                        <li><Link to='/sign-in' onClick={() => { handleLinkChange("/sign-in") }} className={`text-white hover:bg-white hover:text-blue-400 py-2 px-4 rounded-3xl ${selectedLink === "/sign-in" ? "bg-black  text-blue-500" : ""}`}> Sign In </Link></li>
                        <li><Link to='/sign-up' onClick={() => { handleLinkChange("/sign-up") }} className={`text-white hover:bg-white hover:text-blue-400 py-2 px-4 rounded-3xl ${selectedLink === "/sign-up" ? "bg-black  text-blue-500" : ""}`}> Sign Up </Link></li>
                        </>

                    )}
                    
                </ul>
            </nav>
        </div>
    )
}

export default Header
