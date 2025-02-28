'use client'
 
import AllJobSheet from '@/components/AllJobSheet'
import React, { useState } from 'react'
import Jobsheet from '@/components/CreateJobsheet'

const Form = () => {
  const [showJobsheet , setShowJobsheet] = useState(false)
  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col '>    
    <div className=" bg-zinc-900 w-fit  mx-auto flex gap-4 rounded-full overflow- ">
    <button onClick={()=>setShowJobsheet(true)} className={` ${showJobsheet? ' buttonbg font-extrabold ' : ' bg-zinc-900 '}  w-36 h-14 !rounded-full `}>Create Job sheet</button>
    <button onClick={()=>setShowJobsheet(false)} className={` ${showJobsheet? ' bg-zinc-900 ' : ' buttonbg font-extrabold '} w-36 h-14 !rounded-full`}>All Job Sheet </button>
    </div>
      { showJobsheet ? <Jobsheet /> : <AllJobSheet role='admin'/> }
    </div>
  )
}

export default Form