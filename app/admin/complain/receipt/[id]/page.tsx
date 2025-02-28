import Dowload from '@/components/elements/Download'
import React from 'react'

const ReciptIdPage = () => {
  return (
    <div className=' w-full min-h-screen flex gap-6 pt-10 items-center flex-col px-4'>

      <div className=' flex items-center justify-between w-full'> 
      <h1>Complaint Form</h1>
      <Dowload text='complain'/>
      </div>

        <div id='receipt' className=' w-[80%] bg-white text-black rounded-lg mx-auto min-h-screen p-4'>
            <h1 className=' text-center'>Complain Form </h1>

            <h1>Name - bishal kandi</h1>
            <h2>Email - bishal ksnd</h2>
        </div>
    </div>
  )
}

export default ReciptIdPage