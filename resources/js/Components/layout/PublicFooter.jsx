import { Link } from '@inertiajs/react'

export default function PublicFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="mt-16 bg-gray-50 border-t border-gray-200 dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-start md:justify-between lg:px-8">
                {/* Logo and tagline */}
                <div className="mb-8 md:mb-0 md:w-6/12">
                    <div className="flex items-center justify-center md:justify-start">
                        <svg
                            className="h-8 w-8 text-blue-600 dark:text-blue-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">SectionCMS</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 md:text-left dark:text-gray-300">
                        A powerful and flexible content management system designed to create, manage, and deliver
                        dynamic, structured content across various platforms. It offers robust localization support,
                        enabling seamless multilingual experiences tailored to global audiences.
                    </p>
                </div>

                {/* Quick links */}
                <div className="md:w-3/12">
                    <h3 className="mb-4 text-right text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                        Legals
                    </h3>
                    <ul className="flex flex-col items-center space-y-2 md:items-end">
                        <li>
                            <Link
                                href={route('terms')}
                                className="text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('privacy')}
                                className="text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="md:w-3/12">
                    <h3 className="mb-4 text-right text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                        Quick Links
                    </h3>
                    <ul className="flex flex-col items-center space-y-2 md:items-end">
                        <li>
                            <Link
                                href="/"
                                className="text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('login')}
                                className="text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('register')}
                                className="text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-gray-100 border-t border-gray-200 py-6 dark:bg-gray-950 dark:border-gray-800 dark:bg-black">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                        &copy; {currentYear} SectionCMS. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
