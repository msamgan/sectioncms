import { useEffect, useState } from 'react'

export default function StatsCard({ label, count, icon }) {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Animation effect when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    // Generate a random pastel color for the icon background
    const getIconBgColor = () => {
        const colors = [
            'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
            'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
            'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
            'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
            'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
            'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
            'bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400',
        ]

        // Use the first character of the label to determine the color
        // This ensures the same label always gets the same color
        const index = label.charCodeAt(0) % colors.length
        return colors[index]
    }

    const iconColorClass = getIconBgColor()

    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-xl h-full shadow-sm hover:shadow-md
                      transition-all duration-250 ease-in-out overflow-hidden
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-6 relative">
                <div
                    className={`absolute top-0 right-0 h-24 w-24 -mt-8 -mr-8 rounded-full opacity-10 ${iconColorClass.split(' ')[0]} ${iconColorClass.split(' ')[1]}`}
                ></div>

                <div className="flex items-start">
                    <div className={`flex-shrink-0 p-3 rounded-lg mr-4 ${iconColorClass}`}>
                        <i className={`${icon} text-xl`}></i>
                    </div>
                    <div>
                        <h6 className="font-medium text-gray-500 dark:text-gray-400 m-0 text-sm">{label}</h6>
                        <div className="flex items-center mt-1">
                            <h3
                                className={`font-bold text-3xl text-gray-900 dark:text-gray-100 m-0 transition-all duration-300 ${isHovered ? 'text-primary' : ''}`}
                            >
                                {count}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
