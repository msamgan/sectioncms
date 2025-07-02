import ApplicationLogo from '@/Components/ApplicationLogo.jsx'
import TopHeaderRight from '@/Components/layout/TopHeaderRight.jsx'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function TopHeader({ user }) {
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`flex items-center bg-white w-full transition-all duration-300 ${
                scrolled ? 'shadow-md' : 'border-b border-gray-100'
            }`}
            id="layout-navbar"
        >
            <div className="w-full flex justify-between py-3 px-4">
                {/* Left Side - Logo and Mobile Menu Button */}
                <div className="flex items-center flex-col">
                    {/* Logo - Visible on all screens */}
                    <Link href="/" className="flex items-center">
                        <div className="flex-shrink-0 relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-sm opacity-30"></div>
                            <div className="relative">
                                <ApplicationLogo className="fill-current block h-9 w-auto text-primary" />
                            </div>
                        </div>
                        <span className="ml-2 font-bold text-gray-800 hidden sm:block">SectionCMS</span>

                    </Link>
                    <span className={'text-md text-gray-500 hidden sm:block ml-6'}>
                        {user.business.name}
                    </span>
                </div>

                {/* Right Side - Search and User Actions */}
                <div className="flex items-center">
                    {/* Header Right Components */}
                    <TopHeaderRight user={user} />
                </div>
            </div>
        </nav>
    )
}
