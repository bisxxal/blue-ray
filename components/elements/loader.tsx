import React from 'react'
import { FiLoader } from 'react-icons/fi';

const Loader = () => {
  return (
     <div className=' flex items-center w-full h-screen justify-center text-2xl gap-2'> <FiLoader className=' animate-spin' />  </div> 
  )
}

export default Loader