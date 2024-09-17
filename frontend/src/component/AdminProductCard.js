import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({
    data,
    fetchData
}) => {

    const [editProduct , setEditProduct ] = useState(false);

  return (
    <div className='bg-white rounded-md p-3 border-2'>
        <img src={data?.productImage[0]} width={120} height={120} />
        <h1 className=''> {data?.productName} </h1>

        <div className='w-fit ml-auto bg-green-100 p-2 rounded-full hover:bg-green-600 hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
            <MdModeEditOutline/>
        </div>

        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=> setEditProduct(false)}  fetchData={fetchData}/>
          )
        }

        
    </div>
    
   
  )
}

export default AdminProductCard