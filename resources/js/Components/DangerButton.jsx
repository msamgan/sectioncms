export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `border-transparent inline-flex items-center h-input-height rounded-input border bg-red-600 px-input-padding-x py-input-padding-y text-sm font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${
                    disabled && 'opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    )
}
