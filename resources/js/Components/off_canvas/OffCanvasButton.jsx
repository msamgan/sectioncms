export default function OffCanvasButton({ id, children, icon = 'ri-menu-line', className = '', ...props }) {
    return (
        <button
            className={`inline-flex items-center justify-center h-input-height rounded-input border border-transparent bg-primary px-input-padding-x py-input-padding-y text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700 ${className}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target={'#' + id}
            aria-controls={id}
            {...props}
        >
            {icon && <i className={`${icon} mr-2`}></i>}
            {children}
        </button>
    )
}
