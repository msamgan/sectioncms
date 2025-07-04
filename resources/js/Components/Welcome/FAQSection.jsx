export default function FAQSection() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-300">
                        Questions & Answers
                    </span>
                    <h2 className="text-black text-4xl font-extrabold sm:text-5xl dark:text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                        Everything you need to know about SectionCMS
                    </p>
                </div>

                <div className="mx-auto max-w-3xl divide-y divide-gray-200 dark:divide-gray-700">
                    {/* FAQ Item 1 */}
                    <div className="py-6">
                        <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between p-4 rounded-lg bg-white dark:bg-black dark:ring-zinc-700 ring-1 ring-white/[0.1] shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)] dark:shadow-[0px_5px_15px_0px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.2)]">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    What is SectionCMS?
                                </h3>
                                <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                                    <svg
                                        className="absolute inset-0 h-5 w-5 text-green-600 opacity-100 transition duration-300 group-open:opacity-0 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <svg
                                        className="absolute inset-0 h-5 w-5 text-green-600 opacity-0 transition duration-300 group-open:opacity-100 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18 12H6"
                                        />
                                    </svg>
                                </span>
                            </summary>
                            <div className="mt-4 p-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p>
                                    SectionCMS is a content management system designed for creating structured, dynamic
                                    content with built-in localization support. It allows you to define content sections
                                    with custom fields and manage them through an intuitive interface or API.
                                </p>
                            </div>
                        </details>
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="py-6">
                        <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between p-4 rounded-lg bg-white dark:bg-black dark:ring-zinc-700 ring-1 ring-white/[0.1] shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)] dark:shadow-[0px_5px_15px_0px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.2)]">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    How does SectionCMS differ from other CMS platforms?
                                </h3>
                                <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                                    <svg
                                        className="absolute inset-0 h-5 w-5 text-green-600 opacity-100 transition duration-300 group-open:opacity-0 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <svg
                                        className="absolute inset-0 h-5 w-5 text-green-600 opacity-0 transition duration-300 group-open:opacity-100 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18 12H6"
                                        />
                                    </svg>
                                </span>
                            </summary>
                            <div className="mt-4 p-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p>
                                    Unlike traditional CMS platforms that focus on page-based content, SectionCMS uses a
                                    structured, section-based approach. This makes it ideal for applications that need
                                    to display the same content in different contexts or formats. It also features
                                    built-in multi-language support, a developer-friendly API, and a multi-tenant
                                    architecture.
                                </p>
                            </div>
                        </details>
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="py-6">
                        <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between p-4 rounded-lg bg-white dark:bg-black dark:ring-zinc-700 ring-1 ring-white/[0.1] shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)] dark:shadow-[0px_5px_15px_0px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.2)]">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Can I use SectionCMS with my existing website or application?
                                </h3>
                                <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                                    <svg
                                        className="absolute inset-0 h-5 w-5 text-green-600 opacity-100 transition duration-300 group-open:opacity-0 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <svg
                                        className="absolute inset-0 h-5 w-5 text-green-600 opacity-0 transition duration-300 group-open:opacity-100 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18 12H6"
                                        />
                                    </svg>
                                </span>
                            </summary>
                            <div className="mt-4 p-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p>
                                    Yes! SectionCMS provides a RESTful API that allows you to integrate it with any
                                    website or application. You can use the API to fetch content from SectionCMS and
                                    display it in your existing site, regardless of the technology stack you're using.
                                </p>
                            </div>
                        </details>
                    </div>

                    {/* FAQ Item 4 */}
                    <div className="py-6">
                        <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between p-4 rounded-lg bg-white dark:bg-black dark:ring-zinc-700 ring-1 ring-white/[0.1] shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)] dark:shadow-[0px_5px_15px_0px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.2)]">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    How does the pricing work?
                                </h3>
                                <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                                    <svg
                                        className="absolute inset-0 h-5 w-5 text-green-600 opacity-100 transition duration-300 group-open:opacity-0 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <svg
                                        className="absolute inset-0 h-5 w-5 text-green-600 opacity-0 transition duration-300 group-open:opacity-100 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18 12H6"
                                        />
                                    </svg>
                                </span>
                            </summary>
                            <div className="mt-4 p-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p>
                                    SectionCMS uses a usage-based pricing model. You get a generous free tier that
                                    includes your first website, 1GB of storage, 100 API calls per day, and 20 sections.
                                    Beyond that, you only pay for what you use with transparent pricing for additional
                                    resources.
                                </p>
                            </div>
                        </details>
                    </div>

                    {/* FAQ Item 5 */}
                    <div className="py-6">
                        <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between p-4 rounded-lg bg-white dark:bg-black dark:ring-zinc-700 ring-1 ring-white/[0.1] shadow-[0px_5px_15px_0px_rgba(0,0,0,0.05)] dark:shadow-[0px_5px_15px_0px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.2)]">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Is there a limit to how many users can access my SectionCMS account?
                                </h3>
                                <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                                    <svg
                                        className="absolute inset-0 h-5 w-5 text-green-600 opacity-100 transition duration-300 group-open:opacity-0 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <svg
                                        className="absolute inset-0 h-5 w-5 text-green-600 opacity-0 transition duration-300 group-open:opacity-100 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18 12H6"
                                        />
                                    </svg>
                                </span>
                            </summary>
                            <div className="mt-4 p-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p>
                                    No, there's no limit to the number of users you can add to your account. You can
                                    invite as many team members as you need and assign them different roles based on
                                    their responsibilities.
                                </p>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    )
}
