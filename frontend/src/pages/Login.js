import React, { useContext, useState } from 'react'
import loginGif from '../assest/signin.gif'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {

    const [showPassword , setShowPassword ] = useState(false)
    const [data , setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const {fetchUserDetails} = useContext(Context); 

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const dataResponse = await fetch(summaryApi.signIn.url , {
            method : summaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type" : "application/json"
            }, 
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
           toast.success(dataApi.message);
           navigate('/'); 
        fetchUserDetails();
        }
        if(dataApi.error){
            toast.error(dataApi.msg);
        }
    }

    const handleOnChange = (e) =>{
        const {name , value } = e.target;

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
        }
        // console.log("data login", data)

  return (
    <section id='login'>
        <div className='container mx-auto p-4'>
            
            <div className='bg-white mx-auto py-5 p-4 w-full max-w-sm rounded '>
                
                <div className='w-20 h-20 mx-auto '>
                    <img src={loginGif} alt='login icons'></img>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                    <div className='grid'>
                        <label>Email : </label>
                        <div  className='bg-slate-100 p-2'>
                            <input
                                 type='email'
                                  placeholder='enter email'
                                  value={data.email}
                                  name='email'
                                  onChange={handleOnChange}
                                  className='w-full h-full outline-none bg-transparent ' />
                        </div> 
                    </div>

                    <div >
                        <label>password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type= {showPassword ? "text" : 'password'} 
                                placeholder='enter password'
                                value={data.password}
                                name='password'
                                onChange={handleOnChange}
                                 className='w-full h-full outline-none bg-transparent'  />
                            <div className='cursor-pointer ' onClick={()=> setShowPassword((preve)=> !preve)}>
                                <span >
                                    {
                                       
                                       showPassword ? (
                                            <FaEyeSlash/>
                                        ):
                                        (
                                            <IoEyeSharp/>
                                        )
                                    }
                                </span>
                            </div>

                        </div>
                                <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600' > 
                                    Forgot password ?
                                </Link>

                    </div>

                    <button className='bg-red-600 px-6 py-2 w-full max-w-[150px] text-white mt-4 rounded-full hover:bg-red-800 hover:scale-105 text-xl  transition-all mx-auto block'>Login</button>

                </form>
                    
                    <p className='my-5'>Don't have account ? <Link to={"/sing-up"} className='text-red-500 hover:underline hover:text-red-700'>Sing-up</Link>  </p>

            </div>

        </div>
    </section>
  )
}

export default Login