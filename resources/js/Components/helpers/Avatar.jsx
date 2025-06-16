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
        'bg-primary': 'from-blue-500 to-blue-600',
        'bg-success': 'from-green-500 to-green-600',
        'bg-info': 'from-cyan-500 to-cyan-600',
        'bg-warning': 'from-yellow-500 to-yellow-600',
        'bg-secondary': 'from-gray-500 to-gray-600',
        'bg-danger': 'from-red-500 to-red-600',
    }

    // Convert Bootstrap color to Tailwind gradient if it's a Bootstrap color
    const gradientColor =
        colorMap[bgColor] ||
        (bgColor === 'transparent' ? '' : `from-${bgColor.split('-')[1]}-500 to-${bgColor.split('-')[1]}-600`)

    // Determine if we should use a gradient
    const useGradient = bgColor !== 'transparent'

    // Determine background class
    const backgroundClass = useGradient ? `bg-gradient-to-r ${gradientColor}` : bgColor

    // Determine size and margin based on size prop
    const avatarSize = size === 'sm' ? 'h-9 w-9' : 'h-7 w-7'
    const margin = size === 'sm' ? 'mr-3' : 'mr-2'
    const iconSize = size === 'sm' ? 'text-lg' : 'text-base'

    return (
        <div className={`inline-flex items-center justify-center ${avatarSize} ${margin} ${className}`}>
            <span
                className={`flex items-center justify-center rounded-lg ${backgroundClass} h-full w-full shadow-sm transition-all duration-200 hover:shadow-md`}
            >
                <i className={`${icon} text-white ${iconSize}`}></i>
            </span>
        </div>
    )
}
