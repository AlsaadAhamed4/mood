import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db";

const getEntry = async (id) => {
    const user = await getUserByClerkID();
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {  // this is allowed untill me make the userId in journal schema to be unique + compound with id 
                userId: user.id,
                id,
            }
            // include:{  // we can add in the query itself
            //     analysis : true
            // }
        }
    })
    return entry;
}

const EntryPage = async ({ params }) => {
    const entry = await getEntry(params.id);
    return (
        <div className="w-full h-full">
                <Editor entry={entry} />
        </div>
    )
}

export default EntryPage;