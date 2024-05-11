import db from "@/lib/db"
// import { hash } from "crypto"
import {hash} from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    // console.log(req)
    const body = await req.json()
    const {fullName, phoneNumber, userName, password}= body
    const newpassword= await hash(password, 10)
    // console.log(newpassword)
    // console.log( body)
    try {
        const pnumber = await db.user.findFirst({where:{
            phoneNumber
        }})
        if(pnumber){
            return NextResponse.json({succes:false, message:"phone number already exist"}, {status:404})
        } 
        const user= await db.user.create({data: {fullName, phoneNumber,userName, password: newpassword}})
    if (!user) {return NextResponse.json({success: false}, {status: 404}) }
    return NextResponse.json({success: true}, {status: 200})
   
    } catch (error) {
        // console.log(error)
        const b = await error
        if (error.code === "P2002") {
            const b =  `${error.meta.target}`
            // console.log( b + " already exit")
   return NextResponse.json({success: false,message: b.toLocaleLowerCase() + " already exist" }, {status: 500})

        }
   return NextResponse.json({success: false,message: b}, {status: 500})

    }
}