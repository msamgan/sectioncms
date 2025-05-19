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

    return (
        <div className="card mt-4">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <div className={`avatar avatar-sm me-3 rounded-full pl-2 pt-1 ${getMessageColor()}`}>
                        <span className="text-white">
                            <i className={getMessageIcon()}></i>
                        </span>
                    </div>
                    <div className="flex-grow-1">
                        <p className="mb-0">{text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
