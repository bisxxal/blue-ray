'use client';
import { AccessGive, AllEmployee } from '@/actions/admin/adminform'
import { AccessType, PropsAuth } from '@/constants';
import { QueryClient, useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast' 
import { FiLoader } from "react-icons/fi";
 
const GiveAccess = () => {
  const client = new QueryClient()
  const { isPending, isLoading, data } = useQuery({
    queryKey: ['fetchEmp' ,client],
    queryFn: () => AllEmployee(), 
    staleTime: 2000
    })  

  const giveAccess = async(formData:FormData) => { 
    const city = formData.get('city') as string
    const email = formData.get('email') as string
    const res:AccessType = await AccessGive(city,email)
    if(res?.status === 200){
      toast.success('Access given');
    }
    else{
      toast.error('Failed to give access');
    }
  }
  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col '>
    <h1 className=' font-bold text-3xl text-center'>Give access</h1>

     { isPending   ? <div className=' flex items-center justify-center text-2xl gap-2'> <FiLoader className=' animate-spin' />  </div>  :
          <div className=' border-2 border-[#ffffff3c] w-full rounded-2xl overflow-y-auto '>
      
          <div className=' w-full h-14 border-b-2 border-[#ffffff3c] grid grid-cols-3  p-3'>
                <h2>Email</h2>
                <h2>City</h2>
                <h2>Action</h2>
            </div>
            
            {
             data && data?.map((emp:PropsAuth) => (
                <form key={emp.id} action={giveAccess} className=' w-full p-3 items-center justify-center pb-3 border-b-2 border-[#ffffff3c] grid grid-cols-3'>
                <input className="w-72 rounded-xl bg-transparent inputbg p-2 " type="email" name="email" defaultValue={emp?.email} /> 
               
                <select required name="city" defaultValue={emp?.city} className=' rounded-xl bg-transparent w-40 border-2 border-[#ffffff3c] p-2'>
                  <option value="bhubaneswar">bhubaneswar</option>
                  <option value="jajpur">jajpur</option>
                  <option value="cuttack">cuttack</option>
                  <option value="Baleswar">Baleswar</option>
                </select>
      
                <button type="submit" className=' buttongreen p-2 px-4 w-40 rounded-lg'>Give Access</button>  
            </form>
              ))
            }  
          </div> 
     }
    

    </div>
  )
}

export default GiveAccess