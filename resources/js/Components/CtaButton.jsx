import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function CtaButton({
    href,
    children,
    className = '',
    primary = true,
    highContrast = false,
    size = 'md',
    icon = null,
    pulse = false,
    countdown = false,
    onClick = null,
}) {
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 59,
        seconds: 59,
    })

    useEffect(() => {
        if (!countdown) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const newSeconds = prev.seconds - 1

                if (newSeconds >= 0) {
                    return { ...prev, seconds: newSeconds }
                }

                const newMinutes = prev.minutes - 1
                if (newMinutes >= 0) {
                    return { ...prev, minutes: newMinutes, seconds: 59 }
                }

                const newHours = prev.hours - 1
                if (newHours >= 0) {
                    return { ...prev, hours: newHours, minutes: 59, seconds: 59 }
                }

                const newDays = prev.days - 1
                if (newDays >= 0) {
                    return { ...prev, days: newDays, hours: 23, minutes: 59, seconds: 59 }
                }

                return { days: 0, hours: 0, minutes: 0, seconds: 0 }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [countdown])

    const baseStyles =
        'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300'

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'h-input-height px-input-padding-x py-input-padding-y text-sm',
        lg: 'px-6 py-3 text-base',
    }

    const colorStyles = primary
        ? highContrast
            ? 'text-gray-900 bg-white hover:bg-gray-100 focus:ring-gray-200 shadow-md hover:shadow-lg transform hover:scale-105'
            : 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-md hover:shadow-lg transform hover:scale-105'
        : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-blue-500'

    const pulseAnimation = pulse ? 'animate-pulse' : ''

    const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${colorStyles} ${pulseAnimation} ${className}`

    const handleClick = (e) => {
        if (onClick) {
            onClick(e)
        }
    }

    const renderCountdown = () => {
        if (!countdown) return null

        return (
            <div className="ml-2 flex items-center rounded bg-white/20 px-1.5 py-0.5 text-xs">
                <span className="font-mono">{`${timeLeft.days}d:${timeLeft.hours.toString().padStart(2, '0')}h:${timeLeft.minutes.toString().padStart(2, '0')}m:${timeLeft.seconds.toString().padStart(2, '0')}s`}</span>
            </div>
        )
    }

    const renderIcon = () => {
        if (!icon) return null

        return <span className="ml-2 transition-transform duration-300 ease-in-out group-hover:rotate-12">{icon}</span>
    }

    if (href) {
        return (
            <Link href={href} className={`group ${buttonStyles}`} onClick={handleClick}>
                <span className="flex items-center">
                    {children}
                    {renderCountdown()}
                    {renderIcon()}
                </span>
            </Link>
        )
    }

    return (
        <button className={`group ${buttonStyles}`} onClick={handleClick}>
            <span className="flex items-center">
                {children}
                {renderCountdown()}
                {renderIcon()}
            </span>
        </button>
    )
}
