import { NextResponse } from "next/server";

export async function GET() {
    NextResponse.json({message: "My-Calendar: server re-activated"})
}