import { Head } from '@inertiajs/react'
import PublicHeader from '@/Components/layout/PublicHeader.jsx'
import Navigation from '@/Components/layout/PublicNavigation.jsx'
import PublicFooter from '@/Components/Layout/PublicFooter'
import PublicNavigation from '@/Components/layout/PublicNavigation.jsx'
import StickyHeader from '@/Components/layout/StickyHeader.jsx'
import LiveChat from '@/Components/LiveChat'
import ExitIntent from '@/Components/ExitIntent'

export default function Public({ auth, children }) {
    return (
        <>
            <Head title="Dynamic Content Management System" />
            <StickyHeader auth={auth} />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-blue-500 selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <PublicHeader />
                            <PublicNavigation auth={auth} />
                        </header>

                        <main className="mt-6">{children}</main>

                        <PublicFooter />
                    </div>
                </div>
            </div>
            <LiveChat />
            <ExitIntent />
        </>
    )
}
