export default function NavButton({
    type = 'button',
    className = '',
    active = false,
    disabled = false,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`flex items-center px-input-padding-x py-input-padding-y rounded-input text-sm font-medium ${
                active
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
            } transition-colors ${disabled && 'opacity-50'} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
