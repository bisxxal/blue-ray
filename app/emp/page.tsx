'use client'
import { emailResend } from '@/actions/email/email'
import React from 'react'

const EmployeePage = () => {

  const send= async()=>{
    // await emailResend()
  }
  return (
    <div className=' w-full h-screen flex justify-center items-center'> 
      <button onClick={send} className=' p-5 buttonbg'> Send mail</button>
    </div>
  )
}

export default EmployeePage