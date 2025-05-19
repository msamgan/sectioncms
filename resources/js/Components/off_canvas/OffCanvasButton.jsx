export default function OffCanvasButton({ id, children, icon = 'ri-menu-line', className = '', ...props }) {
    return (
        <button
            className={`btn btn-primary d-inline-flex align-items-center shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target={'#' + id}
            aria-controls={id}
            {...props}
        >
            {icon && <i className={`${icon} me-2`}></i>}
            {children}
        </button>
    )
}
