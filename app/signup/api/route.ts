import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json();
    console.log(data);

    return new Response('Account Created', {
        status: 200
    })
}