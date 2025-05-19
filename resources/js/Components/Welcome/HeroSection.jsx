export default function HeroSection() {
    return (
        <div className="py-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-70 blur-3xl dark:from-blue-900/20 dark:to-indigo-900/20"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 opacity-70 blur-3xl dark:from-purple-900/20 dark:to-pink-900/20"></div>
            </div>

            <div className="relative grid gap-12 lg:grid-cols-2 items-center">
                {/* Left column - Text content */}
                <div className="text-center lg:text-left">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-6 dark:bg-blue-900/50 dark:text-blue-300">
                        Next-Gen Content Management
                    </span>

                    <h1 className="mb-6 text-5xl lg:text-6xl font-extrabold tracking-tight">
                        <span className="block text-gray-900 dark:text-white">Welcome to</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                            SectionCMS
                        </span>
                    </h1>

                    <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
                        A powerful content management system for creating dynamic, structured content with
                        localization support and developer-friendly API.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a
                            href={route('register')}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                        >
                            Get Started for Free
                            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>

                        <a
                            href="#how-it-works"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#how-it-works').scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Learn How It Works
                            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>

                    <div className="mt-10 flex items-center justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex -space-x-2 mr-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br ${
                                    i === 0 ? 'from-blue-400 to-blue-500' :
                                    i === 1 ? 'from-purple-400 to-purple-500' :
                                    i === 2 ? 'from-green-400 to-green-500' :
                                    'from-red-400 to-red-500'
                                }`}></div>
                            ))}
                        </div>
                        <span>Trusted by <span className="font-semibold text-gray-900 dark:text-white">2,500+</span> developers</span>
                    </div>
                </div>

                {/* Right column - Illustration */}
                <div className="relative flex justify-center lg:justify-end">
                    <div className="w-full max-w-lg h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
                        {/* Header bar */}
                        <div className="h-10 bg-gray-100 dark:bg-gray-700 flex items-center px-4">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                        </div>

                        {/* Content area */}
                        <div className="p-6">
                            {/* Section header */}
                            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-600 rounded mb-4 animate-pulse"></div>

                            {/* Section content */}
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-20 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/50"></div>
                                    </div>
                                    <div className="h-20 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/50"></div>
                                    </div>
                                    <div className="h-20 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-green-500/50"></div>
                                    </div>
                                </div>

                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/6"></div>

                                <div className="h-10 w-1/3 bg-blue-500 dark:bg-blue-600 rounded mt-6"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-300 dark:bg-yellow-500 rounded-lg shadow-lg transform rotate-12 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                    </div>

                    <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-300 dark:bg-blue-500 rounded-lg shadow-lg transform -rotate-12 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
