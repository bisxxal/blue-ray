'use client';

import Link from "next/link";

const userPublicPage = () => {
  return (
    <div className=" w-full h-screen flex gap-6 pt-10 items-center flex-col ">
      <h1 className=" text-4xl font-mono font-bold ">User Public Page</h1>
      
      <div className=" flex gap-6 ">
      <Link  className='buttongreen px-6 py-3 ' href="/user/complaint">Complain Form
      </Link>
      
      <Link  className='buttonbg px-6 py-3 ' href="/user/form">Blue Ray Form
      </Link>

      </div>
    </div>
    
  )
}

export default userPublicPage