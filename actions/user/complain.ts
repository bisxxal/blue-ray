'use server'
import { prisma } from "@/lib/prisma"
import { handelError } from "@/lib/utils/error"
import { TuserComplainForm, TUserForm } from "@/lib/zod"

export const CreateComplain = async (data:TuserComplainForm) => {
    try {
        const verifyComp = await prisma.jobsheet.findUnique({
            where:{
                id:data.jobSheetId
            }
        })
        if(!verifyComp){
            return JSON.parse(JSON.stringify({status:201}))
        }
        const complain = await prisma.complains.create({
            data:{
                name:data.name,
                email:data.email,
                city:data.city,
                description:data.description,
                status:'New',
                jobSheetId:data.jobSheetId,
            }
        })
        if(complain){
            return JSON.parse(JSON.stringify({status:200}))        
        }
    } catch (error) {
        return JSON.parse(JSON.stringify({status:404}))    
        handelError(error,'Error in creating complain')
    }
}


export const CreateUserForm = async (data:TUserForm) => {
    try {

        const form =await prisma.userform.create({
            data:{
                informationDate:data.informationDate,
                location:data.location,
                email:data.email,
                machineInstalled:data.machineInstalled,
                make:data.make,
                type:data.type,
                tonnage:data.tonnage,
                serial:data.serial,
                priority:data.priority,
                problem:data.problem,
            }
        })
        console.log('in server',form)
        return JSON.parse(JSON.stringify({status:200}))
    } catch (error) {
        handelError(error,'Error in creating user form')
        return JSON.parse(JSON.stringify({status:404}))
    }
}

export const AllComplainForm  = async () => {
    try { 
        const job = await prisma.complains.findMany({
            orderBy:{
                createdAt:'desc'
            },
            select: {
                id  : true,
                email:  true, 
                createdAt: true,
                jobSheetId : true,
                city     : true,
                name   : true,
                description     : true,
                status: true,
            }
        });
         
        return JSON.parse(JSON.stringify(job));  
        
    } catch (error) {
        console.log(error);  
        handelError(error, 'All complain ');  
        return JSON.parse(JSON.stringify({status:404}))
    }
}


export const AllUsersForm  = async () => {
    try { 
        const job = await prisma.userform.findMany({
            select: {
                id  : true,
                informationDate:true,
                location: true,
                email:  true,
                machineInstalled:true,
                make:   true,
                type:  true,
                tonnage:    true,
                serial: true,
                priority:   true,
                problem:    true,
                call: true,
            }
        });
         
        return JSON.parse(JSON.stringify(job));  
        
    } catch (error) {
        console.log(error);  
        handelError(error, 'JobSheet');  
        return JSON.parse(JSON.stringify({status:404}))
    }
}
export const UpdateUserFormCall = async (id:string , call:string) => {
    try {
        const updated = await prisma.userform.update({
            where:{
                id:id
            },
            data:{
                call : call
            }
        })
        console.log(updated)
        if(updated){
        return JSON.parse(JSON.stringify({status:200}))}
        else{
            return JSON.parse(JSON.stringify({status:404}))
        }
    } catch (error) {
        // console.log(error)
        return JSON.parse(JSON.stringify({status:404}))
    }
}
export const UpdatedComplainStatus = async (id:string , status:string) => {
    try {
        const updated = await prisma.complains.update({
            where:{
                id:id
            },
            data:{
                status:status
            }
        })
        return JSON.parse(JSON.stringify({status:200}))
    } catch (error) {
        console.log(error)
        return JSON.parse(JSON.stringify({status:404}))
    }
}