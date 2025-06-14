import React, { useState, useEffect } from 'react'

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
    const [activeSection, setActiveSection] = useState('hero')

    // State for tooltip visibility
    const [tooltip, setTooltip] = useState({ visible: false, text: '', position: { top: 0, left: 0 } })

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

    // Handle tooltip display
    const showTooltip = (e, text) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setTooltip({
            visible: true,
            text,
            position: {
                top: rect.top + window.scrollY + rect.height / 2,
                left: rect.right + window.scrollX + 15,
            },
        })
    }

    const hideTooltip = () => {
        setTooltip({ ...tooltip, visible: false })
    }

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
                <div className="backdrop-blur-md bg-white/30 rounded-full p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
                    <ul className="flex flex-col items-center space-y-4">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <li key={item.id} className="relative">
                                    <a
                                        href={`#${item.id}`}
                                        className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 focus:outline-none ${
                                            isActive
                                                ? 'shadow-[0_0_15px_rgba(0,0,0,0.2)]'
                                                : 'hover:scale-110 hover:shadow-md'
                                        }`}
                                        style={{
                                            backgroundColor: isActive ? item.color : 'rgba(255, 255, 255, 0.7)',
                                            color: isActive ? 'white' : '#555',
                                            transform: isActive ? 'scale(1.15)' : 'scale(1)',
                                            animation: isActive ? 'pulse 2s infinite' : 'none',
                                            position: 'relative',
                                            zIndex: 1,
                                        }}
                                        onClick={scrollToSection}
                                        onMouseEnter={(e) => showTooltip(e, item.title)}
                                        onMouseLeave={hideTooltip}
                                        aria-label={`Scroll to ${item.title} section`}
                                    >
                                        <i className={`${item.icon} text-xl`}></i>
                                        {isActive && (
                                            <span
                                                className="absolute inset-0 rounded-full opacity-50"
                                                style={{
                                                    backgroundColor: item.color,
                                                    animation: 'ripple 1.5s ease-out infinite',
                                                    zIndex: -1,
                                                }}
                                            />
                                        )}
                                    </a>
                                    {isActive && (
                                        <span
                                            className="absolute -right-2 top-1/2 h-2 w-2 rounded-full transform -translate-y-1/2"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Enhanced Tooltip */}
            {tooltip.visible && (
                <div
                    className="fixed z-50 px-4 py-2 text-sm font-medium text-white rounded-lg shadow-xl backdrop-blur-sm"
                    style={{
                        top: `${tooltip.position.top}px`,
                        left: `${tooltip.position.left}px`,
                        transform: 'translateY(-50%)',
                        background: 'rgba(0, 0, 0, 0.75)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        opacity: 0,
                        animation: 'fadeIn 0.3s ease-in-out forwards',
                    }}
                >
                    {tooltip.text}
                    <div
                        className="absolute w-3 h-3 transform rotate-45"
                        style={{
                            left: '-6px',
                            top: '50%',
                            marginTop: '-6px',
                            background: 'rgba(0, 0, 0, 0.75)',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    />
                    <style jsx>{`
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(-50%) translateX(10px); }
                            to { opacity: 1; transform: translateY(-50%) translateX(0); }
                        }
                    `}</style>
                </div>
            )}
            <style jsx global>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2); }
                    70% { box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
                }

                @keyframes ripple {
                    0% { transform: scale(0.8); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 0.2; }
                    100% { transform: scale(0.8); opacity: 0.5; }
                }
            `}</style>
        </>
    )
}
