import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation'

const createNewUser = async () => {
    const user = await currentUser();
    const match = await prisma.user.findUnique({
        where: {
            clerkId: user?.id as string,
        }
    })
    if (!match) {  // new user
        const newUser = await prisma.user.create({
            data: {
                clerkId: user?.id as string,
                email: user?.emailAddresses[0].emailAddress as string
            }
        })
    }

    redirect('/journal')
}

const NewUser = async () => {
    await createNewUser();
}

export default NewUser;