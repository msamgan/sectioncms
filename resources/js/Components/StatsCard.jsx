export default function StatsCard({ label, count, icon }) {
    // Function to determine the appropriate color based on the icon
    const getIconColor = () => {
        // Extract the main icon type from the icon class
        const iconType = icon.replace('ri-', '').split('-')[0].toLowerCase();

        const colorMap = {
            'user': 'bg-primary',
            'shield': 'bg-success',
            'layout': 'bg-info',
            'global': 'bg-warning',
            'translate': 'bg-warning',
            'file': 'bg-secondary',
            'login': 'bg-success',
            'logout': 'bg-danger',
            'default': 'bg-primary'
        };

        return colorMap[iconType] || colorMap.default;
    };

    return (
        <div className="card h-100 shadow-sm hover-shadow-lg transition-all duration-200">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <div className="avatar me-4">
                        <span className={`avatar-initial rounded-3 ${getIconColor()}`}>
                            <i className={`ri ${icon} text-white`}></i>
                        </span>
                    </div>
                    <h3 className="mb-0 fw-semibold">{count}</h3>
                </div>
                <div className="d-flex align-items-center">
                    <h6 className="fw-normal text-md mb-0">{label}</h6>
                </div>
            </div>
        </div>
    )
}
