import Footer from '@/Components/layout/Footer.jsx'
import TopHeader from '@/Components/layout/TopHeader.jsx'
import TopMenu from '@/Components/layout/TopMenu.jsx'
import { Head, usePage } from '@inertiajs/react'
import { useEffect } from 'react'

export default function Master({ children, hideMenu = false }) {
    const { auth } = usePage().props

    // Add smooth scroll behavior to the page
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth'
        return () => {
            document.documentElement.style.scrollBehavior = ''
        }
    }, [])

    return (
        <>
            <div className="flex flex-col min-h-screen w-full bg-gray-50">
                {/* Header Section with subtle gradient */}
                <header className="sticky top-0 z-30 w-full bg-gradient-to-r from-white to-gray-50 shadow-md transition-all duration-300">
                    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6">
                        <TopHeader user={auth.user} />
                    </div>
                </header>

                {/* Menu Section - Enhanced with subtle gradient and improved transitions */}
                {!hideMenu && (
                    <div className="w-full bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 shadow-sm transition-all duration-300 ease-in-out">
                        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6">
                            <TopMenu />
                        </div>
                    </div>
                )}

                {/* Main Content Area with improved spacing */}
                <main className="flex-grow w-full">
                    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6">
                        <div className="bg-white rounded-lg px-4 py-4 transition-all duration-300">
                            {children}
                        </div>
                    </div>
                </main>

                {/* Footer Section with improved styling */}
                <div className="w-full border-t border-gray-200 bg-white mt-auto">
                    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6">
                        <Footer />
                    </div>
                </div>

                {/* Modal Overlay with improved transition */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden transition-opacity duration-300"
                    id="modal-overlay"
                ></div>
            </div>
        </>
    )
}
