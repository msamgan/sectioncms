export default function StatsCard({ label, count, icon }) {
    return (
        <div className="card card-border-shadow-primary h-100">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <div className="avatar me-4">
                        <span className="avatar-initial rounded-3 bg-label-primary">
                            <i className={`icon-base ri ${icon} icon-24px`}></i>
                        </span>
                    </div>
                    <h4 className="text-md mb-0">{count}</h4>
                </div>
                <h6 className="fw-normal text-md mb-0 mt-1">{label}</h6>
            </div>
        </div>
    )
}
