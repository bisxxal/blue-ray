import { z } from 'zod'
export const jobSheet = z.object({
    email: z.string().email('Invalid email'),
    address: z.string().min(2 ,'address must be atleast 2 characters'),
    circle: z.string().min(2 ,'circle must be atleast 2 characters'),
    division: z.string().min(2 ,'division must be atleast 2 characters'),
    product: z.string().min(2 ,'product must be atleast 2 characters'),
    serial: z.coerce.number().min(1, { message: "serial is required!" }),
    modelno:z.coerce.number().min(1, { message: "modelno is required!" }),
  })
export type TJobSheet = z.infer<typeof jobSheet>  

export const userForm = z.object({
    name: z.string().min(3 ,'name must be atleast 3 characters'),
    email: z.string().email('Invalid email'),
    service: z.string().min(3 ,'service must be atleast 3 characters'),
    complainId: z.coerce.number().min(1, { message: "tax is required!" }),
    description: z.string().min(3 ,'description must be atleast 3 characters'),
  })
export type TuserForm = z.infer<typeof userForm>  
 
export const createEmp = z.object({
    name: z.string().min(3 ,'name must be atleast 3 characters'),
    email: z.string().email('Invalid email'),
    city: z.string().min(3 ,'city must be atleast 3 characters'), 
  })
export type TcreateEmp = z.infer<typeof createEmp>  