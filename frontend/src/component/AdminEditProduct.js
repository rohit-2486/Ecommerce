import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { IoCloudUploadSharp } from "react-icons/io5";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import summaryApi from '../common';
import {toast} from 'react-toastify'

const AdminEditProduct = ({
    productData,
    onClose,
    fetchData
}) => {

    const [data , setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice,
    })

    const [openFullScreenImage , setOpenFullScreenImage] = useState(false)
    const [fullScreenImage , setFullScreenImage] = useState("")

    const handleOnChange = (e)=>{
        const {name , value} = e.target;

        setData(((preve) =>{
            return {
                ...preve,
                [name] : value
            }
        }))

    }

    const handleUploadProduct = async(e)=>{
        const file = e.target.files[0]
       const uploadImageCloudinary = await uploadImage(file);
         setData((preve)=>{
            return {
                ...preve,
                productImage : [...preve.productImage , uploadImageCloudinary.url]
            }
         }) 
    }

    const handleDeleteProductImage = async(index)=>{
        // console.log("image index", index);

        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1);

        setData((preve)=>{
            return{
                ...preve,
                productImage: [...newProductImage]
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // console.log("user data ", data)

        const response = await fetch(summaryApi.updateProduct.url,{
            method: summaryApi.updateProduct.method,
            credentials: 'include',
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify(data) 
        })

        const responseData = await response.json();

        if(responseData.success){
            toast.success(responseData?.message);
            onClose() 
            fetchData()
        }

        if(responseData.error){
            toast.error(responseData?.message);
        } 

    }
  return (
    <div>
         <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 z-10 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className=' flex justify-between items-center pb-3 '>
                
                <div className='font-bold text-xl'>Edit Product</div>
                <button className='hover:bg-red-600 font-bold text-xl' onClick={onClose}>
                    <IoMdClose/>
                </button>
            </div>

            <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-10' onSubmit={handleSubmit}>
                 
                     <label htmlFor='productName' className='mt-3'>Product Name :</label>
                <input 
                type='text' 
                id='productName'
                placeholder='enter product name '
                name='productName'
                value={data.productName} 
                onChange={handleOnChange}
                className='p-2 border-2 rounded-md bg-slate-100'
                required
                />

                <label htmlFor='brandName' className='mt-3'>BrandName :</label>
                <input 
                type='text' 
                id='brandName'
                placeholder='enter brand name '
                name='brandName'
                value={data.brandName} 
                onChange={handleOnChange}
                className='p-2 border-2 rounded-md bg-slate-100'
                required
                />

                <label htmlFor='category' className='mt-3'>category :</label>
                
                <select 
                name='category'
                required
                value={data.category} 
                onChange={handleOnChange}
                className='p-2 border-2 rounded-md bg-slate-100'>
                     <option value={""}  >select category</option>
                
                {
                    productCategory.map((e , index)=>{
                        return(
                            <option value={e.value} key={e.value+index} >{e.label}</option>
                        )
                    })
                }

                </select>

                <label htmlFor='productImage' className='mt-3'>productImage :</label>
                <label htmlFor='uploadImageInput'>
                <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center '>
                  <div className='text-slate-500 flex justify-center items-center flex-col  gap-2 '>
                        <span className='text-4xl cursor-pointer'>
                        <IoCloudUploadSharp/>
                        </span>
                        <p className='text-sm'>upload Product image</p>
                        <input 
                          type='file' 
                          id='uploadImageInput' 
                          className='hidden' 
                          onChange={handleUploadProduct}
                        />
                     </div> 
                </div>
                </label>

                <div>

                    {
                      data?.productImage[0] ? (
                       <div className='flex items-center gap-2'>
                            {
                                 data.productImage.map((e , index) =>{
                                    return (
                                        <div key={index} className='relative group'>
                                       <img 
                                        src={e} 
                                        alt={e} 
                                        width={80} 
                                        height={80} 
                                        className='bg-slate-100 border cursor-pointer'
                                        onClick={()=>{
                                            setOpenFullScreenImage(true)
                                            setFullScreenImage(e)
                                        }}
                                        />

                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=> handleDeleteProductImage(index)}>
                                            <MdDelete/>
                                        </div>
                                        
                                        </div>
                                       
                                    ) 
                                })
                            }
                       </div>
                    )  : (
                        <p className='text-red-600 text-xs '>*Please upload product image</p>
                    ) 
                    }

                   
                </div>


                <label htmlFor='price' className='mt-3'>price :</label>
                <input 
                type='number' 
                id='price'
                placeholder='enter price '
                name='price'
                value={data.price} 
                onChange={handleOnChange}
                className='p-2 border-2 rounded-md bg-slate-100'
                required
                />


                <label htmlFor='sellingPrice' className='mt-3'>selling Price :</label>
                <input 
                type='number' 
                id='sellingPrice'
                placeholder='enter selling Price '
                name='sellingPrice'
                value={data.sellingPrice} 
                onChange={handleOnChange}
                className='p-2 border-2 rounded-md bg-slate-100'
                required
                />
                

                <label htmlFor='description' className='mt-3'>Description:</label>
                <textarea 
                value={data.description}
                name='description'
                className='h-28 bg-slate-100 p-2 border-2 resize-none' 
                placeholder='enter Product description'
                onChange={handleOnChange}
                required
                ></textarea>
               
                    <button className='px-3 py-2 bg-red-600 text-white mb-5 mt-5 hover:bg-red-800 hover:text-black rounded-md'>update Product</button>

            </form>

        </div>

        {
            openFullScreenImage && (
                <DisplayImage onClose={()=> setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
            )
        }

       
    </div>
    </div>
  )
}

export default AdminEditProduct