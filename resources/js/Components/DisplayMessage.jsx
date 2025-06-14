export default function DisplayMessage({ text, type = 'info' }) {
    const getMessageIcon = () => {
        const iconMap = {
            info: 'ri-information-line',
            success: 'ri-check-line',
            warning: 'ri-alert-line',
            error: 'ri-error-warning-line',
            default: 'ri-information-line',
        }

        return iconMap[type] || iconMap.default
    }

    const getMessageColor = () => {
        const colorMap = {
            info: 'bg-primary',
            success: 'bg-green-500',
            warning: 'bg-yellow-500',
            error: 'bg-red-500',
            default: 'bg-primary',
        }

        return colorMap[type] || colorMap.default
    }

    const getTextColor = () => {
        const colorMap = {
            info: 'text-primary',
            success: 'text-green-500',
            warning: 'text-yellow-500',
            error: 'text-red-500',
            default: 'text-primary',
        }

        return colorMap[type] || colorMap.default
    }

    const getBackgroundColor = () => {
        const colorMap = {
            info: 'bg-blue-50',
            success: 'bg-green-50',
            warning: 'bg-yellow-50',
            error: 'bg-red-50',
            default: 'bg-blue-50',
        }

        return colorMap[type] || colorMap.default
    }

    return (
        <div className="mt-4 bg-white rounded-md overflow-hidden transition-all duration-300 w-full">
            <div className={`${getBackgroundColor()} p-3`}>
                <div className="flex items-center">
                    <div
                        className={`flex-shrink-0 w-8 h-8 rounded-md ${getMessageColor()} flex items-center justify-center mr-3`}
                    >
                        <span className="text-white text-sm">
                            <i className={getMessageIcon()}></i>
                        </span>
                    </div>
                    <div className="flex-grow">
                        <p className={`m-0 text-sm ${getTextColor()}`}>{text}</p>
                    </div>
                </div>
            </div>
            <div className={`h-0.5 w-full ${getMessageColor()}`}></div>
        </div>
    )
}
