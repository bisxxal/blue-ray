
import Dowload from '@/components/elements/Download'
import React from 'react'

const FieldServiceReport = () => {
  return (

    <div className=' w-full min-h-screen flex gap-6 pt-10 items-center flex-col px-4'>

    <div className=' flex items-center justify-between w-full'> 
    <h1 className=' text-xl text-center font-bold'>Job sheet Form</h1>
    <Dowload text='job sheet' />
    </div>
   
    <div id='receipt' className="max-w-4xl mx-auto p-8 bg-white text-black shadow-lg rounded-lg border border-black">
      <h1 className="text-2xl font-bold text-center mb-6 border-b pb-2">Field Service Report</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Blue Rays Enterprise</h2>
        <p className="text-sm text-gray-600">(Authorised Partner of VOLTAS LTD)</p>
        <p className="text-sm">Plot No.-23, Maruti Vihar, Raghunathpur, Nandankanan Road</p>
        <p className="text-sm">Pin Code: 751024</p>
      </div>
      
          <h3 className="text-md font-semibold">User Details</h3>
      <div className=" flex border border-black ">


        <div  className="w-1/2 flex gap-">    
         <div className="  grid grid-rows-5">
          <p className=" border-b border-r border-black "><strong>Customer Name:</strong>  </p>
          <p className=" border-b border-r border-black "><strong>Job Sheet No:</strong>  </p>
          <p className=" border-b border-r border-black "><strong>Customer Address:</strong>  </p>
          <p className=" border-b border-r border-black "><strong>Submitted on:</strong>  </p>
          <p className=" border-r border-black "><strong>Product Make:</strong>  </p>
         </div>

         <div className=" grid grid-rows-5">
          <p className=" border-b border-r  border-black">  TPNODL</p>
          <p className=" border-b border-r border-black">  TP/BR/1143</p>
          <p className=" border-b border-r border-black"> Opcenx</p>
          <p className=" border-b border-r border-black"> 2/8/2025</p>
          <p className=" border-r border-black">  Voltas</p>
         </div>
        </div>

        <div className=" w-1/2 flex ">

        <div className=" grid grid-rows-4">

          <p><strong>Earthing:</strong>  </p>
          <p><strong>Stabilizer:</strong>  </p>
          <p><strong>Fault Found:</strong> </p>
        </div>

        <div className=" grid grid-rows-4">
          <h3 className="text-md font-semibold"> </h3>
          <p>  OK</p>
          <p>  OK (GOOD)</p>
          <p>  Not cooling</p>
        </div>

        </div>
      </div>
      
          <h3 className="text-md mt-6 mb-2  text-center font-semibold">Technical Details</h3>
          
          <div className=" flex justify-between">

            <div className="border border-black flex  w-[75%]">
              <div className="flex gap-10 justify-between">
              <div className=" items-center flex  border border-black  "> 
              <div className=" grid grid-rows-3">
              <p><strong>Earthing:</strong>  </p>
              <p><strong>Stabilizer:</strong>  </p>
              <p><strong>Room Size</strong> </p>
            </div>

            <div className=" grid grid-rows-3">
              <p>  OK</p>
              <p>  OK (GOOD)</p>
              <p>  Not cooling</p>
            </div>
            </div>


            <div className=" items-center flex ">
              <div className=" grid grid-rows-3">
              <p className=" border-b border-x border-black "><strong>IP Voltage</strong>  </p>
              <p className=" border-b border-x border-black "><strong>OP Voltage</strong>  </p>
              <p className="   border-x border-black "><strong>Current Drawn</strong> </p>
            </div>

            <div className=" grid grid-rows-3">
              <p className=" border-b w-32 border-black "> 3  </p>
              <p className=" border-b w-32 border-black ">   </p>
              <p className="  w-32 border-black ">  </p>
            </div>
            </div>
              </div>
            </div>


            <div className="border border-black w-1/2">
            <div className=" items-center flex ">
              <div className=" grid grid-rows-3">
              <p className=" border-b border-x border-black "><strong>Grill</strong>  </p>
              <p className=" border-b border-x border-black "><strong>Room</strong>  </p>
              <p className="   border-x border-black "><strong>Ambient</strong> </p>
            </div>

            <div className=" grid grid-rows-3">
              <p className=" border-b w-32 border-black "> 3  </p>
              <p className=" border-b w-32 border-black ">   </p>
              <p className="  w-32 border-black ">  </p>
            </div>
            </div>
            </div>

          </div>



          <h3 className="text-md mt-6 mb-2  text-center font-semibold">Technician Visit Details</h3>
      <div className="w-full border-2 border-black border-t flex justify-between ">
      
       <div className="border-r-2  w-1/2 flex flex-col gap-3">
         <div className="">
          <p><strong>Technician Name:</strong> Minaz Quadri</p>
          <p><strong>Date of Visit:</strong> 1/27/2025</p>
        </div>
        <div>
          <h3 className="text-md font-semibold">Fault Found</h3>
          <p>Servicing, Repairing, Gas Charging</p>
        </div>
        <div>
          <h3 className="text-md font-semibold">Action Taken</h3>
          <p>Servicing, Repairing, Gas Charging</p>
        </div>
        <div>
          <h3 className="text-md font-semibold">Cash Collected (Rs.) </h3>
          <p>23412</p>
        </div>
        </div>
        
        
        <div className=" w-1/2 flex flex-col  gap-3">    

        <div>
          <h3 className="text-md font-semibold"> Technician Comments :</h3>
          <p className=" min-h-[60px]">Customer is happy with the service</p>
        </div>
        <div className=" border-t border-black p-2">
          <h3 className="text-md font-semibold">Part Replacement Details ::</h3>
          <p className=" min-h-[60px]">Customer is happy with the service</p>
        </div>


        <div className=" flex flex-col w-full justify-between">
          
          <div className=" grid grid-cols-5 w-full">
          <h3 className="text-sm border-r border-y border-black font-semibold">Copper pipe</h3>
          <h3 className="text-sm border-r border-y border-black font-semibold">Drain Pipe(In metres)</h3>
          <h3 className="text-sm border-r border-y border-black font-semibold">ODU stand(In nos)</h3>
          <h3 className="text-sm border-r border-y border-black font-semibold">Air Filter(InNos)</h3>
          <h3 className="text-sm border-y border-black font-semibold">3 Pin Top(In nos)</h3>
            {/* <p>23</p> */}
          </div>
          
          <div className=" grid grid-cols-5">
          <p className=" border-b border-black border-r">23</p>
          <p className=" border-b border-black border-r">23</p>
          <p className=" border-b border-black border-r">23</p>
          <p className=" border-b border-black border-r">23</p>
          <p className=" border-b border-black">23</p>

          </div>
        </div>

        </div>

      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500 border-t pt-2">
        <p>** This is a digitally generated document.</p>
      </div>
    </div>
    </div>
  );
};

export default FieldServiceReport;
