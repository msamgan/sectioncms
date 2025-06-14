import Footer from '@/Components/layout/Footer.jsx'
import Sidebar from '@/Components/layout/Sidebar.jsx'
import TopHeader from '@/Components/layout/TopHeader.jsx'
import StatusBar from '@/Components/StatusBar.jsx'
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Master({ children, hideMenu = false }) {
    const { auth } = usePage().props
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth'
        return () => {
            document.documentElement.style.scrollBehavior = ''
        }
    }, [])

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    return (
        <div className="flex min-h-screen w-full bg-white">
            {!hideMenu && <Sidebar user={auth.user} collapsed={sidebarCollapsed} onToggle={toggleSidebar} />}

            <header className="fixed top-0 left-0 right-0 z-40 w-full bg-white border-b border-gray-100 transition-all duration-250">
                <div className="w-full px-4 md:px-6">
                    <TopHeader user={auth.user} />
                </div>
            </header>

            <div
                className={`flex flex-col flex-1 transition-all duration-250 pt-16 ${!hideMenu ? (sidebarCollapsed ? 'ml-16' : 'ml-64') : ''}`}
            >
                <StatusBar />

                <main className="flex-grow w-full my-section">
                    <div className="w-full px-4 md:px-6">
                        <div className="bg-white rounded-panel transition-all duration-250">{children}</div>
                    </div>
                </main>

                <div className="w-full border-t border-gray-100 bg-white mt-auto">
                    <div className="w-full px-4 md:px-6">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
