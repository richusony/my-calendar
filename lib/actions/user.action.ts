"use server"

import {} from "@prisma/client";

type UserType = {
    clerkId: string;
    fullName: string;
    email: string;
}
export async function createUser(user:UserType) {
    // add user to postgres using primsa
}