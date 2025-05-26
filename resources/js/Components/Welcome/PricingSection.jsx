import { Link } from '@inertiajs/react'

export default function PricingSection() {
    return (
        <div className="mt-16">
            <div className="mb-12 text-center">
                <span className="mb-6 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                    Pricing Plans
                </span>

                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">Simple, Transparent Pricing</h2>
                <p className="text-lg text-black/70 dark:text-white/70">Start for free and scale as you grow</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                {/* Free Tier */}
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
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">Free Tier</h3>
                        <div className="mb-6 text-center">
                            <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">$0</span>
                            <span className="text-gray-600 dark:text-gray-400 ml-1">per month</span>
                        </div>
                        <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
                            Perfect for testing or small projects.
                        </p>
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
                                1 Website
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
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                20 Sections
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
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                50 Keys
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
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                2 Enabled Languages
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
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                50 MB Media Storage
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
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                3,000 API Calls/month
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

                {/* Pay-as-You-Go */}
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
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">
                            Pay As You Go
                        </h3>
                        <div className="mb-6 text-center">
                            <span className="text-gray-600 dark:text-gray-400">Only pay for what you use</span>
                        </div>
                        <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
                            Scale at your own pace.
                        </p>
                        <ul className="mb-8 flex-grow space-y-3 text-sm text-gray-600 dark:text-gray-300">
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
                                <span className="font-medium mr-1">$5</span> per extra website
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
                                <span className="font-medium mr-1">$1</span> per 20 extra sections
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
                                <span className="font-medium mr-1">$1</span> per 50 extra keys
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
                                <span className="font-medium mr-1">$1</span> per additional language
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
                                <span className="font-medium mr-1">$0.25</span> per GB of media storage
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
                                <span className="font-medium mr-1">$0.00001</span> per API call
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

                {/* Enterprise */}
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
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">Enterprise</h3>
                        <div className="mb-6 text-center">
                            <span className="text-gray-600 dark:text-gray-400">Custom pricing</span>
                        </div>
                        <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
                            Designed for teams that need flexibility, security, and support at scale.
                        </p>
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
                                Unlimited usage across all features
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
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                Custom SLAs & support
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
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                Private hosting options available
                            </li>
                        </ul>

                        {/* Button */}
                        <div className="mt-auto">
                            <Link
                                href={route('dashboard')}
                                className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-green-600 px-4 py-3 font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-offset-gray-900"
                            >
                                <span className="to-teal-600 absolute inset-0 translate-y-full rounded-lg bg-gradient-to-r from-green-700 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative flex items-center">
                                    Contact Us
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
