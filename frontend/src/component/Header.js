import React, { useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/common';

export const Header = () => {

    const [menuDisplay, setMenuDisplay] = useState(false);

    const dispatch = useDispatch();

    const user = useSelector(state => state?.user?.user)
    // console.log("user header ", user);

    const handleLogout = async () => {
        const fetchData = await fetch(summaryApi.logout_user.url, {
            method: summaryApi.logout_user.method,
            credentials: 'include'
        })
        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
        }
        if (data.error) {
            toast.error(data.message);
        }
    }


    return (
        <header className='h-16 shadow-md bg-white'>
            <div className='container mx-auto h-full flex items-center px-3 justify-between'>
                <div className=''>
                    <Link to={"/"}>
                        <Logo w={90} h={50} />
                    </Link>
                </div>

                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                    <input placeholder='search items... ' type='text' className='w-full outline-none ' />

                    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full'>
                        <FaSearch />
                    </div>
                </div>

                <div className='flex items-center gap-6'>

                    <div className='relative flex justify-center'>

                        {
                            user?._id && (
                                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve )}>
                            {
                                user?.profilePic ? (
                                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                                ) : (
                                    <FaUserCircle />
                                )
                            }
                        </div>

                            )
                        }

                        

                        {
                            menuDisplay && (
                                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={"admin-panel/all-products"} className='whitespace-nowrap p-2 hidden md:block hover:bg-slate-100' onClick={() => setMenuDisplay(preve => !preve )} >
                                                Admin Panel
                                            </Link>
                                            )
                                        }
                                        
                                    </nav>
                                </div>
                            )
                        }


                    </div>

                    <div className='text-2xl relative'>
                        <span><FaShoppingCart /></span>

                        <div className='bg-red-600 text-white h-5 w-5  flex justify-center rounded-full pb-2 absolute -top-2 -right-3 '>
                            <p className='text-sm'>0</p>
                        </div>

                    </div>

                    <div>
                        {
                            user?._id ? (

                                <button onClick={handleLogout} className='bg-red-600 px-3 py-1 text-white rounded-full hover:bg-red-700'>Logout</button>

                            ) : (
                                <Link to={"/login"}>
                                    <button className='bg-red-600 px-3 py-1 text-white rounded-full hover:bg-red-700'>Login</button>
                                </Link>
                            )
                        }

                    </div>
                </div>

            </div>
        </header>
    )
}
