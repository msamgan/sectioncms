import Footer from '@/Components/layout/Footer.jsx'
import Sidebar from '@/Components/layout/Sidebar.jsx'
import TopHeader from '@/Components/layout/TopHeader.jsx'
import StatusBar from '@/Components/StatusBar.jsx'
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Master({ children, hideMenu = false }) {
    const { auth } = usePage().props
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [pageLoaded, setPageLoaded] = useState(false)

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth'

        // Add a slight delay to show page load animation
        const timer = setTimeout(() => {
            setPageLoaded(true)
        }, 100)

        return () => {
            document.documentElement.style.scrollBehavior = ''
            clearTimeout(timer)
        }
    }, [])

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    return (
        <div className="flex min-h-screen w-full bg-gray-50">
            {!hideMenu && <Sidebar user={auth.user} collapsed={sidebarCollapsed} onToggle={toggleSidebar} />}

            <header className="fixed top-0 left-0 right-0 z-40 w-full bg-white border-b border-gray-100 transition-all duration-250">
                <div className="w-full px-4 md:px-6">
                    <TopHeader user={auth.user} />
                </div>
            </header>

            <div
                className={`flex flex-col flex-1 transition-all duration-250 pt-16 ${
                    !hideMenu ? (sidebarCollapsed ? 'ml-20' : 'ml-64') : ''
                } ${pageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            >
                <div className="w-full max-w-7xl mx-auto">
                    <StatusBar />
                </div>

                <main className="flex-grow w-full py-6">
                    <div className="w-full px-4 md:px-6 max-w-7xl mx-auto">{children}</div>
                </main>

                <div className="w-full border-t border-gray-100 bg-white mt-auto">
                    <div className="w-full px-4 md:px-6 max-w-7xl mx-auto">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
