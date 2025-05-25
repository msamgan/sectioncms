import Footer from '@/Components/layout/Footer.jsx'
import TopHeader from '@/Components/layout/TopHeader.jsx'
import TopMenu from '@/Components/layout/TopMenu.jsx'
import { Head, usePage } from '@inertiajs/react'

export default function Master({ children, hideMenu = false }) {
    const { auth } = usePage().props

    return (
        <>
            <div className="flex flex-col min-h-screen w-full">
                <div className="w-full max-w-screen-2xl mx-auto mt-2">
                    <TopHeader user={auth.user} />
                    <div className="w-full">
                        <div className="flex flex-col flex-grow">
                            {!hideMenu && <TopMenu />}
                            {/*<div className="container-xxl flex-grow-1 container-p-y">{children}</div>*/}
                            <Footer />
                            <div className="fixed inset-0 bg-black bg-opacity-50 hidden"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
