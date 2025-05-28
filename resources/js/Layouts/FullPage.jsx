import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'

export default function FullPage({ children }) {
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
                {/* Main Content Area with improved spacing */}
                <main className="flex-grow w-full mt-12 mb-12">
                    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6">{children}</div>
                </main>

                {/* Modal Overlay with improved transition */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden transition-opacity duration-300"
                    id="modal-overlay"
                ></div>
            </div>
        </>
    )
}
