import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { id } = currentUser; // Assuming the user ID is stored in the currentUser object
    if (!id || typeof id !== "string") {
        throw new Error("Invalid user ID");
    }

    const body = await request.json();
    const { image } = body;
    if (!image || typeof image !== "string") {
        throw new Error("Invalid image data");
    }

    // Update the user's record in the database with the new image data
    const updatedUser = await prisma.user.update({
        where: {
            id,
        },
        data: {
            image,
        },
    });

    return NextResponse.json(updatedUser);
}
