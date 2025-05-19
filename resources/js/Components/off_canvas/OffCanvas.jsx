export default function OffCanvas({ id, title, w = 'w-75', children }) {
    return (
        <div
            className={`${w} offcanvas offcanvas-end border-start border-primary shadow-lg`}
            tabIndex="-1"
            id={id}
            aria-labelledby={id + 'Label'}
        >
            <div className="offcanvas-header border-bottom">
                <h5 id={id + 'Label'} className="offcanvas-title text-2xl font-semibold text-primary">
                    {title}
                </h5>
                <button
                    type="button"
                    className="btn-close text-reset bg-hover-danger rounded-circle transition-all duration-200"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body p-4">{children}</div>
        </div>
    )
}
