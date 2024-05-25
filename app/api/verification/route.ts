import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    console.log(currentUser);
    if (!currentUser) {
        return NextResponse.error();
    }

    const { id } = currentUser; 
    if (!id || typeof id !== "string") {
        throw new Error("Invalid user ID");
    }

    const body = await request.json();
    const { timestamp } = body;

    if (!timestamp || isNaN(Date.parse(timestamp))) {
        throw new Error("Invalid timestamp");
    }

    // Update the user's record in the database with the timestamp
    const updatedUser = await prisma.user.update({
        where: {
            id,
        },
        data: {
            emailVerified: new Date(timestamp),
        },
    });

    return NextResponse.json(updatedUser);
}
