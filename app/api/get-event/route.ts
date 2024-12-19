import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    const reqData = await req.json();
    const { userId } = getAuth(req);
    
    if (!userId) return new Response("User Not Authorized", { status: 401 });
    try {
        const userExists = await prisma.user.findFirst({
            where: {
                clerkId: userId
            }
        });
        if (!userExists) return new Response("User Not Found", { status: 404 });

        const userEvents = await prisma.userEvent.findMany({
            where: {
                user_id: userExists.id,
                event_date: reqData?.dateString
            }
        });
        
        return new Response(JSON.stringify(userEvents), {
            status: 200, headers: {
                "Content-Type": "application/json"
            }
        },)
    } catch (error) {
        console.error("Error fetching user events:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}