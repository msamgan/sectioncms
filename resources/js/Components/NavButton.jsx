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
                active ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]' : 'text-gray-700 hover:text-[#3B82F6]'
            } transition-colors ${disabled && 'opacity-50'} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
