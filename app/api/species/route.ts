import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req:Request) {

    const body=await req.json()
    console.log(body)
    const {name, nickName}=body
const checkIfexist= await db.specie.findFirst()
if (!checkIfexist) {
    let clan=1
    const species= await db.specie.create({
        data: {
            name: name,
            nickName,
            clan:`${clan}`
        }
    })
    if (!species) {
      return NextResponse.json({success:false, message: "unsuccessfully"}, {status:400})  
    }
}

console.log(findLast)






    return NextResponse.json({success:true, message: "successfully"}, {status:200})
}