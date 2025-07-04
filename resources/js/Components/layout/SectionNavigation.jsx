import { useEffect, useState } from 'react'

export default function SectionNavigation() {
    // Track dark mode state
    const [isDarkMode, setIsDarkMode] = useState(false)

    // Check and update dark mode state
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'))
        }

        // Initial check
        checkDarkMode()

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'class'
                ) {
                    checkDarkMode()
                }
            })
        })

        observer.observe(document.documentElement, { attributes: true })

        return () => {
            observer.disconnect()
        }
    }, [])
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
    const [activeSection, setActiveSection] = useState('hero')

    // Use Intersection Observer to detect which section is in view
    useEffect(() => {
        const sectionIds = [
            'hero',
            'trust',
            'features',
            'translation',
            'how-it-works',
            'testimonials',
            'faq',
            'pricing',
            'cta',
        ]

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -20% 0px',
            threshold: 0.2,
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

    // Navigation items data with colors
    const navItems = [
        { id: 'hero', title: 'Hero', icon: 'ri-home-line', color: '#FF6B6B' },
        { id: 'trust', title: 'Trusted By', icon: 'ri-shield-check-line', color: '#4ECDC4' },
        { id: 'features', title: 'Features', icon: 'ri-star-line', color: '#FFD166' },
        { id: 'translation', title: 'Translation', icon: 'ri-translate-2', color: '#4CAF50' },
        { id: 'how-it-works', title: 'How It Works', icon: 'ri-question-line', color: '#6A0572' },
        { id: 'testimonials', title: 'Testimonials', icon: 'ri-chat-quote-line', color: '#1A936F' },
        { id: 'faq', title: 'FAQ', icon: 'ri-questionnaire-line', color: '#3D5A80' },
        { id: 'pricing', title: 'Pricing', icon: 'ri-price-tag-3-line', color: '#F25F5C' },
        { id: 'cta', title: 'Get Started', icon: 'ri-rocket-line', color: '#7209B7' },
    ]

    return (
        <>
            <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2 transform p-3 transition-all duration-300">
                <div className="backdrop-blur-md bg-white/30 dark:bg-gray-900/40 rounded-full p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-white/20 dark:border-gray-700/30">
                    <ul className="flex flex-col items-center space-y-4">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id
                            return (
                                <li key={item.id} className="relative">
                                    <a
                                        href={`#${item.id}`}
                                        className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 focus:outline-none ${
                                            isActive
                                                ? 'shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]'
                                                : 'hover:scale-110 hover:shadow-md dark:hover:shadow-gray-800'
                                        }`}
                                        style={{
                                            backgroundColor: isActive
                                                ? item.color
                                                : isDarkMode
                                                    ? 'rgba(30, 41, 59, 0.7)' // dark mode inactive bg
                                                    : 'rgba(255, 255, 255, 0.7)', // light mode inactive bg
                                            color: isActive
                                                ? 'white'
                                                : isDarkMode
                                                    ? 'rgba(255, 255, 255, 0.8)' // dark mode inactive text
                                                    : '#555', // light mode inactive text
                                            transform: isActive ? 'scale(1.15)' : 'scale(1)',
                                            animation: isActive
                                                ? isDarkMode
                                                    ? 'darkPulse 2s infinite'
                                                    : 'pulse 2s infinite'
                                                : 'none',
                                            position: 'relative',
                                            zIndex: 1,
                                            // Force color for translation section when active
                                            ...(isActive && item.id === 'translation'
                                                ? { backgroundColor: '#4CAF50' }
                                                : {}),
                                        }}
                                        onClick={scrollToSection}
                                        aria-label={`Scroll to ${item.title} section`}
                                    >
                                        <i className={`${item.icon} text-xl`}></i>
                                        {isActive && (
                                            <span
                                                className="absolute inset-0 rounded-full opacity-50"
                                                style={{
                                                    backgroundColor: item.id === 'translation' ? '#4CAF50' : item.color,
                                                    animation: 'ripple 1.5s ease-out infinite',
                                                    zIndex: -1,
                                                }}
                                            />
                                        )}
                                    </a>
                                    {isActive && (
                                        <span
                                            className="absolute -right-2 top-1/2 h-2 w-2 rounded-full transform -translate-y-1/2"
                                            style={{
                                                backgroundColor: item.id === 'translation' ? '#4CAF50' : item.color,
                                            }}
                                        />
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                    }
                }

                @keyframes darkPulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
                    }
                }

                @keyframes ripple {
                    0% {
                        transform: scale(0.8);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 0.2;
                    }
                    100% {
                        transform: scale(0.8);
                        opacity: 0.5;
                    }
                }
            `}</style>
        </>
    )
}
