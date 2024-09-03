import { qa } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {
  const { question } = await request.json()
  const user = await getUserByClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {  // getting only few details
      content: true,
      createdAt: true,
    },
  })

  //const answer = await qa(question, entries)  need to have paid version of open ai api to work this
  return NextResponse.json({ data: "Hell yaaa"})
}