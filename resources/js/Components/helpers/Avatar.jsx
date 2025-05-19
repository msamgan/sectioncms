import React from 'react'

/**
 * Avatar component for displaying circular avatars with icons
 *
 * @param {string} size - Size of the avatar (sm, xs)
 * @param {string} bgColor - Background color class (e.g., bg-primary, bg-success)
 * @param {string} icon - Icon class name (e.g., ri-user-line)
 * @param {string} className - Additional classes to apply to the avatar
 * @returns {JSX.Element}
 */
export default function Avatar({ size = 'sm', bgColor = 'bg-primary', icon, className = '' }) {
    // Determine margin based on size
    const margin = size === 'sm' ? 'me-3' : 'me-2'

    return (
        <div className={`avatar avatar-${size} ${margin} ${className}`}>
            <span className={`avatar-initial rounded-circle ${bgColor}`}>
                <i className={`${icon} text-white`}></i>
            </span>
        </div>
    )
}
