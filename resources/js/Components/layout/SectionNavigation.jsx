import React from 'react'

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

    // Track active section for highlighting
    const [activeSection, setActiveSection] = React.useState('hero')

    // Use Intersection Observer to detect which section is in view
    React.useEffect(() => {
        const sectionIds = [
            'hero',
            'trust',
            'features',
            'how-it-works',
            'testimonials',
            'faq',
            'pricing',
            'cta',
        ]

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        }

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        sectionIds.forEach((id) => {
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => {
            sectionIds.forEach((id) => {
                const element = document.getElementById(id)
                if (element) {
                    observer.unobserve(element)
                }
            })
        }
    }, [])

    // Navigation items data
    const navItems = [
        { id: 'hero', title: 'Hero', icon: 'ri-home-line' },
        { id: 'trust', title: 'Trusted By', icon: 'ri-shield-check-line' },
        { id: 'features', title: 'Features', icon: 'ri-star-line' },
        { id: 'how-it-works', title: 'How It Works', icon: 'ri-question-line' },
        { id: 'testimonials', title: 'Testimonials', icon: 'ri-chat-quote-line' },
        { id: 'faq', title: 'FAQ', icon: 'ri-questionnaire-line' },
        { id: 'pricing', title: 'Pricing', icon: 'ri-price-tag-3-line' },
        { id: 'cta', title: 'Get Started', icon: 'ri-rocket-line' },
    ]

    return (
        <div className="fixed left-0 top-1/2 z-50 -translate-y-1/2 transform rounded-r-panel bg-white p-3 shadow-lg transition-all duration-250 dark:bg-gray-800">
            <ul className="space-y-3">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={`flex h-10 w-10 items-center justify-center rounded-md transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
                                activeSection === item.id
                                    ? 'bg-blue-50 text-primary font-medium'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-50 hover:text-primary'
                            }`}
                            title={item.title}
                            onClick={scrollToSection}
                            aria-label={`Scroll to ${item.title} section`}
                        >
                            <i className={`${item.icon} text-lg`}></i>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
