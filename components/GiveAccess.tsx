'use client';
import { AccessGive, AllEmployee } from '@/actions/admin/adminform'
import { AccessType, PropsAuth } from '@/constants';
import { QueryClient, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast' 
import { FiLoader } from "react-icons/fi";
 
const GiveAccess = () => {
  const client = new QueryClient()
  const { isPending, data } = useQuery({
    queryKey: ['fetchEmp' ,client],
    queryFn: () => AllEmployee(), 
    staleTime: 2000
    })  

  const giveAccess = async(city:string, id:number) => { 
    
    // const res:AccessType = await AccessGive(city,email)
    // if(res?.status === 200){
    //   toast.success('Access given');
    // }
    // else{
    //   toast.error('Failed to give access');
    // }
    console.log(city,id)
  }
  const [chageCity, setChangeCity] =  useState<string>()

  console.log(chageCity)
  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col '>
    <h1 className=' font-bold text-3xl text-center'>Give access</h1>

     { isPending ? <div className=' flex items-center justify-center text-2xl gap-2'> <FiLoader className=' animate-spin' />  </div>  :
          <div className=' border-2 border-[#ffffff3c] w-full rounded-2xl overflow-y-auto '>
          <div className=' w-full h-14 border-b-2 border-[#ffffff3c] grid grid-cols-3  p-3'>
                <h2>Email</h2>
                <h2>City</h2>
                <h2>Action</h2>
            </div>
            { data && data?.map((emp:PropsAuth) => (
                <div key={emp.id} className=' w-full p-3 items-center justify-center pb-3 border-b-2 border-[#ffffff3c] grid grid-cols-3'>
                <input className="w-72 rounded-xl bg-transparent inputbg p-2 " type="email" name="email" defaultValue={emp?.email} readOnly /> 
               
                <select required name="city" onChange={(e)=>{giveAccess(e.target.value , emp?.id); setChangeCity(e.target.value)}} defaultValue={emp?.city} className=' rounded-xl bg-transparent w-40 border-2 border-[#ffffff3c] p-2'>
                  <option value="balasore">balasore</option>
                  <option value="keonjhar">keonjhar</option>
                  <option value="jajpur">jajpur</option>
                  <option value="baripada">baripada</option>
                  <option value="Bhadrak">Bhadrak</option>
                </select>
 

                { chageCity != emp?.city ? <button type="submit" className='buttonbg p-2 px-4 w-40 rounded-lg'>Give Access</button> :
                <button type="submit" disabled={chageCity !== emp?.city} className=' disabled:cursor-not-allowed disabled:bg-gray-500 buttongreen p-2 px-4 w-40 rounded-lg'>Give Access</button>  
                }
            </div>
              ))
            }  
          </div> 
     }
    </div>
  )
}

export default GiveAccess