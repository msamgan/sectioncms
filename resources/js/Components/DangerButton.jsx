export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `border-transparent inline-flex items-center h-input-height rounded-md border bg-red-600 px-input-padding-x py-input-padding-y text-sm font-medium text-white transition-all duration-200 hover:bg-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1 active:bg-red-700 ${
                    disabled && 'opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    )
}
