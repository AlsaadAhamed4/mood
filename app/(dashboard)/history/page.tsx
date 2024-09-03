import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
    const user = await getUserByClerkID();
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'asc',
        },
    })
    const metaData = [
        {
            id: 'aa1',
            createdAt: new Date(),
            updatedAt: new Date(),
            entryID: 'aaa1',
            userId: 'aaa1',
            mood: 'Calm',
            summary: 'This is a good day',
            color: '#9E5B6A',
            negative: false,
            subject: 'Good deed',
            sentimentScore: 5
        },
        {
            id: 'aa2',
            createdAt: new Date(),
            updatedAt: new Date(),
            entryID: 'aaa2',
            userId: 'aaa2',
            mood: 'Very Happy',
            summary: 'This is a good day',
            color: '#aa4158',
            negative: false,
            subject: 'Good deed v2',
            sentimentScore: 7
        },
        {
            id: 'aa3',
            createdAt: new Date(),
            updatedAt: new Date(),
            entryID: 'aaa3',
            userId: 'aaa3',
            mood: 'Very very Happy',
            summary: 'This is a good day',
            color: '#aa4158',
            negative: false,
            subject: 'Good deed v3',
            sentimentScore: 8
        }
    ]
    // const sum = analyses.reduce((all, cur) => all + cur.sentimentScore, 0)
    // const avg = Math.round(sum / analyses.length)
    const sum = metaData.reduce((all, cur) => all + cur.sentimentScore, 0)
    const avg = Math.round(sum / metaData.length)
    // return { analyses, avg }
    return { analyses: metaData, avg }
}

const History = async () => {
    const { analyses, avg } = await getData();
    return (
        <div className="w-full h-full">
            <div>{`Avg. Sentiment ${Number(avg)}`}</div>
            <div className="w-full h-full">
                <HistoryChart data={analyses} />
            </div>
        </div>
    )
}

export default History;