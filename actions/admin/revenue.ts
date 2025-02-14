'use server'

import { prisma } from "@/lib/prisma"
import { handelError } from "@/lib/utils/error"

export const reveneueAction = async () => {
    try {
        const data = await prisma.jobsheet.findMany({
            select: {
                totalAmount: true,
                id: true,
                product:true,
                actionTaken: true,
                createdAt: true 
            }
        }) 
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        handelError(error , 'revenueAction')
    }
}