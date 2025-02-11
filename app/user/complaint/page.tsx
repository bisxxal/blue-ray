'use client'; 
import { CreateComplain } from '@/actions/user/complain';
import { TuserForm, userForm } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

const UserComplaint = () => {
    const { register, handleSubmit , 
          formState:{errors , isSubmitting},
          reset, 
          } = useForm<TuserForm>({resolver:zodResolver(userForm)})
      const onSubmit = (data:TuserForm) => {
          CreateComplain  (data)
          toast.success('complain registered');
      }
  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col '> 
    <h1 className='text-2xl font-bold text-center'> complain </h1>
    <form className=' flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
    <input className=' bg-transparent block rounded-lg outline-none border p-2' type="text"  {...register("name")}  placeholder='name '/>
    {errors.name && <span className=' text-red-500 text-sm'>{errors?.name?.message}</span>}
    <input className=' bg-transparent block rounded-lg outline-none border p-2' type="email"  {...register("email")}  placeholder='email '/>
    {errors?.email && <span className=' text-red-500 text-sm'>{errors?.email?.message}</span>}
    <input className=' bg-transparent block rounded-lg outline-none border p-2' type="text"  {...register("service")}  placeholder='service '/>
    {errors?.service && <span className=' text-red-500 text-sm'>{errors?.service?.message}</span>}
    <input className=' bg-transparent block rounded-lg outline-none border p-2' type="number"  {...register("complainId")}  placeholder='complainId '/> 
    {errors?.complainId && <span className=' text-red-500 text-sm'>{errors?.complainId?.message}</span>}

    <textarea className=' bg-transparent block rounded-lg outline-none border p-2'  {...register("description")}  placeholder='description '/> 
    {errors?.complainId && <span className=' text-red-500 text-sm'>{errors?.description?.message}</span>}
    <button className=' px-8 py-3 buttonbg' disabled={isSubmitting} type="submit">Sumbit</button>
    </form>
    </div>
  )
}

export default UserComplaint