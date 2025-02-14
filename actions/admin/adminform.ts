'use server'

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { handelError } from "@/lib/utils/error"
import { TJobSheet, TcreateEmp } from "@/lib/zod"
import { getServerSession } from "next-auth"

export const jobSheetAction = async (data:TJobSheet) => {
    try {
        // console.log('first',data)
        const session = await getServerSession(authOptions)
        const { email , address , circle , product , division , serial , modelno , earthing , stabilizer , IPVoltage , OPVoltage , grillTemperature , roomTemperature , ambientTemperature , technicianName , visitDate , faultFound , actionTaken , extraMaterial , copperPipe , drainPipe , wire , ODUStand , PinPlug , airFilter , technicianComments , newSparepartConsumed , PartReplacementDetails  } = data      
        const job = await prisma.jobsheet.create({
            data:{
                email,
                address,
                circle,
                product,
                division,
                serial,
                modelno ,
                earthing,
                stabilizer,
                IPVoltage,
                OPVoltage,
                grillTemperature,
                roomTemperature,
                ambientTemperature,
                technicianName,
                visitDate,
                faultFound,
                actionTaken,
                extraMaterial,
                copperPipe:data?.copperPipe! as number,
                drainPipe:data?.drainPipe! as number,
                wire:data?.wire! as number,
                ODUStand:data?.ODUStand! as number,
                PinPlug:data.PinPlug! as number,
                airFilter:data?.airFilter! as number,
                technicianComments,
                newSparepartConsumed,
                PartReplacementDetail:data.PartReplacementDetails ? data.PartReplacementDetails : [],
                
                madeBy: session?.user?.email!,

            }
        })
        //  console.log("pushed",job)
         return JSON.parse(JSON.stringify({status:200}))
    } catch (error) {
        // console.log(error)
        handelError(error , 'jobSheetAction')
        return JSON.parse(JSON.stringify({status:404}))
    }
}

export const AllJobSheetAction = async () => {
    try { 
        const job = await prisma.jobsheet.findMany({
            orderBy:{
                createdAt:'desc'    
            },
            select: {
                email: true,
                address: true,
                circle: true,
                product: true,
                division: true,
                id: true,
                madeBy: true,
                serial:true,  
                modelno:true,
                callClosed:true,
                verifiedBy:true,
                totalAmount:true,
                visitDate:true,
                createdAt:true,
            }
        });
         
        return JSON.parse(JSON.stringify(job));  
        
    } catch (error) {
        console.log(error);  
        handelError(error, 'JobSheet');  
        return JSON.parse(JSON.stringify({status:404}))
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
        return JSON.parse(JSON.stringify({status:404}))
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
                city:true,

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

export const VerifyJobSheet = async (id:string ,callClosed:string , verified:string) => {
    try {
          await prisma.jobsheet.update({
            where:{
                id
            },
            data:{
                verifiedBy:verified,
                callClosed
            }
        })
        return JSON.parse(JSON.stringify({status:200}))
    } catch (error) {
        handelError(error , 'VerifyJobSheet')
        return JSON.parse(JSON.stringify({status:404}))
    }
}
