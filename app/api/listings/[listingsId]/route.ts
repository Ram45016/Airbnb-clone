import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams{
    listingsId?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser=await getCurrentUser();
    if(!currentUser){
       return NextResponse.error(); 
    }

    const {listingsId}=params;
    if(!listingsId || typeof listingsId !=="string"){
        throw new Error("Invalid ID");  
    }
    const listings=await prisma.listing.deleteMany({
        where:{
            id:listingsId,
            userId:currentUser.id
        }
    });

    return NextResponse.json(listings);
}