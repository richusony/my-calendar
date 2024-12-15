import prisma from "@/lib/prisma";
import { UserEventType } from "@/types/types";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    const data: UserEventType = await req.json();

    if (!data.event_name) return new Response("Event Name is Required", { status: 400 });

    try {
        const { userId } = getAuth(req);
        if (!userId) return new Response("User Not Authorized", { status: 401 });

        const currentUser = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        });
        if (!currentUser) return new Response("User Not Found", { status: 404 });

        await prisma.userEvent.update({
            where: {
                id: data.id,
                user_id: data.user_id
            },
            data: {
                event_name: data.event_name,
                event_url: data.event_url,
                event_time: data.event_time,
                event_date: data.event_date
            }
        });

        return new Response("Event Updated Successfully", { status: 201 });
    } catch (error) {
        console.log("Error adding event:", error);
        return new Response('Error: Could not add event', {
            status: 400,
        });
    }
}