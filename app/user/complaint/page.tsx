'use client'; 
import { CreateComplain } from '@/actions/user/complain';
import { TuserComplainForm, userComplainForm } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

const UserComplaint = () => {
    const { register, handleSubmit , 
          formState:{errors , isSubmitting},
          reset, 
          } = useForm<TuserComplainForm>({resolver:zodResolver(userComplainForm)})
  
    const onSubmit =async (data:TuserComplainForm) => {
        const res = await CreateComplain(data)
          if(res.status === 200){
            toast.success('complain registered');
          }
          if(res.status === 201){
            toast.error('complain not found please enter valid complainId');
          }
          else{
            toast.error('complain not registered');}
      }
  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col '> 
    <h1 className='text-2xl font-bold text-center'> complain </h1>
    <form className=' flex w-1/2 flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
    <input className=' bg-transparent block rounded-lg outline-none border p-2' type="text"  {...register("name")}  placeholder='name '/>
    {errors.name && <span className=' text-red-500 text-sm'>{errors?.name?.message}</span>}
    <input className=' bg-transparent block rounded-lg outline-none border p-2' type="email"  {...register("email")}  placeholder='email '/>
    {errors?.email && <span className=' text-red-500 text-sm'>{errors?.email?.message}</span>}
    
    <input className=' bg-transparent block rounded-lg outline-none border p-2' type="text"  {...register("complainId")}  placeholder='complainId '/> 
    {errors?.complainId && <span className=' text-red-500 text-sm'>{errors?.complainId?.message}</span>}

    <select className=' w-full block capitalize inputbg mt-3' {...register("city")} >
            <option value="balasore">balasore</option>
            <option value="keonjhar">keonjhar</option>
            <option value="jajpur">jajpur</option>
            <option value="baripada">baripada</option>
            <option value="Bhadrak">Bhadrak</option>
       </select>
       {errors.city && <span className='text-red-600 text-sm'>{errors?.city?.message}</span>}

    <textarea className=' bg-transparent block rounded-lg outline-none border p-2'  {...register("description")}  placeholder='description '/> 
    {errors?.complainId && <span className=' text-red-500 text-sm'>{errors?.description?.message}</span>}
    <button className=' px-8 py-3 buttonbg' disabled={isSubmitting} type="submit">Sumbit</button>
    </form>
    </div>
  )
}

export default UserComplaint