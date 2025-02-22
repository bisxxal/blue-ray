'use server'
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const currentUser = async () => {
    try {
        const session = await getServerSession(authOptions);
        if(session){
            const user = await prisma.user.findUnique({
                where:{
                    email:session?.user?.email as string
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
            return JSON.parse(JSON.stringify(user));
        }
        
        // return JSON.parse(JSON.stringify(user));
    } catch (error) {
        // console.log('first' , error)
        // handelError(error , "CurrentUser in role.ts");
    }
}