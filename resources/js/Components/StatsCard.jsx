import Avatar from '@/Components/helpers/Avatar.jsx'
import { useEffect, useState } from 'react'

export default function StatsCard({ label, count, icon }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Function to determine the appropriate color based on the icon
    const getIconColor = () => {
        // Extract the main icon type from the icon class
        const iconType = icon.replace('ri-', '').split('-')[0].toLowerCase()

        // Using Tailwind color classes
        const colorMap = {
            user: 'bg-blue-500',
            shield: 'bg-green-500',
            layout: 'bg-cyan-500',
            global: 'bg-yellow-500',
            translate: 'bg-yellow-500',
            file: 'bg-gray-500',
            login: 'bg-green-500',
            logout: 'bg-red-500',
            default: 'bg-blue-500',
        }

        return colorMap[iconType] || colorMap.default
    }

    // Get gradient color based on icon type
    const getGradientColor = () => {
        const iconType = icon.replace('ri-', '').split('-')[0].toLowerCase()

        const gradientMap = {
            user: 'from-blue-50 to-blue-100',
            shield: 'from-green-50 to-green-100',
            layout: 'from-cyan-50 to-cyan-100',
            global: 'from-yellow-50 to-yellow-100',
            translate: 'from-yellow-50 to-yellow-100',
            file: 'from-gray-50 to-gray-100',
            login: 'from-green-50 to-green-100',
            logout: 'from-red-50 to-red-100',
            default: 'from-blue-50 to-blue-100',
        }

        return gradientMap[iconType] || gradientMap.default
    }

    // Get text color based on icon type
    const getTextColor = () => {
        const iconType = icon.replace('ri-', '').split('-')[0].toLowerCase()

        const textColorMap = {
            user: 'text-blue-600',
            shield: 'text-green-600',
            layout: 'text-cyan-600',
            global: 'text-yellow-600',
            translate: 'text-yellow-600',
            file: 'text-gray-600',
            login: 'text-green-600',
            logout: 'text-red-600',
            default: 'text-blue-600',
        }

        return textColorMap[iconType] || textColorMap.default
    }

    // Animation effect when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className={`bg-gradient-to-br ${getGradientColor()} rounded-xl h-full border border-gray-100
                      ${isHovered ? 'shadow-md scale-105' : 'shadow-sm'}
                      transition-all duration-300 ease-in-out overflow-hidden
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-5">
                <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                        <Avatar
                            size="sm"
                            bgColor={getIconColor()}
                            icon={icon}
                            className={`mr-0 ${isHovered ? 'scale-110' : ''} transition-transform duration-300`}
                        />
                    </div>
                    <h3 className={`font-bold text-2xl m-0 ${getTextColor()} transition-all duration-300 ml-10`}>
                        {count}
                    </h3>
                </div>
                <div className="flex items-center">
                    <h6 className="font-medium text-md text-gray-900 m-0">{label}</h6>
                </div>
            </div>
            <div
                className={`h-1 w-full ${getIconColor()} transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
            ></div>
        </div>
    )
}
