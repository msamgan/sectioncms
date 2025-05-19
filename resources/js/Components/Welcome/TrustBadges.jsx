export default function TrustBadges() {
    return (
        <div className="bg-gray-50 border-b border-t border-gray-200 py-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 text-center">
                    <p className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Trusted by developers and companies worldwide
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
                    {/* Trust badges */}
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <svg
                                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Secure & Reliable</h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">99.9% uptime guarantee</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <svg
                                className="h-6 w-6 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">GDPR Compliant</h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Your data is protected</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                            <svg
                                className="h-6 w-6 text-purple-600 dark:text-purple-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">24/7 Support</h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Always here to help</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <svg
                                className="h-6 w-6 text-red-600 dark:text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Money-Back Guarantee</h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">30-day risk-free trial</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
