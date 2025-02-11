
import { SingleJobSheetAction } from '@/actions/admin/adminform';
import Dowload from '@/components/Download'
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const JobSheetIdPage = async({ params }: any) => {
    const { id } = await params;
    
    // const { isLoading, isError, data, error }= useQuery({
    //     queryKey: ['fetchjob'],
    //     queryFn: async () => {
            const data1 = await SingleJobSheetAction(id)
//             return data
//           },
//         staleTime: 10000
//     });

// console.log(data)
const data = data1[0]
  return (
    <div className=' w-full min-h-screen flex gap-6 pt-10 items-center flex-col px-4'>

    <div className=' flex items-center justify-between w-full'> 
    <h1 className=' text-xl font-bold'>Job sheet Form</h1>
    <Dowload text='job sheet' />
    </div>

      <div id='receipt' className=' w-[80%] bg-white text-black rounded-lg mx-auto min-h-screen p-4'>
          <h1 className='font-bold text-center'>Job sheet Form </h1>

          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border">
      <h2 className="text-2xl font-bold text-center mb-4">Field Service Report</h2>
      <div className="grid grid-cols-2 gap-4 border-b pb-4">
        <div>
          <p className="font-semibold">Customer Name:</p>
          <p>{data.customerName}</p>
        </div>
        <div>
          <p className="font-semibold">Job Sheet No:</p>
          <p>{data?.id}</p>
        </div>
        <div>
          <p className="font-semibold">Address:</p>
          <p>{data.address}</p>
        </div>
        <div>
          <p className="font-semibold">Submitted On:</p>
          <p>{data.submittedOn}</p>
        </div>
        <div>
          <p className="font-semibold">Product Make:</p>
          <p>{data?.product}</p>
        </div>
        <div>
          <p className="font-semibold">Serial Numbers:</p>
          <p>{data?.serial}</p>
        </div>
        <div>
          <p className="font-semibold">Contact:</p>
          <p>{data?.contact}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{data?.email}</p>
        </div>
      </div>
      <div className="mt-4 border-b pb-4">
        <p className="font-semibold">Technician:</p>
        {/* <p>{technician}</p> */}
        <p className="font-semibold">Visit Date:</p>
        {/* <p>{visitDate}</p> */}
      </div>
      <div className="mt-4 border-b pb-4">
        <p className="font-semibold">Fault Found:</p>
        {/* <p>{faultFound}</p> */}
        <p className="font-semibold">Action Taken:</p>
        {/* <p>{actionTaken}</p> */}
      </div>
    </div>
      </div>
  </div>
  )
}

export default JobSheetIdPage