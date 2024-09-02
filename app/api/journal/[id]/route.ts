import { analyze } from "@/utils/ai";
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
    // const analysis = await analyze(updateEntry.content)
    // const updatedAnalysis =  await prisma.analysis.upsert({  // if u find then update else create a new one
    //     where :{
    //         entryID : updateEntry.id  
    //     },
    //     create :{  // if you dont find in the db then add new data
    //         entryId :  updateEntry.id,
    //         ...analysis
    //     },
    //     update : analysis,  // if found update the analysis
    // })
    //  return NextResponse.json({data : {...updateEntry, analysis : updatedAnalysis}})
    
    return NextResponse.json({data : updateEntry})  // since the is like patch call we will send the updated data back
}