export default function DisplayMessage({
    text,
    title = null,
    type = 'info',
    icon = null,
    className = '',
    action = null,
    actionText = 'Action',
    onAction = null,
}) {
    const getMessageIcon = () => {
        const iconMap = {
            info: 'ri-information-line',
            success: 'ri-check-line',
            warning: 'ri-alert-line',
            error: 'ri-error-warning-line',
            empty: 'ri-inbox-line',
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
            empty: 'bg-gray-400',
            default: 'bg-primary',
        }

        return colorMap[type] || colorMap.default
    }

    const getTextColor = () => {
        const colorMap = {
            info: 'text-primary',
            success: 'text-green-600',
            warning: 'text-yellow-600',
            error: 'text-red-600',
            empty: 'text-gray-600',
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
            empty: 'bg-gray-50',
            default: 'bg-blue-50',
        }

        return colorMap[type] || colorMap.default
    }

    const getBorderColor = () => {
        const colorMap = {
            info: 'border-primary',
            success: 'border-green-500',
            warning: 'border-yellow-500',
            error: 'border-red-500',
            empty: 'border-gray-400',
            default: 'border-primary',
        }

        return colorMap[type] || colorMap.default
    }

    const getButtonColor = () => {
        const colorMap = {
            info: 'bg-primary hover:bg-blue-600 text-white',
            success: 'bg-green-500 hover:bg-green-600 text-white',
            warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
            error: 'bg-red-500 hover:bg-red-600 text-white',
            empty: 'bg-gray-500 hover:bg-gray-600 text-white',
            default: 'bg-primary hover:bg-blue-600 text-white',
        }

        return colorMap[type] || colorMap.default
    }

    const handleAction = () => {
        if (onAction && typeof onAction === 'function') {
            onAction()
        }
    }

    return (
        <div
            className={`mt-4 bg-white rounded-xl overflow-hidden transition-all duration-250 w-full shadow-sm hover:shadow-md border-l-4 ${getBorderColor()} ${className}`}
        >
            <div className={`${getBackgroundColor()} p-5`}>
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="flex items-start mb-4 sm:mb-0">
                        <div
                            className={`flex-shrink-0 w-10 h-10 rounded-lg ${getMessageColor()} flex items-center justify-center mr-4 shadow-sm`}
                        >
                            <span className="text-white text-lg">
                                <i className={icon || getMessageIcon()}></i>
                            </span>
                        </div>
                        <div className="flex-grow">
                            {title && <h4 className={`text-base font-semibold ${getTextColor()} mb-1`}>{title}</h4>}
                            <p className={`m-0 text-sm ${title ? 'text-gray-600' : `font-medium ${getTextColor()}`}`}>
                                {text}
                            </p>
                        </div>
                    </div>

                    {(action || onAction) && (
                        <div className="mt-3 sm:mt-0 sm:ml-auto">
                            <button
                                onClick={handleAction}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-${type === 'empty' ? 'gray' : type}-500 ${getButtonColor()}`}
                                aria-label={`${action || actionText} for ${title || text}`}
                            >
                                {action || actionText}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
