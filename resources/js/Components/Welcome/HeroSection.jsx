import CtaButton from '@/Components/CtaButton'

export default function HeroSection() {
    return (
        <div className="relative overflow-hidden py-16">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-70 blur-3xl dark:from-blue-900/20 dark:to-indigo-900/20"></div>
                <div className="to-pink-100 dark:to-pink-900/20 absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-100 opacity-70 blur-3xl dark:from-purple-900/20"></div>
            </div>

            <div className="relative grid items-center gap-12 lg:grid-cols-2">
                <div className="text-center lg:text-left">
                    <span className="mb-6 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                        Next-Gen Content Management
                    </span>

                    <h1 className="mb-6 text-5xl font-extrabold tracking-tight lg:text-6xl">
                        <span className="block text-gray-900 dark:text-white">Welcome to</span>
                        <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text dark:from-blue-400 dark:to-indigo-400">
                            SectionCMS
                        </span>
                    </h1>

                    <p className="mx-auto mb-8 max-w-lg text-xl text-gray-600 lg:mx-0 dark:text-gray-300">
                        A powerful content management system for creating dynamic, structured content with localization
                        support and developer-friendly API.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                        <CtaButton
                            href={route('register')}
                            primary={true}
                            size="lg"
                            pulse={true}
                            icon={
                                <svg
                                    className="h-5 w-5"
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
                            }
                        >
                            Get Started for Free
                        </CtaButton>

                        <CtaButton
                            primary={false}
                            size="lg"
                            icon={
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            }
                            onClick={(e) => {
                                e.preventDefault()
                                document.querySelector('#how-it-works').scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            Learn How It Works
                        </CtaButton>
                    </div>

                    <div className="mt-10 flex items-center justify-center text-sm text-gray-500 lg:justify-start dark:text-gray-400">
                        <div className="mr-3 flex -space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br dark:border-gray-800 ${
                                        i === 0
                                            ? 'from-blue-400 to-blue-500'
                                            : i === 1
                                              ? 'from-purple-400 to-purple-500'
                                              : i === 2
                                                ? 'from-green-400 to-green-500'
                                                : 'from-red-400 to-red-500'
                                    }`}
                                ></div>
                            ))}
                        </div>
                        <span>
                            Trusted by <span className="font-semibold text-gray-900 dark:text-white">2,500+</span>{' '}
                            developers
                        </span>
                    </div>
                </div>

                <div className="relative flex justify-center lg:justify-end">
                    <div className="relative h-96 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
                        <div className="flex h-10 items-center bg-gray-100 px-4 dark:bg-gray-700">
                            <div className="flex space-x-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>

                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex h-20 items-center justify-center rounded bg-blue-100 dark:bg-blue-900/30">
                                        <div className="h-10 w-10 rounded-full bg-blue-500/50"></div>
                                    </div>
                                    <div className="flex h-20 items-center justify-center rounded bg-purple-100 dark:bg-purple-900/30">
                                        <div className="h-10 w-10 rounded-full bg-purple-500/50"></div>
                                    </div>
                                    <div className="flex h-20 items-center justify-center rounded bg-green-100 dark:bg-green-900/30">
                                        <div className="h-10 w-10 rounded-full bg-green-500/50"></div>
                                    </div>
                                </div>

                                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-600"></div>
                                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-600"></div>
                                <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-600"></div>

                                <div className="mt-6 h-10 w-1/3 rounded bg-blue-500 dark:bg-blue-600"></div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -right-6 -top-6 flex h-20 w-20 rotate-12 transform items-center justify-center rounded-lg bg-yellow-300 shadow-lg dark:bg-yellow-500">
                        <svg
                            className="h-10 w-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                            />
                        </svg>
                    </div>

                    <div className="absolute -bottom-6 -left-6 flex h-20 w-20 -rotate-12 transform items-center justify-center rounded-lg bg-blue-300 shadow-lg dark:bg-blue-500">
                        <svg
                            className="h-10 w-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
