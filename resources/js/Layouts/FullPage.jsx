import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function FullPage({ children }) {
    const { auth } = usePage().props
    const [pageLoaded, setPageLoaded] = useState(false)

    // Add smooth scroll behavior to the page and handle page load animation
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

    return (
        <>
            <div className={`flex flex-col min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${
                pageLoaded ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-500`}>
                {/* Main Content Area with improved spacing */}
                <main className="flex-grow w-full mt-12 mb-12">
                    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 text-gray-800 dark:text-gray-100">{children}</div>
                </main>

                {/* Modal Overlay with improved transition */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-40 hidden transition-all duration-300"
                    id="modal-overlay"
                ></div>
            </div>
        </>
    )
}
