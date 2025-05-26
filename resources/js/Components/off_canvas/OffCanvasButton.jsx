export default function OffCanvasButton({ id, children, icon = 'ri-menu-line', className = '', ...props }) {
    return (
        <button
            className={`bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md inline-flex items-center shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${className}`}
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
