
import { AllJobSheetAction } from '@/actions/admin/adminform';
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link';
import React from 'react'
import { FiLoader } from 'react-icons/fi';
 
const AllJobSheet = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['fetchjob'],
        queryFn: async () => {
            const data = await AllJobSheetAction()
            return data
          },
        staleTime: 2000
    });
    if (isLoading) return <div className=' flex items-center justify-center text-2xl gap-2'> <FiLoader className=' animate-spin' />  </div> ;
    
    return (
        <div className='w-full h-screen flex gap-6 pt-10 items-center flex-col px-10'>
            <h1>All Job Sheets</h1>

            <div className='border-2 inputbg border-[#80808056] p-3 w-full rounded-lg'>
                <div className='flex justify-between gap-3 mb-5
                  border-[#80808056] border-b-2 pb-3'>
                    <p>Customer Address</p>
                    <p>Circle</p>
                    <p>Product</p>
                    <p>Division</p>
                    <p>Action</p>
                </div>
 
                {data?.map((item:any) => (
                    <div key={item.id} className='flex  justify-between gap-3 pb-3'>
                        <p>{item.address}</p>
                        <p>{item.circle}</p>
                        <p>{item.product}</p>
                        <p>{item.division}</p>
                        <Link href={`/admin/jobsheet/${item.id}`} className=' buttongreen p-3'>View</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllJobSheet;
