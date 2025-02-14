'use client';
import { jobSheetAction } from '@/actions/admin/adminform';
import { jobSheet, TJobSheet } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
      
const Jobsheet = () => {
    const { register, handleSubmit , formState:{errors , isSubmitting},reset, } = useForm<TJobSheet>({resolver:zodResolver(jobSheet)})

     const onSubmit = async(data:TJobSheet) => {
      const res= await jobSheetAction(data)
     console.log(data)

     if(res?.status === 200){
          toast.success('Job sheet created');
     }
     else{
          toast.error('Something went wrong');
     }
    }
    const [showMaterial, setShowMaterial] = useState('false')
    const [showSpare, setshowSpare] = useState('false')

  return (
    <div className=' w-full h-screen flex gap-6 pt-10 items-center flex-col '>
      <h1 className=' font-bold text-center text-4xl '>BlueRay_Jobsheet</h1>

      {/* { user && <h1 className=' w-full mx-auto text-center'>Made By - <input className=' bg-transparent border-none w-[200px] outline-none p-2 rounded-xl ' type="text" {...register("madeBy")} defaultValue={user} readOnly /> </h1>} */}
          <h2 className=' text-center text-2xl'>Please fill the form</h2>
 
        <form className=' flex flex-col w-5/6  !mx-auto gap-3' onSubmit={handleSubmit(onSubmit)}> 

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
        <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("serial")}  placeholder='serial '/>
        {errors?.serial && <span className='text-red-600 text-sm'>{errors?.serial?.message}</span>}

        <label>Modelno*</label>
        <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("modelno")}  placeholder='modelno '/> 
        {errors?.modelno && <span className='text-red-600 text-sm'>{errors?.modelno?.message}</span>}
       
     <div>
      <p>Earthing*</p>
      <div className='mt-3 gap-5 flex '>
      <input type="radio" id="ok"  {...register("earthing")}  value="OK"/>
      <label htmlFor="ok">OK</label>
      <input type="radio" id="ng"  {...register("earthing")}  value="NG"/>
      <label htmlFor="ng">NG</label>
      </div>
     </div>


     <div>
      <p>Stabilizer*</p>
      <div className='mt-3 gap-5 flex '>
      <input type="radio" id="ok"  {...register("stabilizer")}  value="OK"/>
      <label htmlFor="ok">OK(GOOD)</label>
      <input type="radio" id="ng"  {...register("stabilizer")}  value="NG"/>
      <label htmlFor="ng">NG (NOT GOOD)</label>
      <input type="radio" id="NA"  {...register("stabilizer")}  value="NA"/>
      <label htmlFor="NA">NA (NOT AVAILABLE)</label>
      </div>
     </div>


       <label>IP Voltage *</label>
        <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("IPVoltage")}  placeholder='45'/>
        {errors?.IPVoltage && <span className='text-red-600 text-sm'>{errors?.IPVoltage?.message}</span>}

        <label>Grill Temperature *</label>
        <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("grillTemperature")}  placeholder='34'/>
        {errors?.grillTemperature && <span className='text-red-600 text-sm'>{errors?.grillTemperature?.message}</span>}
      
        <label>OPVoltage *</label>
        <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("OPVoltage")}  placeholder='76'/>
        {errors?.OPVoltage && <span className='text-red-600 text-sm'>{errors?.OPVoltage?.message}</span>}


        <label>Room Temperature *</label>
        <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("roomTemperature")}  placeholder='20'/>
        {errors?.roomTemperature && <span className='text-red-600 text-sm'>{errors?.roomTemperature?.message}</span>}


        <label>Ambient Temperature *</label>
        <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("ambientTemperature")}  placeholder='65'/>
        {errors?.ambientTemperature && <span className='text-red-600 text-sm'>{errors?.ambientTemperature?.message}</span>}

          <label>Technician Name*</label>
          <select  className=' inputbg w-full capitalize mt-3' {...register("technicianName")} >
          <option value="Minnaz Quadri">Minnaz Quadri</option>
          <option value="Biswajit">Biswajit</option>
          <option value="Nizam Quadri">Nizam Quadri</option>
          <option value="Azazul">Azazul</option>
          <option value="Ikbal">Ikbal</option>
          <option value="azharuddin">azharuddin</option>
       </select>  {errors.technicianName && <span className='text-red-600 text-sm'>{errors?.technicianName?.message}</span>}
        
          <label>Date of Visit*</label>
          <input className='p-2 rounded-xl inputbg bg-transparent' type="datetime-local" {...register("visitDate")}/>
          {errors?.visitDate && <span className='text-red-600 text-sm'>{errors?.visitDate?.message}</span>}


          <label>Fault Found *</label>
          <textarea className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2'  {...register("faultFound")}  placeholder='faultFound '/>

        <div className=''>
        <label>Action Taken*</label>
          <p>Only select the resolution from the below</p>

          <div className='my-2 gap-5 flex '>
          <input type="checkbox" id="servicing"{...register("actionTaken")} value="servicing"/>
          <label htmlFor="servicing">Servicing</label>
          </div>

          <div className='my-2 gap-5 flex '>
          <input type="checkbox" id="repairing" {...register("actionTaken")} value="repairing"/>
          <label htmlFor="repairing">Repairing</label>
          </div>

          <div className='my-2 gap-5 flex '>
          <input type="checkbox" id="gas charging" {...register("actionTaken")} value="gas charging"/>
          <label htmlFor="gas charging">Gas charging</label> 
          </div>

          <div className='my-2 gap-5 flex '>
          <input type="checkbox" id="Installation" {...register("actionTaken")} value="Installation"/>
          <label htmlFor="Installation">Installation</label> 
          </div>

          <div className='my-2 gap-5 flex '>
          <input type="checkbox" id="Dismantling" {...register("actionTaken")} value="Dismantling"/>
          <label htmlFor="Dismantling">Dismantling</label> 
          </div>

          <div className='my-2 gap-5 flex '>

          <input type="checkbox" id="Compressor Change" {...register("actionTaken")} value="Compressor Change"/>
          <label htmlFor="Compressor Change">Compressor Change</label> 
          </div>

          <div className='my-2 gap-5 flex '>

          <input type="checkbox" id="Condensor Change" {...register("actionTaken")} value="Condensor Change"/>
          <label htmlFor="Condensor Change">Condensor Change</label> 
          </div>

          <div className='my-2 gap-5 flex '>

          <input type="checkbox" id="Evaporator Change" {...register("actionTaken")} value="Evaporator Change"/>
          <label htmlFor="Evaporator Change">Evaporator Change</label> 
          </div>

        </div>
{/*  yes no starts herere */}
       <div className=''>
          <p>Extra material consumed*</p>
          <select className=' w-full inputbg capitalize mt-3' {...register("extraMaterial", { onChange: (e) => setShowMaterial(e.target.value) })} >
            <option value="false">No</option> 
            <option value="true">Yes</option>
            </select>  {errors.extraMaterial && <span className='text-red-600 text-sm'>{errors?.extraMaterial?.message}</span>}
       </div>


    { showMaterial === 'true' && <>
     <div className='w-full justify-between flex gap-10 mt-4'>

     <div className=' w-1/2'>
          <label>Copper pipe*</label>
          <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("copperPipe")}  placeholder='2'/>
          {errors?.copperPipe && <span className='text-red-600 text-sm'>{errors?.copperPipe?.message}</span>}
          </div>

          <div className=' w-1/2'>
          <label>Drain pipe</label>
          <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("drainPipe")}  placeholder='65'/>
          {errors?.drainPipe && <span className='text-red-600 text-sm'>{errors?.drainPipe?.message}</span>}
          </div>

     </div>


     <div className='w-full justify-between flex gap-10 mt-4'>
     <div className=' w-1/2'>
          <label>Wire</label>
          <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("wire")}  placeholder='2'/>
          {errors?.wire && <span className='text-red-600 text-sm'>{errors?.wire?.message}</span>}
          </div>
          <div className=' w-1/2'>
          <label>ODU Stand</label>
          <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("ODUStand")}  placeholder='5'/>
          {errors?.ODUStand && <span className='text-red-600 text-sm'>{errors?.ODUStand?.message}</span>}
          </div>
     </div>


     <div className='w-full justify-between flex gap-10 mt-4'>
          <div className=' w-1/2'>
          <label>3 Pin Top</label>
          <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("PinPlug")}  placeholder='2'/>
          {errors?.PinPlug && <span className='text-red-600 text-sm'>{errors?.PinPlug?.message}</span>}
          </div>
          <div className=' w-1/2'>
          <label>Air filter</label>
          <input className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2' type="number"  {...register("airFilter")}  placeholder='5'/>
          {errors?.airFilter && <span className='text-red-600 text-sm'>{errors?.airFilter?.message}</span>}
          </div>
     </div>  </> }

     <label>Technician Comments*</label>
     <textarea className=' bg-transparent inputbg rounded-xl w-full block mt-3 border p-2'  {...register("technicianComments")}  placeholder='Technician Comments '/>
         <div>
          <label>New Sparepart Consumed*</label>
          <select  className=' w-full inputbg capitalize mt-3' {...register("newSparepartConsumed",{ onChange: (e) => setshowSpare(e.target.value) })} >
            <option value="false">No</option> 
            <option value="true">Yes</option>
            </select>  {errors.newSparepartConsumed && <span className='text-red-600 text-sm'>{errors?.newSparepartConsumed?.message}</span>}
           </div>
      

    { showSpare === 'true' &&  
    <div className=' flex flex-col '>
        <label>Part Replacement Details*</label>
          <p>Add part replacement details to it. Select the parts consumed.</p>

         <div>
         <input type="checkbox" id="50 MFD Capacitor"{...register("PartReplacementDetails")} value="50 MFD Capacitor"/>
         <label htmlFor="50 MFD Capacitor"> 50 MFD Capacitor</label>
         </div>

          <div>
          <input type="checkbox" id="40/45 MFD Capacitor" {...register("PartReplacementDetails")} value="40/45 MFD Capacitor"/>
          <label htmlFor="40/45 MFD Capacitor">40/45 MFD Capacitor</label>
          </div>

             // add more fileds here

        </div>}
     {/* {errors && <span className='text-red-600 text-sm'>Something went wrong</span>} */}
        <button className=' px-5 py-3  mt-10 buttonbg w-24' disabled={isSubmitting} type="submit">Sumbit</button>
        </form>
    </div>
  )
}

export default Jobsheet