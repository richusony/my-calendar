"use server"

import prisma from "../prisma";

type UserType = {
    clerkId: string;
    firstName: string | null;
    email: string;
}
export async function createUser(user: UserType) {
    // add user to postgres using primsa
    try {
        const addUser = await prisma.user.create({
            data: {
                clerkId: user.clerkId,
                email: user.email,
                firstName: user.firstName
            }
        });
        return addUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
}