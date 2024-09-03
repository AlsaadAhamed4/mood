import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
    const user = await getUserByClerkID();
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        select: {
            sentimateScore: true,
        },
    })

    const sum = analyses.reduce((all, cur) => all + cur.sentimateScore, 0)
    const avg = Math.round(sum / analyses.length)
    return { analyses, avg }
}

const History = async () => {
    const { analyses, avg } = await getData();
    return (
        <div>History:{avg}</div>
    )
}

export default History;