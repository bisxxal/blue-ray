'use server'
import { prisma } from "@/lib/prisma";

export const currentUser = async (email:string) => {
    try {
        if(email){
            const user = await prisma.user.findUnique({
                where:{
                    email 
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
    } catch (error) {
        console.log('first' , error);
    }
}