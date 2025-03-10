'use server'

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { handelError } from "@/lib/utils/error"
import { TJobSheet } from "@/lib/zod"
import { getServerSession } from "next-auth"

export const jobSheetAction = async (data:TJobSheet) => {
    try {
        const session = await getServerSession(authOptions)
        const { email , address , circle , product , division , serial , modelno , earthing , stabilizer , IPVoltage , OPVoltage , grillTemperature , roomTemperature , ambientTemperature , technicianName , visitDate , faultFound , actionTaken , extraMaterial , copperPipe , drainPipe , wire , ODUStand , PinPlug , airFilter , technicianComments , newSparepartConsumed , PartReplacementDetails  } = data      
       
        const job = await prisma.jobsheet.create({
            data:{ email, address, circle, product, division, serial, modelno , earthing, stabilizer, IPVoltage, OPVoltage, grillTemperature, roomTemperature, ambientTemperature, technicianName, visitDate, faultFound, actionTaken, extraMaterial,
                copperPipe:data?.copperPipe! as number,
                drainPipe:data?.drainPipe! as number,
                wire:data?.wire! as number,
                ODUStand:data?.ODUStand! as number,
                PinPlug:data.PinPlug! as number,
                airFilter:airFilter as number,
                technicianComments,
                newSparepartConsumed,
                PartReplacementDetail:data.PartReplacementDetails ? data.PartReplacementDetails : [],
                
                madeBy: session?.user?.email!,

            }
        })

        if(job){
            return JSON.parse(JSON.stringify({status:200}))
        }
        else{
            return JSON.parse(JSON.stringify({status:404}))
        }
    } catch (error) {
        handelError(error , 'jobSheetAction')
        return JSON.parse(JSON.stringify({status:404}))
    }
}
 
export const AllJobSheetAction = async (page: number = 1, limit: number = 4) => {
    try {
        const [jobs, total] = await prisma.$transaction([
            prisma.jobsheet.findMany({
                    orderBy: {
                        createdAt: 'asc',  
                    },
                    select: {
                        email: true,
                        address: true,
                        circle: true,
                        product: true,
                        division: true,
                        id: true,
                        madeBy: true,
                        serial: true,
                        modelno: true,
                        callClosed: true,
                        verifiedBy: true,
                        totalAmount: true,
                        visitDate: true,
                        createdAt: true,
                        complains: {
                            select: {
                                status: true,
                            },
                        },
                    },
                    skip: (page - 1) * limit,  
                    take: limit, 
                }),

           prisma.jobsheet.count()
          ]);
        
        return JSON.parse(JSON.stringify({data:jobs , total}))
    } catch (error) {
        console.log(error);
        handelError(error, 'JobSheet');
        return JSON.parse(JSON.stringify({status:404}))
    }
};


export const SingleJobSheetAction = async (id:string) => {
    if(!id){
        return JSON.parse(JSON.stringify({status:404}))
       }
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

export const VerifyJobSheet = async (id:string ,callClosed:string , verified:string) => {
    try {
        if(!id){
            return JSON.parse(JSON.stringify({status:404}))
           }
          const res = await prisma.jobsheet.update({
            where:{
                id
            },
            data:{
                verifiedBy:verified,
                callClosed
            }
        })
        if(res){
            return JSON.parse(JSON.stringify({status:200}))
        }
        else{
            return JSON.parse(JSON.stringify({status:404}))
        }
    } catch (error) {
        handelError(error , 'VerifyJobSheet')
        return JSON.parse(JSON.stringify({status:404}))
    }
}

export const deleteJobSheet = async (id:string) => {
    try {
        if(!id){
            return JSON.parse(JSON.stringify({status:404}))
        }
        const res = await prisma.jobsheet.delete({
            where:{
                id
            }
        })
        if(res){
            return JSON.parse(JSON.stringify({status:200}))
        }
        else{
            return JSON.parse(JSON.stringify({status:404}))
        }
        
    } catch (error) {
        handelError(error , 'deleteJobSheet')
        return JSON.parse(JSON.stringify({status:404}))
    }
}

export const UpdateJOBSheetAction = async (data:TJobSheet , id:string) => {
    try {
        const { email , address , circle , product , division , serial , modelno , earthing , stabilizer , IPVoltage , OPVoltage , grillTemperature , roomTemperature , ambientTemperature , technicianName , visitDate , faultFound , actionTaken , extraMaterial , copperPipe , drainPipe , wire , ODUStand , PinPlug , airFilter , technicianComments , newSparepartConsumed , PartReplacementDetails  } = data      
       
       if(!id){
        return JSON.parse(JSON.stringify({status:404}))
       }
        const job = await prisma.jobsheet.update({
            where:{
                id:id
            },
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

            }
        })

        if (job){
            return JSON.parse(JSON.stringify({job,status:200}))
        }
            return JSON.parse(JSON.stringify({status:404}))
    } catch (error) {

        handelError(error , 'UpdateJOBSheetAction')
        return JSON.parse(JSON.stringify({status:404}))
    }
}

export const FeatchJOBSheetData = async ( id:string) => {
    try {
        if(!id){
            return JSON.parse(JSON.stringify({status:404}))
           }
        const job = await prisma.jobsheet.findUnique({
            where:{
                id:id
            },   
        })
        if (job){
            return JSON.parse(JSON.stringify({job,status:200}))
        }
    } catch (error) {

        handelError(error , 'FetchJOBSheetData')
        return JSON.parse(JSON.stringify({status:404}))
    }
}