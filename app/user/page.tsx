'use client';

import Link from "next/link";

const userPublicPage = () => {
  return (
    <div className=" w-full h-screen flex gap-6 pt-10 items-center flex-col ">
      <h1>User Public Page</h1>
      <Link  className='buttongreen px-6 py-3 ' href="/user/complaint">Complaint
      </Link>
      
      <Link  className='buttonbg px-6 py-3 ' href="/user/form">Form
      </Link>
    </div>
    
  )
}

export default userPublicPage