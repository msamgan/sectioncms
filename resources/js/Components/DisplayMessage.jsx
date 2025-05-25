export default function DisplayMessage({ text, type = 'info' }) {
    // Function to determine message icon based on type
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

    // Function to determine message color based on type
    const getMessageColor = () => {
        const colorMap = {
            info: 'bg-info',
            success: 'bg-success',
            warning: 'bg-warning',
            error: 'bg-danger',
            default: 'bg-primary',
        }

        return colorMap[type] || colorMap.default
    }

    // Function to determine text color based on type
    const getTextColor = () => {
        const colorMap = {
            info: 'text-info',
            success: 'text-success',
            warning: 'text-warning',
            error: 'text-danger',
            default: 'text-primary',
        }

        return colorMap[type] || colorMap.default
    }

    // Function to determine gradient color based on type
    const getGradientColor = () => {
        const gradientMap = {
            info: 'from-blue-50 to-blue-100',
            success: 'from-green-50 to-green-100',
            warning: 'from-yellow-50 to-yellow-100',
            error: 'from-red-50 to-red-100',
            default: 'from-purple-50 to-purple-100',
        }

        return gradientMap[type] || gradientMap.default
    }

    return (
        <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md w-full">
            <div className={`bg-gradient-to-r ${getGradientColor()} p-4`}>
                <div className="flex items-center">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getMessageColor()} flex items-center justify-center shadow-sm mr-4`}>
                        <span className="text-white">
                            <i className={getMessageIcon()}></i>
                        </span>
                    </div>
                    <div className="flex-grow">
                        <p className={`m-0 font-medium ${getTextColor()}`}>{text}</p>
                    </div>
                </div>
            </div>
            <div className={`h-1 w-full ${getMessageColor()} opacity-80`}></div>
        </div>
    )
}
