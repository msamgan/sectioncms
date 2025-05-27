import { Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'

export default function DependentMenu({ menuItems, itemKey, index }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const toggleOpen = (e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    const isActive = menuItems[itemKey].map((item, index) => route().current(item.route)).includes(true)

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = () => setIsOpen(false)
        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)
    }, [isOpen])

    return (
        <li
            key={index}
            onClick={toggleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={
                isActive
                    ? 'relative py-2.5 px-5 text-primary bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md font-medium transition-all duration-300 ease-in-out border-l-4 border-primary overflow-hidden'
                    : `relative py-2.5 px-5 text-gray-700 hover:text-primary rounded-lg transition-all duration-300 ease-in-out ${isHovered ? 'bg-gradient-to-br from-purple-50 to-purple-100 shadow-md border-l-4 border-primary' : ''}`
            }
        >
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center w-full justify-between">
                <div className="flex items-center">
                    <i className={`${menuItems[itemKey][0].parent.icon} mr-3 text-lg transition-transform duration-300`}></i>
                    <div data-i18n={itemKey} className="whitespace-nowrap font-medium">
                        {itemKey}
                    </div>
                </div>
                <i
                    className={`ri-arrow-down-s-line ml-3 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-primary' : ''}`}
                ></i>
            </a>

            {(isActive || isHovered) && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary opacity-70"></div>
            )}

            <ul
                className={`absolute left-0 top-full w-full mt-2 py-2 border border-purple-100 rounded-lg shadow-lg bg-white z-10 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {menuItems[itemKey].map((item, index) => {
                    const isItemActive = route().current(item.route)
                    return (
                        <li
                            key={index}
                            className={
                                isItemActive
                                    ? 'flex items-center py-2 px-4 mx-2 my-1 text-primary bg-gradient-to-br from-purple-50 to-purple-100 rounded-md shadow-md font-medium transition-all duration-300 ease-in-out border-l-3 border-primary relative overflow-hidden'
                                    : 'flex items-center py-2 px-4 mx-2 my-1 text-gray-700 hover:text-primary hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 rounded-md transition-all duration-300 ease-in-out hover:shadow-md hover:border-l-3 hover:border-primary relative overflow-hidden'
                            }
                        >
                            <Link href={route(item.route)} className="flex items-center w-full">
                                <i className={`${item.icon} mr-3 text-lg transition-transform duration-300`}></i>
                                <div data-i18n={item.label} className="whitespace-nowrap font-medium">
                                    {item.label}
                                </div>
                            </Link>
                            {isItemActive && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary opacity-70"></div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}
