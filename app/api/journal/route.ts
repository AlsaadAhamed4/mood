import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(request : NextRequest)=>{
 const user =  await getUserByClerkID();
 const entry = await prisma.journalEntry.create({
    data:{
        userId : user.id,
        content : 'Write about your day!'
    }
 })
 return NextResponse.json({data: entry})
}