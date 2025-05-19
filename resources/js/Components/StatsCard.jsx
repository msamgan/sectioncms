import Avatar from '@/Components/helpers/Avatar.jsx'

export default function StatsCard({ label, count, icon }) {
    // Function to determine the appropriate color based on the icon
    const getIconColor = () => {
        // Extract the main icon type from the icon class
        const iconType = icon.replace('ri-', '').split('-')[0].toLowerCase()

        const colorMap = {
            user: 'bg-primary',
            shield: 'bg-success',
            layout: 'bg-info',
            global: 'bg-warning',
            translate: 'bg-warning',
            file: 'bg-secondary',
            login: 'bg-success',
            logout: 'bg-danger',
            default: 'bg-primary',
        }

        return colorMap[iconType] || colorMap.default
    }

    return (
        <div className="card h-100 hover-shadow-lg shadow-sm transition-all duration-200">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <Avatar size="sm" bgColor={getIconColor()} icon={icon} className="me-4" />
                    <h3 className="fw-semibold mb-0">{count}</h3>
                </div>
                <div className="d-flex align-items-center">
                    <h6 className="fw-normal text-md mb-0">{label}</h6>
                </div>
            </div>
        </div>
    )
}
