import { useEffect, useState } from 'react'

export default function LoadingIndicator({
    size = 'md',
    text = null,
    className = '',
    center = false,
    fullHeight = false,
    type = 'pulse',
}) {
    const [dots, setDots] = useState('.')

    // Animated dots for loading text
    useEffect(() => {
        if (!text) return

        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'))
        }, 500)

        return () => clearInterval(interval)
    }, [text])

    // Size classes
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-10 w-10',
    }

    // Container classes
    const containerClasses = `
        ${center ? 'flex justify-center items-center' : ''}
        ${fullHeight ? 'h-full min-h-[200px]' : ''}
        ${className}
    `

    // Different loading animations
    const renderLoadingIndicator = () => {
        switch (type) {
            case 'pulse':
                return (
                    <div className="flex space-x-2">
                        <div className={`${sizeClasses[size]} bg-blue-400 rounded-full animate-pulse`}></div>
                        <div
                            className={`${sizeClasses[size]} bg-indigo-400 rounded-full animate-pulse delay-150`}
                        ></div>
                        <div
                            className={`${sizeClasses[size]} bg-purple-400 rounded-full animate-pulse delay-300`}
                        ></div>
                    </div>
                )
            case 'spin':
                return (
                    <div
                        className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin`}
                    ></div>
                )
            case 'wave':
                return (
                    <div className="flex space-x-1 items-end">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`${sizeClasses[size === 'sm' ? 'sm' : 'md']} bg-gradient-to-t from-blue-500 to-indigo-600 rounded-sm animate-wave`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            ></div>
                        ))}
                    </div>
                )
            default:
                return <div className={`${sizeClasses[size]} bg-blue-500 rounded-full animate-pulse`}></div>
        }
    }

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center">
                {renderLoadingIndicator()}
                {text && (
                    <div className="mt-3 text-gray-600 dark:text-gray-400 font-medium">
                        {text}
                        {dots}
                    </div>
                )}
            </div>
        </div>
    )
}
