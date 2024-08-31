import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request, {params})=>{
    const {content} = await request.json()
    const user =  await getUserByClerkID();
    const updateEntry = await prisma.journalEntry.update({
        where :{  // basically where / select that record
            userId_id :{
                userId : user.id,
                id : params.id
            },
        },
        data :{    // what u want to update 
            content,
        }
    })
    return NextResponse.json({data : updateEntry})  // since the is like patch call we will send the updated data back
}