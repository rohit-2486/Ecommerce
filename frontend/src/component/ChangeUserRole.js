import React, { useState } from 'react'
import ROLE from '../common/common'
import { IoMdClose } from "react-icons/io";
import summaryApi from '../common';
import { toast } from 'react-toastify';
// import { FaBackspace } from "react-icons/fa";

const ChangeUserRole = ({
    name,
    email,
    role,
    onclose,
    userId,
    callfunc,
}) => {
    
    const [userRole , setUserRole] = useState(role)
    


    const handleUserSelect = ((e) =>{
        setUserRole(e.target.value);
        console.log(e.target.value);
    })

    const UpdateUserRole = async() =>{

        const fetchResponse = await fetch(summaryApi.userUpdate.url,{
            method: summaryApi.userUpdate.method,
            credentials: 'include',
            headers: {
                "content-type" : "application/json" 
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })
        const data  = await fetchResponse.json();

        if(data.success){
            toast.success(data.message);
            callfunc();
            onclose();
        }

        console.log("role updated",data);

    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-100 bg-opacity-40'>
            <div className='mx-auto bg-white shadow-md p-2 w-full max-w-sm'>
                <button className='block ml-auto ' onClick={onclose}>
                    <IoMdClose/>
                </button>
                <h1 className='pb-3 text-lg font-medium' >Change user Role</h1>

                <p>Name: {name}</p>
                <p>email:{email}</p>

                <div className='flex justify-between items-center my-3'>
                    <p>Role: </p>

                    <select className='border px-4 py-1' value={userRole} onChange={handleUserSelect}>

                        {
                            Object.values(ROLE).map(e => {
                                return (
                                    <option value={e} key={e}>{e}</option>
                                )
                            })
                        }

                    </select>
                </div>

                <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 hover:bg-red-700 text-white' onClick={UpdateUserRole}>Change ROLE </button>


            </div>
        </div>

    )
}

export default ChangeUserRole