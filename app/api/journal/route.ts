import { analyze } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const user = await getUserByClerkID();
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: 'Write about your day!'
        }
    })

    // const analysisDataFromAI = await analyze(entry.content);  // commented as of now since dont have paid version
    // await prisma.analysis.create({
    //     data: {
    //         entryID: entry.id,
    //         ...analysisDataFromAI,
    //     }
    // })

    revalidatePath('/journal')
    return NextResponse.json({ data: entry })
}