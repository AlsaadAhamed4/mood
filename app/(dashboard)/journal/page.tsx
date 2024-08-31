import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntries = async () => {
    const user = await getUserByClerkID();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return entries;
}


const Journal = async () => {
    const entries = await getEntries();
    console.log(entries, 'these are entries')
    return (
        <div>This is journal pageview</div>
    )
}

export default Journal;