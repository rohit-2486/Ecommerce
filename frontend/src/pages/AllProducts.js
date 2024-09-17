import React, { useEffect, useState } from 'react'
import UploadProduct from '../component/UploadProduct'
import summaryApi from '../common';
import AdminProductCard from '../component/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct , setOpenUploadProduct] = useState(false);
  const [allProduct , setAllProduct] = useState([]);

  const fetchAllProduct = async() =>{

    const response = await fetch(summaryApi.allProduct.url)
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data);
  }

  useEffect(() =>{
    fetchAllProduct();
  },[]);

  return (
    <div>
        <div className='bg-white py-2 px-4 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>
            All Products
          </h1>
          <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3 rounded-full transition-all ' onClick={() => setOpenUploadProduct(true)}>
            upload Products
          </button>
        </div>

        <div className='flex items-center gap-5 py-4'>
        {
          allProduct.map((product ,index) =>{
              return (
                  <AdminProductCard data={product} key={index}  fetchData={fetchAllProduct}/>
              )
          })
        }

        </div>
 

        {/* upload Products component */}

        {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)}/>
          )
        }
        

    </div>
  )
}

export default AllProducts