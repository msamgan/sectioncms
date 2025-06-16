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

    // Check if bgColor already contains a gradient
    const hasGradient = bgColor.includes('from-') && bgColor.includes('to-')

    // If it's already a gradient, use it directly
    let backgroundClass
    if (hasGradient) {
        backgroundClass = bgColor
    } else {
        // Convert Bootstrap color to Tailwind gradient if it's a Bootstrap color
        const gradientColor =
            colorMap[bgColor] ||
            (bgColor === 'transparent' ? '' : `from-${bgColor.split('-')[1]}-500 to-${bgColor.split('-')[1]}-600`)

        // Determine if we should use a gradient
        const useGradient = bgColor !== 'transparent'

        // Determine background class
        backgroundClass = useGradient ? `bg-gradient-to-r ${gradientColor}` : bgColor
    }

    // Determine size and margin based on size prop
    let avatarSize, margin, iconSize

    if (size === 'xl') {
        avatarSize = 'h-16 w-16'
        margin = 'mr-4'
        iconSize = 'text-3xl'
    } else if (size === 'sm') {
        avatarSize = 'h-9 w-9'
        margin = 'mr-3'
        iconSize = 'text-lg'
    } else {
        avatarSize = 'h-7 w-7'
        margin = 'mr-2'
        iconSize = 'text-base'
    }

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
