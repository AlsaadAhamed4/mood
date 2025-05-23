import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    const navData = [
        { href: '/', label: 'Home' },
        { href: '/journal', label: 'Journal' },
        { href: '/history', label: 'History' },
    ]
    return (
        <div className="h-screen w-screen relative">
            <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
                <div>
                    Mood
                </div>
                <ul>
                    {
                        navData.map((item) => (
                            <li className="px-2 py-4 text-xl">
                                <Link href={item.href} >
                                    {item.label}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </aside>
            <div className="ml-[200px] h-full">
                <header className="h-[60px] border-b border-black/10">
                    <div className="h-full w-full px-6 flex items-center justify-end">
                        <UserButton />
                    </div>
                </header>
                <div className="w-[calc(100vw-200px)] h-[calc(100vh-66px)]">
                    {children}
                </div>
            </div>
        </div>
    )
}
