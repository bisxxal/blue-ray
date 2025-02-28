'use client'; 
import { AddEmp } from '@/actions/admin/adminform';
import { createEmp, TcreateEmp } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
      

const CreateEmp = () => {
    const { register, handleSubmit , formState:{errors , isSubmitting},reset, } = useForm<TcreateEmp>({resolver:zodResolver(createEmp)})
        const onSubmit = async(data:TcreateEmp) => {
           await AddEmp(data) 
            toast.success('Added employee');
            reset()
        }
  return (
    <div className='w-full h-screen flex gap-6 pt-10 items-center flex-col '>
        <h1 className=' text-center font-bold text-3xl '>Add employee</h1>
        <form className=' w-1/2 mx-auto flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>    
        <input className='w-full inputbg rounded-xl bg-transparent block border p-2' type="text"  {...register("name")}  placeholder='name '/>
        {errors.name && <span>{errors?.name?.message}</span>}
        <input className='w-full inputbg rounded-xl bg-transparent block border p-2' type="email"  {...register("email")}  placeholder='email '/>
        {errors?.email && <span>{errors?.email?.message}</span>}



        <select   {...register("city")} className='inputbg rounded-xl bg-transparent border-2 border-[#ffffff3c] p-2'>
            <option value="bhubaneswar">bhubaneswar</option>
            <option value="jajpur">jajpur</option>
            <option value="cuttack">cuttack</option>
            <option value="Baleswar">Baleswar</option>
          </select>

        {errors?.city && <span>{errors?.city?.message}</span>}

        {/* <input className='w-full rounded-xl bg-transparent block border p-2' type="text"  {...register("city")}  placeholder='city '/> */}
        <button className='w-full h-12 mt-5 buttongreen' disabled={isSubmitting} type="submit">Sumbit</button>
        </form>
    </div>
  )
}

export default CreateEmp