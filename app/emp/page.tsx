'use client'

const EmployeePage = () => {
  return (
    <div className=' w-full min-h-screen'> 
      <div className='w-full  px-20 min-h-screen '>
      <h1 className=' text-2xl  text-center textbase font-bold my-10 '>EMPLOYEE PANNEL</h1>

      <div className=' flex items-end justify-center w-full h-full gap-10 flex-wrap'>

        <div className='w-64 textbase h-40 buttonhover inputbg relative rounded-3xl border flex flex-col items-center justify-center '>
          <div className=' h-[70%] w-[60%] bg-[#005eff3e] blur-[25px] rounded-full absolute'></div>
          <p className=' font-medium'>Total JobSheet</p>
          <p className='  text-6xl font-bold'>100</p>
        </div>
        <div className='w-64 text-[#fc2626] h-40 buttonhover inputbg relative rounded-3xl border flex flex-col items-center justify-center '>
          <div className=' h-[70%] w-[60%] bg-[#ff00003e] blur-[25px] rounded-full absolute'></div>
          <p className=' font-medium '>Total  User Complain</p>
          <p className='  text-6xl font-bold'>130</p>
        </div>
        <div className='w-64 text-[#26fc26] h-40 buttonhover inputbg relative rounded-3xl border flex flex-col items-center justify-center '>
          <div className=' h-[70%] w-[60%] bg-[#0dff003e] blur-[25px] rounded-full absolute'></div>
          <p className=' font-medium'>Total  Income</p>
          <p className='  text-6xl font-bold'>26.4k</p>
        </div>

        
        
      </div>
    </div>
    </div>
  )
}

export default EmployeePage