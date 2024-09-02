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
    //const {mood, summary, color, subject, negative} = entry  // sionce I added the analysis in query will get the data here
    const analysisData = [
        { name: 'Subject', value: '', },  // map the above desctructured value to this data. if you want to rethink for activating the open ai API
        { name: 'Summary', value: '', },
        { name: 'Mood', value: '', },
        { name: 'Negative', value: 'False', },
    ]
    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2">
                <Editor entry={entry} />
            </div>
            <div className="col-span-1 border border-black/10">
                {/* Add the color using styles */}
                <div className="bg-blue-300 px-6 py-10">
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                    <ul>
                        {
                            analysisData.map((item) => (
                                <li className="px-2 py-4 border-b border-t border-black/10 flex items-center justify-between" key={item.name}>
                                    <span className="text-lg font-semibold">{item.name}</span>
                                    <span>{item.value}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default EntryPage;