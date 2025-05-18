export default function PricingSection() {
    return (
        <div className="mt-16">
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-lg text-black/70 dark:text-white/70">
                    Start for free and scale as you grow
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
                {/* Websites Pricing */}
                <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex flex-col rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                    <div className="mb-4 flex items-center justify-center">
                        <svg
                            className="size-10 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold text-black dark:text-white">Websites</h3>
                    <div className="mb-4 text-center">
                        <span className="text-3xl font-bold text-black dark:text-white">Free</span>
                        <span className="text-black/70 dark:text-white/70"> for first website</span>
                    </div>
                    <ul className="mb-6 flex-grow space-y-2 text-sm text-black/70 dark:text-white/70">
                        <li className="flex items-center">
                            <svg className="mr-2 size-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            First website included
                        </li>
                        <li className="flex items-center">
                            <svg className="mr-2 size-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            $5/month per additional website
                        </li>
                    </ul>
                </div>

                {/* Storage Pricing */}
                <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex flex-col rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                    <div className="mb-4 flex items-center justify-center">
                        <svg
                            className="size-10 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold text-black dark:text-white">Storage</h3>
                    <div className="mb-4 text-center">
                        <span className="text-3xl font-bold text-black dark:text-white">1 GB</span>
                        <span className="text-black/70 dark:text-white/70"> free storage</span>
                    </div>
                    <ul className="mb-6 flex-grow space-y-2 text-sm text-black/70 dark:text-white/70">
                        <li className="flex items-center">
                            <svg className="mr-2 size-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            1 GB included
                        </li>
                        <li className="flex items-center">
                            <svg className="mr-2 size-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            $0.50/month per additional GB
                        </li>
                    </ul>
                </div>

                {/* API Calls Pricing */}
                <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex flex-col rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                    <div className="mb-4 flex items-center justify-center">
                        <svg
                            className="size-10 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold text-black dark:text-white">API Calls</h3>
                    <div className="mb-4 text-center">
                        <span className="text-3xl font-bold text-black dark:text-white">100</span>
                        <span className="text-black/70 dark:text-white/70"> free calls/day</span>
                    </div>
                    <ul className="mb-6 flex-grow space-y-2 text-sm text-black/70 dark:text-white/70">
                        <li className="flex items-center">
                            <svg className="mr-2 size-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            100 API calls/day included
                        </li>
                        <li className="flex items-center">
                            <svg className="mr-2 size-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            $0.01 per additional call
                        </li>
                    </ul>
                </div>

                {/* Sections Pricing */}
                <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex flex-col rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                    <div className="mb-4 flex items-center justify-center">
                        <svg
                            className="size-10 text-blue-600"
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
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold text-black dark:text-white">Sections</h3>
                    <div className="mb-4 text-center">
                        <span className="text-3xl font-bold text-black dark:text-white">20</span>
                        <span className="text-black/70 dark:text-white/70"> free sections</span>
                    </div>
                    <ul className="mb-6 flex-grow space-y-2 text-sm text-black/70 dark:text-white/70">
                        <li className="flex items-center">
                            <svg className="mr-2 size-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            20 sections included
                        </li>
                        <li className="flex items-center">
                            <svg className="mr-2 size-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            $1 per 5 additional sections
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
