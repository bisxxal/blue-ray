'use client'

import { currentUser } from "@/actions/admin/adminform";
import AllJobSheet from '@/components/AllJobSheet'
import Jobsheet from '@/components/CreateJobsheet' 
import Loader from '@/components/elements/loader'
import Refresh from '@/components/elements/refresh'
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

  if (isLoading) return <Loader />;
  if (isError) return <Refresh data='Error while fetching data' />;

  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col '>    
    <div className=" bg-zinc-900 w-fit  mx-auto flex gap-4 rounded-full overflow- ">
    <button onClick={()=>setShowJobsheet(true)} className={` ${showJobsheet? ' buttonbg font-extrabold ' : ' bg-zinc-900 '}    w-40 h-14 !rounded-full `}>Create Job sheet</button>
    <button onClick={()=>setShowJobsheet(false)} className={` ${showJobsheet? ' bg-zinc-900 ' : ' buttonbg font-extrabold '}  w-36 h-14 !rounded-full`}>All Job Sheet </button>
    </div>
  { showJobsheet ? <Jobsheet /> : <AllJobSheet emp={data} role={'emp'} /> }
</div>
  )
}

export default page