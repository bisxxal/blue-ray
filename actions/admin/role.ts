'use server'

import { PropsAuth } from "@/constants";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { handelError } from "@/lib/utils/error";
import { getServerSession } from "next-auth";

export const currentUser = async () => {
    try {
        const session = (await getServerSession(authOptions)) as any;
        const user = await prisma.user.findUnique({
            where:{
                email:session?.user?.email
            },
            select:{
                email:true,
                name:true,
                role:true,
                id:true,
                image:true
            }
        })
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handelError(error , "currentUser");
    }
}