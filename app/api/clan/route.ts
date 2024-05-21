import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    const body = await req.json()
    const {name , nickname} = body
    // console.log(body)

    // check if clan is already registerd


    const registerdClan = await db.clan.findUnique({
        where: {
            name
        }
    })

    if (registerdClan) {
        return NextResponse.json({success: false, message: " clan is already registed"}, {status: 400})
    }



    const clan = await db.clan.create({
        data: body
    })
    if (!clan) {
        return NextResponse.json({success: false, message: 'successfull add clan'}, {status: 500})
    }
    return NextResponse.json({success: true, message: 'successfull add clan'}, {status: 200})

}

export async function GET(req:Request) {
     const clan = await db.clan.findMany()
     if (!clan) {
        return NextResponse.json({success: false, message: 'successfull add clan'}, {status: 500})
     }
    return NextResponse.json({success: true, message: clan}, {status: 200})

}