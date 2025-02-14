import { act } from 'react'
import { z } from 'zod'
export const jobSheet = z.object({
   
    email: z.string().email('Invalid email'),
    address: z.string().min(2 ,'address must be atleast 2 characters'),
    circle: z.string().min(2 ,'circle must be atleast 2 characters'),
    division: z.string().min(2 ,'division must be atleast 2 characters'),
    product: z.string().min(2 ,'product must be atleast 2 characters'),
    serial: z.coerce.number().min(1, { message: "serial is required!" }),
    modelno:z.coerce.number().min(1, { message: "modelno is required!" }),
    earthing: z.string(),
    stabilizer:z.string(),
    IPVoltage:z.coerce.number(),
    OPVoltage:z.coerce.number(),
    grillTemperature:z.coerce.number(),
    roomTemperature:z.coerce.number(),
    ambientTemperature:z.coerce.number(),
    technicianName:z.string().min(2 ,'TechnicianName must be atleast 2 characters'),  
    visitDate:z.coerce.date({ message: "Visted time is required!" }),
    faultFound:z.string().min(2 ,'Fault found must be atleast 2 characters'),
    actionTaken:z.string().array(),
    extraMaterial:z.string(),
    copperPipe:z.coerce.number().optional(),
    drainPipe:z.coerce.number().optional(),
    wire:z.coerce.number().optional(),
    ODUStand:z.coerce.number().optional(),
    PinPlug:z.coerce.number().optional(),
    airFilter:z.coerce.number().optional(),
    technicianComments:z.string().min(2 ,'Technician Comments must be atleast 2 characters'),
    newSparepartConsumed:z.string(),
    PartReplacementDetails:z.string().array().optional(), /// showing errror 
  })
export type TJobSheet = z.infer<typeof jobSheet>  

export const userComplainForm = z.object({
    name: z.string().min(3 ,'name must be atleast 3 characters'),
    email: z.string().email('Invalid email'),
    city: z.string(),
    complainId: z.string().min(1, { message: "complain Id is required!" }),
    description: z.string().min(3 ,'description must be atleast 3 characters'),
  })
export type TuserComplainForm = z.infer<typeof userComplainForm>  
 
export const createEmp = z.object({
    name: z.string().min(3 ,'name must be atleast 3 characters'),
    email: z.string().email('Invalid email'),
    city: z.string().min(3 ,'city must be atleast 3 characters'), 
  })
export type TcreateEmp = z.infer<typeof createEmp>


export const userForm = z.object({
  informationDate:z.coerce.date({ message: "Date is required!" }),
  location:z.string().min(2 ,'location must be atleast 2 characters'),
  email: z.string().email('Invalid email'),
  machineInstalled:z.string().min(2 ,'Machine Installed must be atleast 2 characters'),
  make:z.string().min(2 ,'Make must be atleast 2 characters'),
  type:z.string(),
  tonnage:z.string(),
  serial:z.coerce.number().min(1, { message: "serial is required!" }),
  priority:z.string(),
  problem:z.string().min(2 ,'Problem Statement must be atleast 2 characters'),
})
export type TUserForm = z.infer<typeof userForm>