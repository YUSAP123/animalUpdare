import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {

    const body = await req.json()
    const { name , ClanId} = body

    const rabit = await db.rabit.create({
        data: {
            name,
            ClanId
        }
    })

    if (!rabit) {
        return NextResponse.json({success: false , message: "failed to create"} , {status: 400})
    }
    return NextResponse.json({success: true , message: rabit} , {status: 200})
}

export async function GET(req:Request) {
    const rabit = await db.rabit.findMany({
        include:{
            Clan: true
        }
    })
    if (!rabit) {
    return NextResponse.json({success: false , message: "failed to fetch rabit"} , {status: 400})
        
    }
    return NextResponse.json({success: true , message: rabit} , {status: 200})
}