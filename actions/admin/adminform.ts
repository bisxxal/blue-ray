'use server'

import { prisma } from "@/lib/prisma"
import { handelError } from "@/lib/utils/error"
import { TJobSheet, TcreateEmp } from "@/lib/zod"

export const jobSheetAction = async (data:TJobSheet) => {
    try { 
        const job = await prisma.jobsheet.create({
            data:{
                email:data.email,   
                address:data.address,
                circle:data.circle,
                product:data.product,
                division:data.division,
                serial :data.serial,
                modelno :data.modelno
            }
        })
        //  console.log("pushed",job)
    } catch (error) {
        handelError(error , 'jobSheetAction')
    }
}

export const AllJobSheetAction = async () => {
    try { 
        const job = await prisma.jobsheet.findMany({
            select: {
                email: true,
                address: true,
                circle: true,
                product: true,
                division: true,
                id: true    
            }
        });
         
        return JSON.parse(JSON.stringify(job));  
        
    } catch (error) {
        console.log(error);  
        handelError(error, 'JobSheet');  
    }
}
export const SingleJobSheetAction = async (id:string) => {
    try { 
        const job = await prisma.jobsheet.findMany({
            where:{
                id
            },
            select: {
                email: true,
                address: true,
                circle: true,
                product: true,
                division: true,
                id: true,
                serial:true,
            }
        });
         
        return JSON.parse(JSON.stringify(job));  
        
    } catch (error) {
        console.log(error);  
        handelError(error, 'JobSheet');  
    }
}
// access 
// give access

export const AccessGive = async (city:string , email:string) => {
    try {
        // console.log(city , email)
        const emp = await prisma.user.update({
            where:{
                email
            },
            data:{
                city,
                email
            }
        })
        // console.log(emp)
        return JSON.parse(JSON.stringify({status:200}))
    } catch (error) {
        handelError(error , 'AccessGive')
        return JSON.parse(JSON.stringify({status:404}))
    }
}

export const AllEmployee = async () => {
    try {
        const emp = await prisma.user.findMany({
            where:{
               role: 'emp'
            },
            select:{
                email:true,
                name:true,
                role:true,
                id:true,
                image:true,
                city:true
            }
        })
        return JSON.parse(JSON.stringify(emp))

    } catch (error) {
        handelError(error , 'AllEmployee')
    }

}

export const AddEmp = async (data:TcreateEmp) => {
    try {
        // console.log(data)
        const addEmp = await prisma.user.create({
            data:{
                email:data.email,
                name:data.name,
                role:'emp',
                city:data.city
            }

        })
    } catch (error) {
        handelError(error , 'createEmp')    
    }
}