import prisma from "@/lib/prisma";
import { EventType } from "@/types/types";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    const data: EventType = await req.json();
    console.log(data);
    if (!data.eventName) return new Response("Event Name is Required", { status: 400 });

    try {
        const { userId } = getAuth(req);
        if (!userId) return new Response("User Not Authorized", { status: 401 });

        const currentUser = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        });
        if (!currentUser) return new Response("User Not Found", { status: 404 });

        await prisma.userEvent.create({
            data: {
                event_name: data.eventName,
                event_url: data.eventUrl,
                event_time: data.eventTime,
                user_id: currentUser.id,
                event_date: data.eventDate
            }
        });

        return new Response("Event Added Successfully", { status: 201 });
    } catch (error) {
        console.log("Error adding event:", error);
        return new Response('Error: Could not add event', {
            status: 400,
        });
    }
}