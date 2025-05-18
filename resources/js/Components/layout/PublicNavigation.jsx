import { Link } from '@inertiajs/react'

export default function PublicNavigation({ auth }) {
    return (
        <nav className="-mx-3 flex flex-1 justify-end">
            <div className="relative flex items-center space-x-4">
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="group relative flex items-center overflow-hidden rounded-lg bg-white px-4 py-2.5 font-medium text-blue-600 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-offset-gray-900"
                    >
                        <span className="absolute inset-0 translate-y-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                        <svg
                            className="mr-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-12"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="3" y1="9" x2="21" y2="9"></line>
                            <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                        <span className="relative">Dashboard</span>
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="group relative flex items-center overflow-hidden rounded-lg bg-white px-4 py-2.5 font-medium text-gray-700 shadow-sm transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-offset-gray-900"
                        >
                            <span className="absolute inset-0 translate-y-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                            <svg
                                className="mr-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-12"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                <polyline points="10 17 15 12 10 7"></polyline>
                                <line x1="15" y1="12" x2="3" y2="12"></line>
                            </svg>
                            <span className="relative">Log in</span>
                        </Link>
                        <Link
                            href={route('register')}
                            className="group relative flex items-center overflow-hidden rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-offset-gray-900"
                        >
                            <span className="absolute inset-0 translate-y-full rounded-lg bg-gradient-to-r from-blue-700 to-indigo-600 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                            <svg
                                className="mr-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-12"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                            <span className="relative">Register</span>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
