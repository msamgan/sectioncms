export default function TestimonialsSection() {
    return (
        <div className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4 dark:bg-indigo-900 dark:text-indigo-300">
                        Trusted by Developers
                    </span>
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        What Our Users Say
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                        Hear from the developers and content creators who use SectionCMS
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3 relative">
                    {/* Testimonial 1 */}
                    <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 flex flex-col rounded-xl bg-white/90 p-8 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] transition-all duration-300 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(79,70,229,0.2)] dark:hover:bg-zinc-800 transform hover:-translate-y-2 backdrop-blur-sm">
                        <div className="mb-6">
                            {/* 5 stars */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                                "SectionCMS has transformed how we manage content across our multi-language website. The structured approach to content makes it so much easier to maintain consistency."
                            </p>
                        </div>

                        <div className="mt-auto flex items-center">
                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 dark:bg-indigo-900/30">
                                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">JD</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Jane Doe</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Lead Developer, TechCorp</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 flex flex-col rounded-xl bg-white/90 p-8 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] transition-all duration-300 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(79,70,229,0.2)] dark:hover:bg-zinc-800 transform hover:-translate-y-2 backdrop-blur-sm">
                        <div className="mb-6">
                            {/* 5 stars */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                                "The API is incredibly well-designed and makes it easy to pull content into our mobile app. We've cut our content management time in half since switching to SectionCMS."
                            </p>
                        </div>

                        <div className="mt-auto flex items-center">
                            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 dark:bg-purple-900/30">
                                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">MS</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Michael Smith</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">CTO, AppWorks</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 flex flex-col rounded-xl bg-white/90 p-8 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] transition-all duration-300 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(79,70,229,0.2)] dark:hover:bg-zinc-800 transform hover:-translate-y-2 backdrop-blur-sm">
                        <div className="mb-6">
                            {/* 5 stars */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                                "As a content manager, I love how SectionCMS gives me the flexibility to create structured content that works across all our platforms without having to bug the developers."
                            </p>
                        </div>

                        <div className="mt-auto flex items-center">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 dark:bg-blue-900/30">
                                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">AJ</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Alex Johnson</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Content Director, MediaHub</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-300">
                        <span className="mr-2">Join our growing community of</span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">2,500+</span>
                        <span className="ml-2">satisfied users</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
