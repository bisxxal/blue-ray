'use client'
import { CreateUserForm } from '@/actions/user/complain'
import { TUserForm, userForm } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiLoader } from 'react-icons/fi'

const UserFormPage = () => {
 const { register, control ,handleSubmit , formState:{errors , isSubmitting},reset, } = useForm<TUserForm>({resolver:zodResolver(userForm)})

    const onSubmit = async(data:TUserForm) => { 
        console.log(data)
        const res = await CreateUserForm(data)
        if(res?.status === 200){
            toast.success('Job sheet created');
            reset()
        }
        else{
            toast.error('Something went wrong') //
        }
    }
  return (
    <div className=' w-full min-h-screen flex flex-col gap-5 justify-center items-center'>
        <h1 className=' text-3xl font-bold '>BLUE RAY User Form </h1>
        <h2 className=' text-lg font-semibold text-red-500'>For contact use -7008618919 or email- bluerays.projects@gmail.com</h2>
        <form className=' flex flex-col w-5/6  !mx-auto gap-3' onSubmit={handleSubmit(onSubmit)}> 
        <label>Email*</label>
        <input className='p-2 rounded-xl inputbg bg-transparent' type="email" {...register("email")}/>
        {errors?.email && <span className='text-red-600 text-sm'>{errors?.email?.message}</span>}

        
<div className=' flex justify-between gap-10'>
   <div className=' w-1/2 flex flex-col'>
   <label>Date of Visit*</label>
   <Controller
      name="informationDate"
      control={control}
      render={({ field }) => (
        <DatePicker
          selected={field.value } 
          onChange={(date: Date | null) => field.onChange(date)}
          dateFormat="yyyy/MM/dd"
          className="p-2 rounded-xl w-full inputbg bg-transparent"
          placeholderText="Select Date"
            // peekNextMonth
            // showMonthDropdown
            // showYearDropdown
            // dropdownMode="select"
            // closeOnScroll={true}
            // disabledKeyboardNavigation
                />
              )}
            />

         {errors?.informationDate && <span className='text-red-600 text-sm'>{errors?.informationDate?.message}</span>} 

   </div>
        <div className=' w-1/2'>
       <h3>Location*</h3>
       <select className=' w-full block capitalize inputbg mt-3' {...register("location")} >
            <option value="balasore">balasore</option>
            <option value="keonjhar">keonjhar</option>
            <option value="jajpur">jajpur</option>
            <option value="baripada">baripada</option>
            <option value="Bhadrak">Bhadrak</option>
       </select>
       {errors.location && <span className='text-red-600 text-sm'>{errors?.location?.message}</span>}

</div>
</div>
      
       <label htmlFor="">Machine Installed at*</label>
       <input className='p-2 rounded-xl inputbg bg-transparent' type="text" {...register("machineInstalled")} />
       {errors.machineInstalled && <span className='text-red-600 text-sm'>{errors?.machineInstalled?.message}</span>}

        <div className='mt-4 w-full justify-between flex gap-10'>
       <div className=' w-1/2'>

          <label>Make *</label>
       <div className='mt-3 gap-5 flex flex-col'>

        <div className=' flex gap-5 items-center'>
       <input type="radio" id="Voltas"  {...register("make")}  value="Voltas"/>
       <label htmlFor="Voltas">Voltas</label>
        </div>

        <div className=' flex gap-5 items-center'>
         <input type="radio" id="Carrier"  {...register("make")}  value="Carrier"/>
         <label htmlFor="Carrier">Carrier</label>
       </div>

       <div className=' flex gap-5 items-center'>
      <input type="radio" id="Godrej"  {...register("make")}  value="Godrej"/>
      <label htmlFor="Godrej">Godrej</label>
       </div>

       <div className=' flex gap-5 items-center'>
      <input type="radio" id="Hitachi"  {...register("make")}  value="Hitachi"/>
      <label htmlFor="Hitachi">Hitachi</label>
        </div>

      <div className=' flex gap-5 items-center'>
      <input type="radio" id="Lloyd"  {...register("make")}  value="Lloyd"/>
      <label htmlFor="Lloyd">Lloyd</label>
      </div>

        <div className=' flex gap-5 items-center'>
       <input type="radio" id="Blue-star"  {...register("make")}  value="Blue-star"/>
        <label htmlFor="Blue-star">Blue star</label>
        </div>

        <div className=' flex gap-5 items-center'>
        <input type="radio" id="Lg"  {...register("make")}  value="Lg"/>
        <label htmlFor="Lg">Lg</label>
        </div>

        <div className=' flex gap-5 items-center'>
        <label htmlFor="other"> Other </label>
        <input className='inputbg bg-transparent rounded-xl p-2' type="text" {...register("make")} id='other' />
        </div>

        </div>   
        {errors.make && <span className='text-red-600 text-sm'>{errors?.make?.message}</span>}
          </div>

          <div className=' w-1/2'>
          <label>Type*</label>
       <select  className=' inputbg w-full capitalize mt-3' {...register("type")} >
            <option value="Split">Split</option>
            <option value="Window">Window</option>
       </select>  {errors.type && <span className='text-red-600 text-sm'>{errors?.type?.message}</span>}
          </div>
        </div>

        <div className='mt-4 w-full justify-between flex gap-10'>
           
           <div className=' w-1/2'>
           <label>Tonnage*</label>
            <select  className=' inputbg w-full capitalize mt-3' {...register("tonnage")} >
            <option value="1-2 ton">1-2 ton</option>
            <option value="1-2 ton">1-2 ton</option>
       </select>  {errors.tonnage && <span className='text-red-600 text-sm'>{errors?.tonnage?.message}</span>}
           </div>
           <div className=' w-1/2'>
           <label>Priority*</label>
            <select  className=' inputbg w-full capitalize mt-3' {...register("priority")} >
            <option value="low">low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
       </select>  {errors.priority && <span className='text-red-600 text-sm'>{errors?.priority?.message}</span>}
           </div>


        </div>
 
       <label htmlFor="">AC serial no.(if serial no N/A enter dummy serial no-9999) </label>

         <input className='p-2 rounded-xl inputbg bg-transparent' type="number" {...register("serial")} />
            {errors.serial && <span className='text-red-600 text-sm'>{errors?.serial?.message}</span>}


       <label htmlFor="">Problem statement *</label>

         <textarea className='p-2 rounded-xl inputbg bg-transparent' {...register("problem")} />
            {errors.problem && <span className='text-red-600 text-sm'>{errors?.problem?.message}</span>}


            <button className=' px-5 py-3 flex items-center justify-center mt-10 buttonbg w-24' disabled={isSubmitting} type="submit">{isSubmitting ? <FiLoader className=' animate-spin' /> :"Sumbit"}</button>

        </form>
    </div>
  )
}

export default UserFormPage