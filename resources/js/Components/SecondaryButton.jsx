export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `hover:bg-gray-50 inline-flex items-center h-input-height rounded-input border border-gray-300 bg-white px-input-padding-x py-input-padding-y text-sm font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    )
}
