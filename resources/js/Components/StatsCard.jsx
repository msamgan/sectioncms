import Avatar from '@/Components/helpers/Avatar.jsx'

export default function StatsCard({ label, count, icon }) {
    // Function to determine the appropriate color based on the icon
    const getIconColor = () => {
        // Extract the main icon type from the icon class
        const iconType = icon.replace('ri-', '').split('-')[0].toLowerCase()

        // Using Tailwind color classes
        const colorMap = {
            user: 'bg-blue-500',
            shield: 'bg-green-500',
            layout: 'bg-cyan-500',
            global: 'bg-yellow-500',
            translate: 'bg-yellow-500',
            file: 'bg-gray-500',
            login: 'bg-green-500',
            logout: 'bg-red-500',
            default: 'bg-blue-500',
        }

        return colorMap[iconType] || colorMap.default
    }

    return (
        <div className="bg-white rounded-lg h-full shadow-sm hover:shadow-lg transition-all duration-200">
            <div className="p-4">
                <div className="flex items-center mb-3">
                    <Avatar size="sm" bgColor={getIconColor()} icon={icon} className="mr-4" />
                    <h3 className="font-semibold text-xl m-0">{count}</h3>
                </div>
                <div className="flex items-center">
                    <h6 className="font-normal text-sm text-gray-600 m-0">{label}</h6>
                </div>
            </div>
        </div>
    )
}
