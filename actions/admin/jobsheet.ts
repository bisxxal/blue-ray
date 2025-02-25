'use server'

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { handelError } from "@/lib/utils/error"
import { TJobSheet } from "@/lib/zod"
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
 
export const AllJobSheetAction = async (page: number = 1, limit: number = 4) => {
    try {
        // Fetching the total count of records to calculate total pages
        // const totalJobSheets = await prisma.jobsheet.count();

        // // Fetching job sheets with pagination
        // const jobs = await prisma.jobsheet.findMany({
        //     orderBy: {
        //         createdAt: 'desc', // Sorting by createdAt
        //     },
        //     select: {
        //         email: true,
        //         address: true,
        //         circle: true,
        //         product: true,
        //         division: true,
        //         id: true,
        //         madeBy: true,
        //         serial: true,
        //         modelno: true,
        //         callClosed: true,
        //         verifiedBy: true,
        //         totalAmount: true,
        //         visitDate: true,
        //         createdAt: true,
        //         complains: {
        //             select: {
        //                 status: true,
        //             },
        //         },
        //     },
        //     skip: (page - 1) * limit, // Calculate the number of items to skip based on the page
        //     take: limit, // Limit the number of records per page
        // });
        const [jobs, totalJobSheets] = await prisma.$transaction([
            
            prisma.jobsheet.findMany({
                    orderBy: {
                        createdAt: 'desc', // Sorting by createdAt
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
                    skip: (page - 1) * limit, // Calculate the number of items to skip based on the page
                    take: limit, // Limit the number of records per page
                }),

           prisma.jobsheet.count()
          ]);

        // Return both the data and the total count for pagination calculations
        return {
            data: JSON.parse(JSON.stringify(jobs)),
            total: totalJobSheets,
        };
    } catch (error) {
        console.log(error);
        handelError(error, 'JobSheet');
        return { status: 404 };
    }
};


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

export const deleteJobSheet = async (id:string) => {
    try {
        await prisma.jobsheet.delete({
            where:{
                id
            }
        })
        return JSON.parse(JSON.stringify({status:200}))
    } catch (error) {
        handelError(error , 'deleteJobSheet')
        return JSON.parse(JSON.stringify({status:404}))
    }
}

export const UpdateJOBSheetAction = async (data:TJobSheet , id:string) => {
    try {
        // console.log('first',data)
        const session = await getServerSession(authOptions)
        const { email , address , circle , product , division , serial , modelno , earthing , stabilizer , IPVoltage , OPVoltage , grillTemperature , roomTemperature , ambientTemperature , technicianName , visitDate , faultFound , actionTaken , extraMaterial , copperPipe , drainPipe , wire , ODUStand , PinPlug , airFilter , technicianComments , newSparepartConsumed , PartReplacementDetails  } = data      
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
    } catch (error) {

        handelError(error , 'UpdateJOBSheetAction')
        return JSON.parse(JSON.stringify({status:404}))
    }
}

export const FeatchJOBSheetData = async ( id:string) => {
    try {
        console.log('fetching in server' , id)
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