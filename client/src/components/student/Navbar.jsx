import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();  //  Use useNavigate directly
    const location = useLocation();  //  Use useLocation to get pathname
    const { isEducator, backendurl, setEducator, getToken} = useContext(AppContext);
    const iscourselistpage = location.pathname.includes('/Courselist');

    const { openSignIn } = useClerk();
    const { user } = useUser();

    const becomeEducator = async ()=>{
        try{
            if(isEducator){
                navigate('/educator')
                return;
            }

            const token = await getToken()
            const { data } = await axios.get(backendurl + `/api/educator/update-role`, {headers: 
                {Authorization: `Bearer ${token}` }})

                if(data.success){
                    setEducator(true)
                    toast.success(data.message)
                }else{
                    toast.error(data.message)
                }

        } catch (error){
            toast.error(error.message)

        }
    }

    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b
        border-gray-500 py-4 ${iscourselistpage ? 'bg-white' : 'bg-cyan-100/70'}`}>
            
            
            <img 
                onClick={() => navigate('/')} 
                src='Sudemy' 
                alt="Sudemy" 
                className="w-28 lg:w-32 cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-full" 
            />
            
            <div className="hidden md:flex items-center gap-5 text-gray-500">
                <div className="flex items-center gap-5">
                    {user && (
                        <>
                           <button onClick={() => navigate('/educator')}>
                                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
                            </button>
                            | <Link to="/Myenrolment">My Enrollment</Link>
                        </>
                    )}
                </div>

                {user ? (
                    <UserButton />
                ) : (
                    <button 
                        onClick={() => openSignIn()} 
                        className="bg-blue-600 text-white px-5 py-2 rounded-full">Create Account</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
