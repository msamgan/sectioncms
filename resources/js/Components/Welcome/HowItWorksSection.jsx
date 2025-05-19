export default function HowItWorksSection() {
    return (
        <div className="py-12 bg-gray-50 dark:bg-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        How It Works
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
                        Simple steps to get started with SectionCMS
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex flex-col items-center rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-100 mb-4">
                            <span className="text-2xl font-bold text-blue-600">1</span>
                        </div>

                        <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                            Create Sections
                        </h3>

                        <p className="text-sm/relaxed text-center">
                            Define your content structure by creating sections with custom fields. Each section can have multiple fields to store different types of content.
                        </p>
                    </div>

                    <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex flex-col items-center rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-100 mb-4">
                            <span className="text-2xl font-bold text-blue-600">2</span>
                        </div>

                        <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                            Add Content
                        </h3>

                        <p className="text-sm/relaxed text-center">
                            Fill your sections with content using the intuitive interface. Add text, images, links, and other data types to your sections.
                        </p>
                    </div>

                    <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex flex-col items-center rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-100 mb-4">
                            <span className="text-2xl font-bold text-blue-600">3</span>
                        </div>

                        <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                            Integrate & Display
                        </h3>

                        <p className="text-sm/relaxed text-center">
                            Use our API to fetch your content and display it in your application. The flexible structure allows you to use your content anywhere.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
