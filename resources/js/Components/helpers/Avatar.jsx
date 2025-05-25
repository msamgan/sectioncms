/**
 * Avatar component for displaying circular avatars with icons
 *
 * @param {string} size - Size of the avatar (sm, xs)
 * @param {string} bgColor - Background color class (e.g., bg-blue-500, bg-green-500)
 * @param {string} icon - Icon class name (e.g., ri-user-line)
 * @param {string} className - Additional classes to apply to the avatar
 * @returns {JSX.Element}
 */
export default function Avatar({ size = 'sm', bgColor = 'bg-blue-500', icon, className = '' }) {
    // Map Bootstrap color classes to Tailwind equivalents
    const colorMap = {
        'bg-primary': 'bg-blue-500',
        'bg-success': 'bg-green-500',
        'bg-info': 'bg-cyan-500',
        'bg-warning': 'bg-yellow-500',
        'bg-secondary': 'bg-gray-500',
        'bg-danger': 'bg-red-500'
    }

    // Convert Bootstrap color to Tailwind if it's a Bootstrap color
    const tailwindBgColor = colorMap[bgColor] || bgColor

    // Determine size and margin based on size prop
    const avatarSize = size === 'sm' ? 'h-8 w-8' : 'h-6 w-6'
    const margin = size === 'sm' ? 'mr-3' : 'mr-2'

    return (
        <div className={`inline-flex items-center justify-center ${avatarSize} ${margin} ${className}`}>
            <span className={`flex items-center justify-center rounded-full ${tailwindBgColor} h-full w-full`}>
                <i className={`${icon} text-white`}></i>
            </span>
        </div>
    )
}
