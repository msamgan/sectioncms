export default function TabButton({
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
            className={`inline-flex items-center px-input-padding-x py-input-padding-y text-sm font-medium border-b-2 transition-all duration-200 ease-in-out ${
                active
                    ? 'text-primary border-primary'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            } ${disabled && 'opacity-50'} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
