'use client'
import { currentUser } from '@/actions/admin/role'
import AllJobSheet from '@/components/AllJobSheet'
import Jobsheet from '@/components/Jobsheet' 
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const page = () => { 
  const [showJobsheet , setShowJobsheet] = useState(false)

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["fetchEmp"],
    queryFn: async () => {
      const data = await currentUser();
      return data;
    },
    staleTime: 3000,
  });


  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col '>    
    <div className=" bg-zinc-900 w-fit  mx-auto flex gap-4 rounded-full overflow- ">
    <button onClick={()=>setShowJobsheet(true)} className={` ${showJobsheet? ' buttonbg font-extrabold ' : ' bg-zinc-900 '}  hover:scale-110 transition-all  w-40 h-14 !rounded-full `}>Create Job sheet</button>
    <button onClick={()=>setShowJobsheet(false)} className={` ${showJobsheet? ' bg-zinc-900 ' : ' buttonbg font-extrabold '}hover:scale-110 transition-all  w-36 h-14 !rounded-full`}>All Job Sheet </button>
    </div>
  { showJobsheet ? <Jobsheet /> : <AllJobSheet emp={data} role={'emp'} /> }
</div>
  )
}

export default page