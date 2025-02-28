'use client';

import GiveAccess from "@/components/GiveAccess";
import { useState } from "react";

const AdminEmpAccess = () => {

  return (
    <div className=' w-full min-h-screen p-3'>

    {/* <div className=" bg-zinc-900 w-fit  mx-auto flex gap-4 rounded-full overflow-hidden "> */}
    {/* <button onClick={()=>setShowCreateEmp(false)} className={` ${showCreateEmp? ' bg-zinc-900 ' : ' buttonbg font-extrabold '} w-36 h-14 !rounded-full`}> Give access  </button>
    <button onClick={()=>setShowCreateEmp(true)} className={` ${showCreateEmp? ' buttonbg font-extrabold ' : ' bg-zinc-900 '}  w-36 h-14 !rounded-full `}>Add employee  </button> */}
    {/* </div>  */}
      {/* {
        showCreateEmp ? <CreateEmp />  : <GiveAccess   /> 
      } */}
       <GiveAccess   /> 
    </div>
  )
}

export default AdminEmpAccess