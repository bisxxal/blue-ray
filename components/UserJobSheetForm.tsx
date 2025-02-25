'use client'; 
import { AllUsersForm, UpdateUserFormCall } from '@/actions/user/complain'; 
import { UserForm } from '@/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query' 
import React from 'react' 
import Loader from './loader';
import toast from 'react-hot-toast';
 
const UserJobSheetForm = ({role , city}:{role:'admin'|'emp' , city?:string}) => {

    const queryClient = useQueryClient();
    const { isLoading, data } = useQuery({
        queryKey: ['fetchuserform'],
        queryFn: async () => {
            const data = await AllUsersForm()
            return data
          },
    });
    if (isLoading) return <Loader /> ;

    const callClosed =async (call: string , id:string) => {
         const res = await UpdateUserFormCall(id, call);
          if (res.status === 200) {
            toast.success('Status updated successfully');
            await queryClient.invalidateQueries({ queryKey: ['fetchuserform'] });
          } else {
            toast.error('Error in updating status');
          }
    }
  return (
    <div className=" w-full min-h-screen px-10 mt-10">

      <h1 className=" text-center font-bold text-xl mb-10">Users Form sumbit page</h1>

      <div className="border-2 w-[3200px] inputbg border-[#80808056] p-3 rounded-lg overflow-x-scroll bg-gre en-300 ">
        <div className=" grid grid-cols-11 gap-5 mb-5 border-[#80808056] border-b-2 py-4">
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
         <div key={item.id} className='grid grid-cols-11 gap-5 py-4 hover:bg-[#466bfe64] rounded-xl transition-all'>
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

           {
           item.call === 'closed' ?  <p className=' text-red-500 font-bold'>Closed</p> : <button className=' buttongreen w-fit p-3' onClick={()=>callClosed('closed' , item.id)}>Not closed</button>
           }
          
         </div>
       ))
   }

        { role === 'admin' && data && data.map((item: UserForm) => (
         <div key={item.id} className='grid grid-cols-11 gap-5 py-4 hover:bg-[#466bfe64] rounded-xl transition-all'>
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
           <p>{item.call}</p> 
         </div>
       ))
   }
      </div>
    </div>
  );
};

export default UserJobSheetForm;
