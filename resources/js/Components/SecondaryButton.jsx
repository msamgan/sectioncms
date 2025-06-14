export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `hover:bg-gray-50 hover:border-primary/30 inline-flex items-center h-input-height rounded-md border border-gray-200 bg-white px-input-padding-x py-input-padding-y text-sm font-medium text-gray-700 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    )
}
