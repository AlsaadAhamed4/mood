import { auth } from "@clerk/nextjs"
import { prisma } from "./db";

export const getUserByClerkID =  async ()=>{
    const {userId} =  await auth();
    const user =  prisma.user.findFirstOrThrow({
        where:{
            clerkId : userId as string,
        },
    })
    return user;
}