import { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo'

export default function StickyHeader({ auth }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky header after scrolling down 300px
            const scrollPosition = window.scrollY
            setIsVisible(scrollPosition > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!isVisible) return null

    return (
        <div className="fixed left-0 right-0 top-0 z-50 transform bg-white/90 shadow-md backdrop-blur-sm transition-transform duration-300 ease-in-out dark:bg-gray-900/90">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <ApplicationLogo className="h-8 w-auto" />
                        <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">SectionCMS</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Free trial countdown for non-logged in users */}
                        {!auth.user && (
                            <div className="mr-4 hidden items-center md:flex">
                                <div className="flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    <svg
                                        className="mr-1 h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>Limited offer: 30% off first 3 months</span>
                                </div>
                            </div>
                        )}

                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="border-transparent inline-flex items-center rounded-md border bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('register')}
                                className="border-transparent inline-flex items-center rounded-md border bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Start Free Trial
                                <svg
                                    className="-mr-1 ml-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
