export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center h-input-height rounded-md border border-transparent bg-[#3B82F6] px-input-padding-x py-input-padding-y text-sm font-medium text-white transition-all duration-200 hover:bg-[#3B82F6]/90 focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:ring-offset-1 active:bg-[#3B82F6]/80 ${
                    disabled && 'opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    )
}
