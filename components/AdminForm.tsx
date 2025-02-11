'use client';
import { jobSheetAction } from '@/actions/admin/adminform';
import { jobSheet, TJobSheet } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
      
const AdminForm = () => {
    const { register, handleSubmit , 
        formState:{errors , isSubmitting},
        reset, 
        } = useForm<TJobSheet>({resolver:zodResolver(jobSheet)})
    const onSubmit = (data:TJobSheet) => {

        jobSheetAction(data)
        toast.success('Job sheet created');
    } 
  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col '>
      <h1 className=' font-bold text-center text-4xl '>BlueRays_Jobsheet</h1>
 
        <form className=' flex flex-col w-1/2 !mx-auto gap-3' onSubmit={handleSubmit(onSubmit)}> 

         <label>Customer Address*</label>
         <textarea className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2'  {...register("address")}  placeholder='address '/>
        {errors?.address && <span className='text-red-600 text-sm'>{errors?.address?.message}</span>}


<div className='w-full justify-between flex gap-10 mt-4'>
<div className=' w-1/2'>
<h3>Circle*</h3>
       <select className=' w-full block capitalize inputbg mt-3' {...register("circle")} >
            <option value="balasore">balasore</option>
            <option value="keonjhar">keonjhar</option>
            <option value="jajpur">jajpur</option>
            <option value="baripada">baripada</option>
            <option value="Bhadrak">Bhadrak</option>
       </select>
       {errors.circle && <span className='text-red-600 text-sm'>{errors?.circle?.message}</span>}
</div>

       <div className=' w-1/2 '>
       <label>Division*</label>
       <select  className='w-full capitalize inputbg mt-3 !block' {...register("division")} >
            <option value="JED">JED</option>
            <option value="CED">CED</option>
            <option value="BED">BED</option>
            <option value="KED">KED</option>
            <option value="AED">AED</option>
            <option value="JOED">JOED</option>
            <option value="BPED">BPED</option>
            <option value="RED">RED</option>
            <option value="UED">UED</option>
            <option value="BNED">BNED</option>
            <option value="KEUD">KEUD</option>
       </select>  {errors.division && <span className='text-red-600 text-sm'>{errors?.division?.message}</span>}
       
       </div>
</div>
     
     <div className='mt-4 w-full justify-between flex gap-10'>
          <div className=' w-1/2'>
          <label>Product*</label>
       <select  className=' inputbg w-full capitalize mt-3' {...register("product")} >
            <option value="Godrej">Godrej</option>
            <option value="Voltas">Voltas</option>
            <option value="Carrier">Carrier</option>
            <option value="Hitachi">Hitachi</option>
            <option value="Lloyd">Lloyd</option>
            <option value="Blue-star">Blue star</option>
            <option value="Lg">Lg</option>
            <option value="Samsung">Samsung</option>
       </select>  {errors.product && <span className='text-red-600 text-sm'>{errors?.product?.message}</span>}
        
          </div>
          <div className=' w-1/2'>
          <label>Email*</label>
       <select  className=' w-full inputbg capitalize mt-3' {...register("email")} >
            <option value="Koram.Bora@tpnodl.com">Koram.Bora@tpnodl.com</option>
            <option value="Aurobindalala@voltas.com">Aurobindalala@voltas.com</option> 
            </select>  {errors.email && <span className='text-red-600 text-sm'>{errors?.email?.message}</span>}
       
          </div>
     </div>
 
        <label>Serial*</label>
        <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="text"  {...register("serial")}  placeholder='serial '/>
        {errors?.serial && <span className='text-red-600 text-sm'>{errors?.serial?.message}</span>}

        <label>Modelno*</label>
        <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("modelno")}  placeholder='modelno '/> 
        {errors?.modelno && <span className='text-red-600 text-sm'>{errors?.modelno?.message}</span>}
       
        
        <button className=' px-5 py-3 w-full mt-10 buttonbg w-24' disabled={isSubmitting} type="submit">Sumbit</button>
        </form>
    </div>
  )
}

export default AdminForm