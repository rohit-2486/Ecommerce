import React, { useEffect, useState } from 'react' 
import summaryApi from '../common/index';
import { toast } from 'react-toastify'
import moment from 'moment'
import { FaEdit } from "react-icons/fa"; 
import ChangeUserRole from '../component/ChangeUserRole';

const AllUsers = () => {
    const [allUser , setAllUser] = useState([]);
    const [openUpdateRole , setOpenUpdateRole] = useState(false);
    const [updateUserDetails , setUpdateUserDetails] = useState({
        name: "",
        email: "",
        role: "",
        _id: "",
    })
    
    const fetchAllUsers = async() =>{

        const fetchData = await fetch(summaryApi.allUser.url,{
            method: summaryApi.allUser.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json();
        // console.log("All user data", dataResponse);

        if(dataResponse.success){
            setAllUser(dataResponse.data);
        }
        if(dataResponse.error){
            toast.error(dataResponse.message);
        }
    }

    useEffect(() =>{
        fetchAllUsers();

    }, []);
  return (

    <div className='bg-white pb-4'>
        <table className='w-full userTable'>
            <thead> 
                <tr className='bg-black text-white'>

                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Update user</th>


                </tr>
                
          
            </thead>

            <tbody className=''>
                {
                    allUser.map((e , index) => {
                        return(
                            <tr key={e.id || index}>
                                <td>{index+1}</td>
                                <td>{e?.name}</td>
                                <td>{e?.email}</td>
                                <td>{e?.role}</td>
                                <td>{moment(e?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-200 p-2 rounded-full hover:bg-green-500 hover:text-white '
                                     onClick={()=>{
                                        setUpdateUserDetails(e)
                                        setOpenUpdateRole(true)
                                      }
                                     }>
                                        <FaEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
          
        </table>

        {
            openUpdateRole && (
                <ChangeUserRole
                 onclose={()=> setOpenUpdateRole(false)}
                 name={updateUserDetails.name}
                 email={updateUserDetails.email}
                 role={updateUserDetails.role}
                 userId={updateUserDetails._id}
                 callfunc={fetchAllUsers}
                 />
            )
        }

        
    </div>
  )
}

export default AllUsers