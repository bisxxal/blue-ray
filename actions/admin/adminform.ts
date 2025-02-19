'use server'
import { prisma } from "@/lib/prisma"
import { handelError } from "@/lib/utils/error"
import { TJobSheet, TcreateEmp } from "@/lib/zod"
 
export const AccessGive = async (city:string , id:string) => {
    try { 
        const emp = await prisma.user.update({
            where:{
                id
            },
            data:{
                city,
            },
        }) 
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
        // console.log(data)
        const addEmp = await prisma.user.create({
            data:{
                email:data.email,
                name:data.name,
                role:'emp',
                city:data.city
            }

        })
        return JSON.parse(JSON.stringify({status:200}))
    } catch (error) {
        handelError(error , 'createEmp')    
        return JSON.parse(JSON.stringify({status:404}))
    }
}

 