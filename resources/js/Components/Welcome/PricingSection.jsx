import { Link } from '@inertiajs/react'

export default function PricingSection() {
    return (
        <div className="mt-16">
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">Simple, Transparent Pricing</h2>
                <p className="text-lg text-black/70 dark:text-white/70">Start for free and scale as you grow</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
                {/* Websites Pricing */}
                <div className="dark:bg-zinc-900 group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl dark:shadow-gray-800/30">
                    {/* Top accent border */}
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

                    {/* Icon with circle background */}
                    <div className="mt-8 flex justify-center">
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <svg
                                className="size-10 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:text-blue-400"
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
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">Websites</h3>
                        <div className="mb-6 text-center">
                            <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">Free</span>
                            <span className="text-gray-600 dark:text-gray-400"> for first website</span>
                        </div>
                        <ul className="mb-8 flex-grow space-y-3 text-sm text-gray-600 dark:text-gray-300">
                            <li className="flex items-center">
                                <svg
                                    className="mr-3 size-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                First website included
                            </li>
                            <li className="flex items-center">
                                <svg
                                    className="mr-3 size-5 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    ></path>
                                </svg>
                                <span className="font-medium">$5/month</span> per additional website
                            </li>
                        </ul>

                        {/* Button */}
                        <div className="mt-auto">
                            <Link
                                href={route('register')}
                                className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-4 py-3 font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-offset-gray-900"
                            >
                                <span className="absolute inset-0 translate-y-full rounded-lg bg-gradient-to-r from-blue-700 to-indigo-600 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative flex items-center">
                                    Get Started
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-12"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Storage Pricing */}
                <div className="dark:bg-zinc-900 group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl dark:shadow-gray-800/30">
                    {/* Top accent border */}
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-purple-400 to-purple-600"></div>

                    {/* Icon with circle background */}
                    <div className="mt-8 flex justify-center">
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                            <svg
                                className="size-10 text-purple-600 transition-transform duration-300 group-hover:scale-110 dark:text-purple-400"
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
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">Storage</h3>
                        <div className="mb-6 text-center">
                            <span className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">1 GB</span>
                            <span className="text-gray-600 dark:text-gray-400"> free storage</span>
                        </div>
                        <ul className="mb-8 flex-grow space-y-3 text-sm text-gray-600 dark:text-gray-300">
                            <li className="flex items-center">
                                <svg
                                    className="mr-3 size-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                1 GB included
                            </li>
                            <li className="flex items-center">
                                <svg
                                    className="mr-3 size-5 text-purple-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    ></path>
                                </svg>
                                <span className="font-medium">$0.50/month</span> per additional GB
                            </li>
                        </ul>

                        {/* Button */}
                        <div className="mt-auto">
                            <Link
                                href={route('register')}
                                className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-purple-600 px-4 py-3 font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-offset-gray-900"
                            >
                                <span className="absolute inset-0 translate-y-full rounded-lg bg-gradient-to-r from-purple-700 to-indigo-600 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative flex items-center">
                                    Get Started
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-12"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* API Calls Pricing */}
                <div className="dark:bg-zinc-900 group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl dark:shadow-gray-800/30">
                    {/* Top accent border */}
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-green-400 to-green-600"></div>

                    {/* Icon with circle background */}
                    <div className="mt-8 flex justify-center">
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <svg
                                className="size-10 text-green-600 transition-transform duration-300 group-hover:scale-110 dark:text-green-400"
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
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">API Calls</h3>
                        <div className="mb-6 text-center">
                            <span className="text-4xl font-extrabold text-green-600 dark:text-green-400">100</span>
                            <span className="text-gray-600 dark:text-gray-400"> free calls/day</span>
                        </div>
                        <ul className="mb-8 flex-grow space-y-3 text-sm text-gray-600 dark:text-gray-300">
                            <li className="flex items-center">
                                <svg
                                    className="mr-3 size-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                100 API calls/day included
                            </li>
                            <li className="flex items-center">
                                <svg
                                    className="mr-3 size-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    ></path>
                                </svg>
                                <span className="font-medium">$0.01</span> per additional call
                            </li>
                        </ul>

                        {/* Button */}
                        <div className="mt-auto">
                            <Link
                                href={route('register')}
                                className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-green-600 px-4 py-3 font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-offset-gray-900"
                            >
                                <span className="to-teal-600 absolute inset-0 translate-y-full rounded-lg bg-gradient-to-r from-green-700 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative flex items-center">
                                    Get Started
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-12"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Sections Pricing */}
                <div className="bg-red-50 dark:bg-zinc-900 group relative flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl dark:shadow-gray-800/30">
                    {/* Top accent border */}
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-400 to-red-600"></div>

                    {/* Icon with circle background */}
                    <div className="mt-8 flex justify-center">
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <svg
                                className="size-10 text-red-600 transition-transform duration-300 group-hover:scale-110 dark:text-red-400"
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
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">Sections</h3>
                        <div className="mb-6 text-center">
                            <span className="text-4xl font-extrabold text-red-600 dark:text-red-400">20</span>
                            <span className="text-gray-600 dark:text-gray-400"> free sections</span>
                        </div>
                        <ul className="mb-8 flex-grow space-y-3 text-sm text-gray-600 dark:text-gray-300">
                            <li className="flex items-center">
                                <svg
                                    className="mr-3 size-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                20 sections included
                            </li>
                            <li className="flex items-center">
                                <svg
                                    className="mr-3 size-5 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    ></path>
                                </svg>
                                <span className="font-medium">$1</span> per 5 additional sections
                            </li>
                        </ul>

                        {/* Button */}
                        <div className="mt-auto">
                            <Link
                                href={route('register')}
                                className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-red-600 px-4 py-3 font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-offset-gray-900"
                            >
                                <span className="absolute inset-0 translate-y-full rounded-lg bg-gradient-to-r from-red-700 to-red-600 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative flex items-center">
                                    Get Started
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-12"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
