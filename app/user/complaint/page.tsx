'use client'; 
import { emailResend } from '@/actions/email/email';
import { CreateComplain } from '@/actions/user/complain';
import { sendEmailNode } from '@/lib/email';
import { TuserComplainForm, userComplainForm } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

const UserComplaint = () => {
    const { register, handleSubmit , formState:{errors , isSubmitting},reset, } = useForm<TuserComplainForm>({resolver:zodResolver(userComplainForm)})
  
    const onSubmit =async (data:TuserComplainForm) => {
        const res = await CreateComplain(data)
        
        if(res.status === 200){
          toast.success('complain registered');
          // await emailResend({ email: data?.email, subject: 'complain Sumbited'}); // email sending
          await sendEmailNode({email:data?.email,message:'complain Sumbited' , subject:'Complaint resgistation'}); // email sending
          reset();
          }
          if(res.status === 201){
            toast.error('complain not found please enter valid complain Id');
          }
          if(res.status === 404){
            toast.error('Error while complain');
          }
      }
  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col '> 
    <h1 className='text-2xl font-bold text-center'> complain </h1>
    <form className=' flex w-1/2 flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
    <input className=' bg-transparent inputbg block rounded-lg outline-none border p-2' type="text"  {...register("name")}  placeholder='name '/>
    {errors.name && <span className=' text-red-500 text-sm'>{errors?.name?.message}</span>}
    <input className=' bg-transparent inputbg block rounded-lg outline-none border p-2' type="email"  {...register("email")}  placeholder='email '/>
    {errors?.email && <span className=' text-red-500 text-sm'>{errors?.email?.message}</span>}
    
    <input className=' bg-transparent inputbg block rounded-lg outline-none border p-2' type="text"  {...register("jobSheetId")}  placeholder='complainId '/> 
    {errors?.jobSheetId && <span className=' text-red-500 text-sm'>{errors?.jobSheetId?.message}</span>}

    <select className=' w-full block outline-none capitalize inputbg mt-3' {...register("city")} >
            <option value="balasore">balasore</option>
            <option value="keonjhar">keonjhar</option>
            <option value="jajpur">jajpur</option>
            <option value="baripada">baripada</option>
            <option value="Bhadrak">Bhadrak</option>
       </select>
       {errors.city && <span className='text-red-600 text-sm'>{errors?.city?.message}</span>}

    <textarea className=' bg-transparent inputbg block rounded-lg outline-none border p-2'  {...register("description")}  placeholder='description '/> 
    {errors?.description && <span className=' text-red-500 text-sm'>{errors?.description?.message}</span>}
    <button className='w-fit px-8 py-3 buttonbg' disabled={isSubmitting} type="submit">Sumbit</button>
    </form>
    </div>
  )
}

export default UserComplaint