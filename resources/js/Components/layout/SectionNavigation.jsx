export default function SectionNavigation() {
    // Add smooth scrolling behavior
    const scrollToSection = (e) => {
        e.preventDefault()
        const targetId = e.currentTarget.getAttribute('href')
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div className="fixed left-0 top-1/2 z-50 -translate-y-1/2 transform rounded-r-lg bg-white p-2 shadow-lg dark:bg-gray-800">
            <ul className="space-y-4">
                <li>
                    <a
                        href="#hero"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Hero"
                        onClick={scrollToSection}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="#trust"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Trusted By"
                        onClick={scrollToSection}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="#features"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Features"
                        onClick={scrollToSection}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="#how-it-works"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="How It Works"
                        onClick={scrollToSection}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="#testimonials"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Testimonials"
                        onClick={scrollToSection}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="#faq"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="FAQ"
                        onClick={scrollToSection}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="#pricing"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Pricing"
                        onClick={scrollToSection}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
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
                    </a>
                </li>
                <li>
                    <a
                        href="#cta"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Get Started"
                        onClick={scrollToSection}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    )
}
