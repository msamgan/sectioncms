export default function FeaturesSection() {
    return (
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:size-16">
                    <svg
                        className="size-6 text-blue-600"
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

                <div className="pt-3 sm:pt-5">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        Dynamic Sections
                    </h2>

                    <p className="mt-4 text-sm/relaxed">
                        Create and manage content sections with dynamic fields. Each section has a
                        name, slug, and customizable key-value pairs that can be used to build web
                        pages or other content structures.
                    </p>
                </div>
            </div>

            <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:size-16">
                    <svg
                        className="size-6 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                    </svg>
                </div>

                <div className="pt-3 sm:pt-5">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        Internationalization
                    </h2>

                    <p className="mt-4 text-sm/relaxed">
                        Support for multiple languages in your content. Create content once and
                        display it in different languages based on user preferences.
                    </p>
                </div>
            </div>

            <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:size-16">
                    <svg
                        className="size-6 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>

                <div className="pt-3 sm:pt-5">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        Role-Based Permissions
                    </h2>

                    <p className="mt-4 text-sm/relaxed">
                        Comprehensive permission system with default roles of Business. Control
                        access to different features based on user roles.
                    </p>
                </div>
            </div>

            <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 transition duration-300 hover:bg-gray-50 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.12)] dark:hover:bg-zinc-800">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:size-16">
                    <svg
                        className="size-6 text-blue-600"
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

                <div className="pt-3 sm:pt-5">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        Multi-Tenant Architecture
                    </h2>

                    <p className="mt-4 text-sm/relaxed">
                        Sections are associated with businesses, allowing for multi-tenant
                        functionality. Each business can have its own set of sections and content.
                    </p>
                </div>
            </div>
        </div>
    )
}
