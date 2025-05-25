import Footer from '@/Components/layout/Footer.jsx'
import TopHeader from '@/Components/layout/TopHeader.jsx'
import TopMenu from '@/Components/layout/TopMenu.jsx'
import { Head, usePage } from '@inertiajs/react'

export default function Master({ children, hideMenu = false }) {
    const { auth } = usePage().props

    return (
        <>
            <div className="flex flex-col min-h-screen w-full">
                <div className="w-full max-w-screen-2xl mx-auto">
                    <TopHeader user={auth.user} />
                </div>
            </div>
        </>
    )
}
