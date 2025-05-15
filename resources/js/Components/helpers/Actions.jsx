export default function Actions({ children }) {
    return (
        <div className="dropdown">
            <button type="button" className="btn dropdown-toggle hide-arrow p-0" data-bs-toggle="dropdown">
                <i className="ri-more-2-line"></i>
            </button>
            <div className="dropdown-menu">{children}</div>
        </div>
    )
}
