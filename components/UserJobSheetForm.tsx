'use client'; 
import { AllUsersForm } from '@/actions/user/complain'; 
import { UserForm } from '@/constants';
import { useQuery } from '@tanstack/react-query' 
import React from 'react' 
import Loader from './loader';
 
const UserJobSheetForm = ({role , city}:{role:'admin'|'emp' , city?:string}) => {

    const { isLoading, data } = useQuery({
        queryKey: ['fetchuserform'],
        queryFn: async () => {
            const data = await AllUsersForm()
            return data
          },
        staleTime: 2000
    });
    if (isLoading) return <Loader /> ;
  console.log(city)
  return (
    <div className=" w-full min-h-screen px-10 bg-re d-500">

      <h1 className=" text-center font-bold text-xl mb-10">Users Form sumbit page</h1>

      <div className="border-2 w-[3200px] inputbg border-[#80808056] p-3 rounded-lg overflow-x-scroll bg-gre en-300 ">
        <div className=" grid grid-cols-11 gap-5 mb-5 border-[#80808056] border-b-2 pb-3">
          <p>email</p>
          <p>informationDate</p>
          <p>location</p>
          <p>machineInstalled</p>
          <p>make</p>
          <p>tonnage</p>
          <p>tonnage</p>
          <p>serial</p>
          <p>priority</p>
          <p>problem</p>
          <p>Call Closed</p>
        </div>

        { role === 'emp' && data && data?.filter((job: UserForm) => job.location === city)
       .map((item: UserForm) => (
         <div key={item.id} className='grid grid-cols-11 gap-5 pb-3'>
           <p>{item?.email}</p>
           <p>{item?.informationDate}</p>
           <p>{item?.location}</p>
           <p>{item?.machineInstalled}</p>
           <p>{item?.make}</p> 
           <p>{item?.type}</p>
           <p>{item?.tonnage}</p>
           <p>{item?.serial}</p>
           <p>{item?.priority}</p>
           <p>{item?.problem}</p>
           <p>Yes</p> 
         </div>
       ))
   }

        { role === 'admin' && data && data.map((item: UserForm) => (
         <div key={item.id} className='grid grid-cols-11 gap-5 pb-3'>
           <p>{item?.email}</p>
           <p>{item?.informationDate}</p>
           <p>{item?.location}</p>
           <p>{item?.machineInstalled}</p>
           <p>{item?.make}</p> 
           <p>{item?.type}</p>
           <p>{item?.tonnage}</p>
           <p>{item?.serial}</p>
           <p>{item?.priority}</p>
           <p>{item?.problem}</p>
           <p>Yes</p> 
         </div>
       ))
   }
      </div>
    </div>
  );
};

export default UserJobSheetForm;
