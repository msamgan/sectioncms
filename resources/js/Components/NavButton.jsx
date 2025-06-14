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
            className={`flex items-center px-input-padding-x py-input-padding-y text-sm font-medium ${
                active ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
            } transition-colors ${disabled && 'opacity-50'} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
