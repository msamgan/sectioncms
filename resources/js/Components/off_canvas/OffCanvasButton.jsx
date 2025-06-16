export default function OffCanvasButton({ id, children, icon = 'ri-menu-line', className = '', ...props }) {
    return (
        <button
            className={`inline-flex items-center justify-center h-input-height rounded-lg border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 px-input-padding-x py-input-padding-y text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700 ${className}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target={'#' + id}
            aria-controls={id}
            {...props}
        >
            <span className="flex items-center">
                {icon && <i className={`${icon} mr-2 text-white/90`}></i>}
                {children}
            </span>
        </button>
    )
}
