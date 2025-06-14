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
                        <i className="ri-home-line text-primary text-lg"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="#trust"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Trusted By"
                        onClick={scrollToSection}
                    >
                        <i className="ri-shield-check-line text-primary text-lg"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="#features"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Features"
                        onClick={scrollToSection}
                    >
                        <i className="ri-star-line text-primary text-lg"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="#how-it-works"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="How It Works"
                        onClick={scrollToSection}
                    >
                        <i className="ri-question-line text-primary text-lg"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="#testimonials"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Testimonials"
                        onClick={scrollToSection}
                    >
                        <i className="ri-chat-quote-line text-primary text-lg"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="#faq"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="FAQ"
                        onClick={scrollToSection}
                    >
                        <i className="ri-questionnaire-line text-primary text-lg"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="#pricing"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Pricing"
                        onClick={scrollToSection}
                    >
                        <i className="ri-price-tag-3-line text-primary text-lg"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="#cta"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900"
                        title="Get Started"
                        onClick={scrollToSection}
                    >
                        <i className="ri-rocket-line text-primary text-lg"></i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
