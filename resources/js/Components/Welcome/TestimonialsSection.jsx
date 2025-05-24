export default function TestimonialsSection() {
    return (
        <div className="to-gray-50 dark:from-zinc-900 dark:to-zinc-800 bg-gradient-to-b from-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                        Trusted by Developers
                    </span>
                    <h2 className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-extrabold text-gray-900 sm:text-5xl dark:from-indigo-400 dark:to-purple-400 dark:text-white">
                        What Our Users Say
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                        Hear from the developers and content creators who use SectionCMS
                    </p>
                </div>

                <div className="relative grid gap-8 md:grid-cols-3">
                    {/* Testimonial 1 */}
                    <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 dark:hover:bg-zinc-800 flex transform flex-col rounded-xl bg-white/90 p-8 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(79,70,229,0.2)]">
                        <div className="mb-6">
                            {/* 5 stars */}
                            <div className="mb-4 flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="h-5 w-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="mb-4 italic text-gray-600 dark:text-gray-300">
                                "SectionCMS has transformed how we manage content across our multi-language website. The
                                structured approach to content makes it so much easier to maintain consistency."
                            </p>
                        </div>

                        <div className="mt-auto flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">RM</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Rashid Maqsood</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">MD, ParcelToShip</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 dark:hover:bg-zinc-800 flex transform flex-col rounded-xl bg-white/90 p-8 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(79,70,229,0.2)]">
                        <div className="mb-6">
                            {/* 5 stars */}
                            <div className="mb-4 flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="h-5 w-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="mb-4 italic text-gray-600 dark:text-gray-300">
                                "The API is incredibly well-designed and makes it easy to pull content into our mobile
                                app. We've cut our content management time in half since switching to SectionCMS."
                            </p>
                        </div>

                        <div className="mt-auto flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">AS</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Ankit Saxena</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">SEO, Digitalmise</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="dark:bg-zinc-900/80 dark:ring-zinc-700 dark:hover:bg-zinc-800 flex transform flex-col rounded-xl bg-white/90 p-8 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.1)] ring-1 ring-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0px_20px_50px_0px_rgba(79,70,229,0.2)]">
                        <div className="mb-6">
                            {/* 5 stars */}
                            <div className="mb-4 flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="h-5 w-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="mb-4 italic text-gray-600 dark:text-gray-300">
                                "As a content manager, I love how SectionCMS gives me the flexibility to create
                                structured content that works across all our platforms without having to bug the
                                developers."
                            </p>
                        </div>

                        <div className="mt-auto flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">AB</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Amit Banerjee</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Content Director, NOIS</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 dark:border-gray-700 dark:text-gray-300">
                        <span className="mr-2">Join our growing community of</span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">2,500+</span>
                        <span className="ml-2">satisfied users</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
