import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from "react-router-dom";

const Navbar = () => {
    const educationData = dummyEducatorData
    const { user } = useUser()
    return (
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3 ">
            <Link to='/'>
            <img 
                onClick={() => navigate('/')} 
                src='Sudemy' 
                alt="Sudemy" 
                className="w-28 lg:w-32 cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-full" />
            </Link>
            <div className="flex items-center gap-5 text-gray-500 relative">
                <p>Hi! {user ? user.fullName : 'Developers'}</p>
                {user ? <UserButton /> : <img className="max-w-8" src={assets.profile_img } />}
            </div>
        </div>
    )
}

export default Navbar