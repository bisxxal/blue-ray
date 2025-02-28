'use client';
import EmpIncomePage from '@/app/emp/income/page';
import React, { useState } from 'react'

const page = () => {
      const [selectedEmail, setSelectedEmail] = useState<string>('bbgudul@gmail.com');
  return (
  <div className=" w-full h-screen ">
    <h1 className=" text-4xl font-bold textbase mt-10 text-center"> Users revenue </h1>

    <div className="flex text-lg justify-center items-center my-10  gap-4 mb-6">
        <p>Selected employee</p>
        <select className=" px-6"  onChange={(e)=>setSelectedEmail(e.target.value)} >
        <option value="bbgudul@gmail.com">bbgudul@gmail.com</option>
        <option value="bishalkandi859494@gmail.com">bishalkandi859494@gmail.com</option>
        <option value="bisxgugu7012@gmail.com">bisxgugu7012@gmail.com</option>
        </select>
</div>

<EmpIncomePage selectedEmail={selectedEmail} />
</div> 
  )
}

export default page