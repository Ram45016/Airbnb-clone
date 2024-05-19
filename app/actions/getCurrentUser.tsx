import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "../libs/prismadb";

export async function getSession(){
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
    try{
        const session=await getSession();
        console.log(session);
        if(!session?.user?.email){
            return null;
        }
        console.log(session.user);
        const currentUser=await prisma.user.findUnique({
            where:{
                email: session.user.email as string
            }
        });
        console.log(currentUser);
        if(!currentUser){
            return null;
        }
        return {
            ...currentUser,
                 createdAt: currentUser.createdAt.toISOString(),
                 updatedAt: currentUser.updatedAt.toISOString(),
                 emailVerified: currentUser.emailVerified?.toString()||null
        };
    }
    catch(error: any){
        console.log("na summa thaa irukkaen");
        return null;
    }
}