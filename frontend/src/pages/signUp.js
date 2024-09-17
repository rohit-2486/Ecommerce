import React, { useState } from 'react'
import loginGif from '../assest/signin.gif'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import summaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {

    const [showPassword , setShowPassword ] = useState(false)
    const [confirmShowPassword , setConfirmShowPassword] = useState(false)
    const [data , setData] = useState({
        email: "",
        password: "",
        name:"",
        confirmPassword:"",
        profilePic:""
        })

        const navigate = useNavigate()

        const handleSubmit = async (e) => {
            e.preventDefault();
        
            if (data.password === data.confirmPassword) {
                try {
                    const dataResponse = await fetch(summaryApi.signUP.url, {
                        method: summaryApi.signUP.method,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });
        
                    const dataApi = await dataResponse.json();
                    console.log("API Response:", dataApi);  
        
                    if (dataApi.success) {
                        toast.success(dataApi.message);
                        navigate("/login")
                    } else if (dataApi.error) {
                        toast.error(dataApi.msg || "An error occurred. Please try again.");
                    } else {
                        toast.error("Unexpected response from the server.");
                    }
                } catch (error) {
                    console.error("Error during signup:", error); 
                    toast.error("Failed to sign up. Please try again later.");
                }
            } else {
                console.log("Passwords do not match.");
                toast.error("Passwords do not match.");
            }
        };
        

    const handleOnChange = (e) =>{
        const {name , value } = e.target;

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
        }

        const handleUploadPic =async (e)=>{
            const file = e.target.files[0]

            const imagePic = await imageTobase64(file);
            console.log(imagePic)

            setData((preve) =>{
                return {
                    ...preve,
                    profilePic: imagePic
                }
            })
        }



  return (
    <section id='login'>
        <div className='container mx-auto p-4'>
            
            <div className='bg-white mx-auto py-5 p-4 w-full max-w-sm rounded '>
                
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full '>
                        <div>
                          <img src={data.profilePic || loginGif} alt='login icons'></img>
                        </div>
                       
                       <form>
                        <label>
                        <div className='text-xs opacity-80 bg-slate-200  pb-4 text-center absolute bottom-0 w-full cursor-pointer'>
                            upload photo
                        </div>
                        <input type='file' className='hidden' onChange={handleUploadPic}/>
                        </label>
                       
                       </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                <div className='grid'>
                        <label>Name : </label>
                        <div  className='bg-slate-100 p-2'>
                            <input
                                 type='text'
                                  placeholder='enter name'
                                  value={data.name}
                                  name='name'
                                  onChange={handleOnChange}
                                  required
                                  className='w-full h-full outline-none bg-transparent ' />
                        </div> 
                    </div>


                    <div className='grid'>
                        <label>Email : </label>
                        <div  className='bg-slate-100 p-2'>
                            <input
                                 type='email'
                                  placeholder='enter email'
                                  value={data.email}
                                  name='email'
                                  onChange={handleOnChange}
                                  required
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
                                required
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
                               

                    </div>

                    <div >
                        <label>confirm password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type= {confirmShowPassword ? "text" : 'password'} 
                                placeholder='enter confirm password'
                                value={data.confirmPassword}
                                name='confirmPassword'
                                onChange={handleOnChange}
                                required
                                 className='w-full h-full outline-none bg-transparent'  />
                            <div className='cursor-pointer ' onClick={()=> setConfirmShowPassword((preve)=> !preve)}>
                                <span >
                                    {
                                       
                                       confirmShowPassword ? (
                                            <FaEyeSlash/>
                                        ):
                                        (
                                            <IoEyeSharp/>
                                        )
                                    }
                                </span>
                            </div>

                        </div>
                               

                    </div>

                    <button className='bg-red-600 px-6 py-2 w-full max-w-[150px] text-white mt-4 rounded-full hover:bg-red-800 hover:scale-105 text-xl  transition-all mx-auto block'>SignUp</button>

                </form>
                    
                    <p className='my-5'>Already have account ? <Link to={"/login"} className='text-red-500 hover:underline hover:text-red-700'>Login</Link>  </p>

            </div>

        </div>
    </section>
  )
}

export default SignUp