import Dowload from '@/components/Download'
import Link from 'next/link'
import React from 'react'

const Complain = () => {
  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col px-4'>
      <div className=' flex items-center justify-between w-full'>   
      <h1>User's complaint</h1>
      <Link href={'/admin/complain/receipt'} className='p-2 rounded-2xl inputbg'>Go to Receipt Download page</Link>
      </div>
      <div className=' w-full border-2 border-[#ffffff3c]  rounded-3xl  py-3'> 
      <div className=' border-b-2 border-[#ffffff3c] w-full mx-auto flex items-center justify-between p-4'>  
        <h2>Email</h2>
        <h2>city</h2>
        <h2>complaint id</h2>
        <h2>status</h2>
        <h2>Action</h2>
      </div>

      <div className='  w-full mt-5 !border-b flex items-center inputbg justify-between p-4 px-2 rounded-xl'>  
        <h2>bishal@gmail.com</h2>
        <h2>Bhubaneswar</h2>
        <h2>67543675</h2>
        <select required name="status" className=' rounded-xl bg-transparent w-40 border-2 border-[#ffffff3c] p-2'>
                  <option value="pending">pending</option>
                  <option value="Closed">Closed</option>
                  <option value="New">New</option> 
                </select>
                <button className=' buttongreen w-24 flex items-center justify-between h-12'>
        <Link href={'/admin/complain/receipt/1'} className=''>Form</Link>
                </button>
      </div>

      </div>      
    </div>
  )
}

export default Complain