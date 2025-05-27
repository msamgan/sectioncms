import { Link } from '@inertiajs/react'
import { useState } from 'react'

export default function IndependentMenu({ item, index }) {
    const [isHovered, setIsHovered] = useState(false)

    const isActive = route().current(item.route)

    return (
        <li
            key={index}
            className={
                isActive
                    ? 'flex items-center py-2.5 px-5 text-primary bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md font-medium transition-all duration-300 ease-in-out border-l-4 border-primary relative overflow-hidden'
                    : `flex items-center py-2.5 px-5 text-gray-700 hover:text-primary rounded-lg transition-all duration-300 ease-in-out ${isHovered ? 'bg-gradient-to-br from-purple-50 to-purple-100 shadow-md border-l-4 border-primary' : ''}`
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={route(item.route)} className="flex items-center w-full">
                <i className={`${item.icon} mr-3 text-lg transition-transform duration-300`}></i>
                <div data-i18n={item.label} className="whitespace-nowrap font-medium">
                    {item.label}
                </div>
            </Link>
            {(isActive || isHovered) && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary opacity-70"></div>
            )}
        </li>
    )
}
