import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import Question from '@/components/Question';
import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';

const getEntries = async () => {
    const user = await getUserByClerkID();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc'
        },
    })
    //await analyze('create me a vue component that renders me a counting number')  need to have credit at the openAI with payment so then it will work. 
    return entries;
}


const Journal = async () => {
    const entries = await getEntries();
    //console.log(entries, 'these are entries')
    return (
        <div className='p-10 bg-zinc-400/10 h-full'>
            <h2 className='text-3xl mb-8'>Journal</h2>
            <div className='mb-3'>
                <Question />
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <NewEntryCard />
                {
                    entries.map((entry) =>
                        <Link href={`/journal/${entry.id}`} key={entry.id} >
                            <EntryCard entry={entry} />
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Journal;