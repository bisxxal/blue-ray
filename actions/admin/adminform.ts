'use server'
import { prisma } from "@/lib/prisma"
import { handelError } from "@/lib/utils/error"
import { TcreateEmp } from "@/lib/zod"
export const AccessGive = async (city:string , id:string) => {
    if(!id){
        return JSON.parse(JSON.stringify({status:404}))
       }
    try { 
        const emp = await prisma.user.update({
            where:{
                id
            },
            data:{
                city,
            },
        })
        if(!emp){
            return JSON.parse(JSON.stringify({status:404}))
           }
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
                city:true,
            },
            orderBy:{
                email:'asc'
            }
        })
        return JSON.parse(JSON.stringify(emp))

    } catch (error) {
        handelError(error , 'AllEmployee')
        return JSON.parse(JSON.stringify({status:404}))
    }
}

export const AddEmp = async (data:TcreateEmp) => {
    try {
        const addEmp = await prisma.user.create({
            data:{
                email:data.email,
                name:data.name,
                role:'emp',
                city:data.city
            }
        })
        if(!addEmp){
            return JSON.parse(JSON.stringify({status:404}))
        }
        return JSON.parse(JSON.stringify({status:200}))
    } catch (error) {
        handelError(error , 'createEmp')    
        return JSON.parse(JSON.stringify({status:404}))
    }
}