'use server'

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { handelError } from "@/lib/utils/error"
import { getServerSession } from "next-auth"


export const reveneueAction = async () => {
    try {
        const data = await prisma.jobsheet.findMany({
            select: {
                totalAmount: true,
                id: true,
                product:true,
                actionTaken: true,
                createdAt: true ,
                madeBy:true
            },
            where:{
                
            }
        }) 
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        handelError(error , 'revenueAction')
    }
}


export const reveneueActionForEmp = async (year: number , email:string) => {
  try {
      // const session = await getServerSession(authOptions)
    const data = await prisma.jobsheet.findMany({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01T00:00:00.000Z`), 
          lte: new Date(`${year}-12-31T23:59:59.999Z`),   
        },
        madeBy: email!,
      },
      select: {
        totalAmount: true,
        createdAt: true,
        madeBy: true,
      },
    });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    handelError(error, 'revenueAction');
  }
};
