export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `hover:bg-gray-50 hover:border-primary/30 inline-flex items-center h-input-height rounded-input border border-gray-300 bg-white px-input-padding-x py-input-padding-y text-sm font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    )
}
