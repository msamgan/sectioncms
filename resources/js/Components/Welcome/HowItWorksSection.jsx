export default function HowItWorksSection() {
    return (
        <div className="bg-gray-50 dark:bg-zinc-800 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        Simple Process
                    </span>
                    <h2 className="text-black text-4xl font-extrabold sm:text-5xl dark:text-white">How It Works</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                        Get started with SectionCMS in three easy steps
                    </p>
                </div>

                <div className="relative">
                    {/* Process connector line */}
                    <div
                        className="absolute left-0 right-0 top-24 z-0 hidden h-1 translate-y-1/2 transform bg-blue-500 md:block"
                        style={{ width: '70%', margin: '0 auto' }}
                    ></div>

                    <div className="relative z-10 grid gap-10 md:grid-cols-3">
                        <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 dark:hover:bg-zinc-800 flex transform flex-col items-center rounded-xl bg-white/90 p-8 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(59,130,246,0.2)]">
                            <div className="mb-6 flex size-20 shrink-0 items-center justify-center rounded-full bg-blue-500 shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
                                <svg
                                    className="size-10 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>

                            <span className="mb-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                Step 1
                            </span>
                            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Create Sections</h3>

                            <p className="text-center text-base leading-relaxed text-gray-600 dark:text-gray-300">
                                Define your content structure by creating sections with custom fields. Each section can
                                have multiple fields to store different types of content.
                            </p>

                            <div className="mt-6 w-full">
                                <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-1 w-full animate-pulse bg-blue-600"></div>
                                </div>
                            </div>
                        </div>

                        <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 dark:hover:bg-zinc-800 flex transform flex-col items-center rounded-xl bg-white/90 p-8 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(59,130,246,0.2)]">
                            <div className="mb-6 flex size-20 shrink-0 items-center justify-center rounded-full bg-indigo-500 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
                                <svg
                                    className="size-10 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </div>

                            <span className="mb-2 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                                Step 2
                            </span>
                            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Add Content</h3>

                            <p className="text-center text-base leading-relaxed text-gray-600 dark:text-gray-300">
                                Fill your sections with content using the intuitive interface. Add text, images, links,
                                and other data types to your sections.
                            </p>

                            <div className="mt-6 w-full">
                                <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-1 w-full animate-pulse bg-indigo-600"></div>
                                </div>
                            </div>
                        </div>

                        <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 dark:hover:bg-zinc-800 flex transform flex-col items-center rounded-xl bg-white/90 p-8 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(59,130,246,0.2)]">
                            <div className="mb-6 flex size-20 shrink-0 items-center justify-center rounded-full bg-purple-500 shadow-lg shadow-purple-200 dark:shadow-purple-900/30">
                                <svg
                                    className="size-10 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                            </div>

                            <span className="mb-2 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                Step 3
                            </span>
                            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                Integrate & Display
                            </h3>

                            <p className="text-center text-base leading-relaxed text-gray-600 dark:text-gray-300">
                                Use our API to fetch your content and display it in your application. The flexible
                                structure allows you to use your content anywhere.
                            </p>

                            <div className="mt-6 w-full">
                                <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-1 w-full animate-pulse bg-purple-600"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Platform Workflow Section */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-black text-3xl font-extrabold sm:text-4xl dark:text-white">
                            Details of the Platform Workflow
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                            Our platform makes content localization simple and efficient
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {/* Step 1 */}
                        <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 dark:hover:bg-zinc-800 flex transform flex-col rounded-xl bg-white/90 p-6 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(59,130,246,0.2)]">
                            <div className="flex items-center mb-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500 shadow-lg shadow-blue-200 dark:shadow-blue-900/30 mr-3">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Create account</h4>
                            </div>
                            <p className="text-gray-600 text-sm dark:text-gray-300">
                                Sign up and get access to the content management system
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 dark:hover:bg-zinc-800 flex transform flex-col rounded-xl bg-white/90 p-6 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(59,130,246,0.2)]">
                            <div className="flex items-center mb-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-500 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 mr-3">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Create sections</h4>
                            </div>
                            <p className="text-gray-600 text-sm dark:text-gray-300">
                                Add sections like "Home Page - Hero" to organize content
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 dark:hover:bg-zinc-800 flex transform flex-col rounded-xl bg-white/90 p-6 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(59,130,246,0.2)]">
                            <div className="flex items-center mb-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-purple-500 shadow-lg shadow-purple-200 dark:shadow-purple-900/30 mr-3">
                                    <span className="text-white font-bold">3</span>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Add keys</h4>
                            </div>
                            <p className="text-gray-600 text-sm dark:text-gray-300">
                                Create keys like "title" with values in different languages
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 dark:hover:bg-zinc-800 flex transform flex-col rounded-xl bg-white/90 p-6 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(59,130,246,0.2)]">
                            <div className="flex items-center mb-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-yellow-500 shadow-lg shadow-yellow-200 dark:shadow-yellow-900/30 mr-3">
                                    <span className="text-white font-bold">4</span>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Use in API</h4>
                            </div>
                            <p className="text-gray-600 text-sm dark:text-gray-300">
                                API returns values in the selected language automatically
                            </p>
                        </div>
                    </div>

                    {/* Example Workflow */}
                    <div className="mt-12 bg-white/90 dark:bg-zinc-900/80 rounded-xl p-6 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] dark:ring-zinc-700 backdrop-blur-sm">
                        <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-4">Example workflow:</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 mb-3">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        1. Create section:{' '}
                                        <span className="text-blue-600 dark:text-blue-400">Home Page - Hero</span>
                                    </p>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        2. Add key: <span className="text-blue-600 dark:text-blue-400">title</span>
                                    </p>
                                    <div className="mt-3 pl-4 border-l-2 border-blue-300 dark:border-blue-700">
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            English (en): <span className="font-medium">Welcome to XYZ</span>
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Spanish (es): <span className="font-medium">Bienvenido a XYZ</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="bg-gray-900 p-4 rounded-lg text-gray-300 font-mono text-xs">
                                    <p>
                                        <span className="text-blue-400">// API response when language=es</span>
                                    </p>
                                    <p>{`{`}</p>
                                    <p className="pl-4">{`"section": "home-page-hero",`}</p>
                                    <p className="pl-4">{`"content": {`}</p>
                                    <p className="pl-8">{`"title": "Bienvenido a XYZ"`}</p>
                                    <p className="pl-4">{`}`}</p>
                                    <p>{`}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center">
                <a
                    href="#"
                    className="border-transparent inline-flex transform items-center rounded-md border bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Get Started Now
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
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
                </a>
            </div>
        </div>
    )
}
