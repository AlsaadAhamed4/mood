import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(request : NextRequest)=>{
 const user =  await getUserByClerkID();
 const entry = await prisma.journalEntry.create({
    data:{
        userId : user.id,
        content : 'Write about your day!'
    }
 })
 revalidatePath('/journal')
 return NextResponse.json({data: entry})
}