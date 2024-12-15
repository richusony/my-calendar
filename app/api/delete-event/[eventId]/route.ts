import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function DELETE(req: NextRequest,{ params }:  {
    params: Promise<{ eventId: string }>
  }) {
    try {
        const { userId } = getAuth(req);
        // Await the params object
        const eventId = (await params).eventId;
        const event_id = parseInt(eventId, 10);

        if (!userId) return new Response("User Not Authorized", { status: 401 });

        const currentUser = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        });
        if (!currentUser) return new Response("User Not Found", { status: 404 });

        const event = await prisma.userEvent.findUnique({
            where: { id: event_id }
        });

        if (!event) return new Response("Event Not Found", { status: 404 });

        if (event.user_id !== currentUser.id) {
            return new Response("Unauthorized", { status: 403 });
        }

        await prisma.userEvent.delete({
            where: {
                id: event_id,
                user_id: currentUser.id
            }});

        return new Response("Event Deleted Successfully", { status: 200 });
    } catch (error) {
        console.log("Error deleting event:", error);
        return new Response('Error: Could not delete event', {
            status: 400,
        });
    }
}