import ResponsiveNavLink from '@/Components/ResponsiveNavLink.jsx'
import usePermissions from '@/Hooks/usePermissions'
import { permissions } from '@/Utils/permissions/index.js'
import { Link } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

export default function TopHeaderDropdown({ user }) {
    const { can } = usePermissions()
    const [showMenu, setShowMenu] = useState(false)
    const dropdownRef = useRef(null)

    // Get user initials for avatar fallback
    const getUserInitials = () => {
        if (!user || !user.name) return '?'
        return user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
    }

    // Get user avatar or use initials
    const getUserAvatar = () => {
        // Check if user has an avatar
        if (user.avatar_url) {
            return user.avatar_url
        }
        return null
    }

    // Get status color
    const getStatusColor = () => {
        const statusColors = {
            online: 'bg-green-500',
            away: 'bg-yellow-500',
            busy: 'bg-red-500',
            offline: 'bg-gray-400',
        }
        return statusColors.online
    }

    // Toggle dropdown menu
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Menu items
    const menuItems = [
        {
            id: 'settings',
            icon: 'ri-settings-3-line',
            label: 'Settings',
            route: 'settings',
            color: 'text-gray-600',
        },
        ...(can(permissions.payment_method.list)
            ? [
                  {
                      id: 'payment',
                      icon: 'ri-bank-card-line',
                      label: 'Payment Methods',
                      route: 'payment-methods.index',
                      color: 'text-purple-600',
                  },
              ]
            : []),
        {
            id: 'notifications',
            icon: 'ri-notification-3-line',
            label: 'Notifications',
            route: 'notification.index',
            color: 'text-yellow-600',
        },
    ]

    return (
        <li className="relative" ref={dropdownRef}>
            <button
                onClick={toggleMenu}
                className="flex items-center justify-center rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-expanded={showMenu}
                aria-label="User menu"
            >
                <div className="relative">
                    {getUserAvatar() ? (
                        <img
                            src={getUserAvatar()}
                            alt={`${user.name}'s avatar`}
                            className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-sm transition-transform duration-200 hover:scale-110"
                        />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm border-2 border-white shadow-sm transition-transform duration-200 hover:scale-110">
                            {getUserInitials()}
                        </div>
                    )}
                    <span
                        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ${getStatusColor()} border-2 border-white shadow-sm`}
                    ></span>
                </div>
            </button>

            <div
                className={`absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-200 ease-in-out ${
                    showMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
                {/* User Profile Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl border-b border-gray-100">
                    <div className="flex items-center">
                        <div className="mr-3 flex-shrink-0">
                            <div className="relative">
                                {getUserAvatar() ? (
                                    <img
                                        src={getUserAvatar()}
                                        alt={`${user.name}'s avatar`}
                                        className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium border-2 border-white shadow-sm">
                                        {getUserInitials()}
                                    </div>
                                )}
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                    <span className={`block h-3.5 w-3.5 rounded-full ${getStatusColor()}`}></span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <h4 className="text-base font-semibold text-gray-800 mb-0.5">{user.name}</h4>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600 mr-2">{user.role.display_name}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="py-2 px-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            href={route(item.route)}
                            className="flex items-center px-3 py-2 mx-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                        >
                            <div
                                className={`w-8 h-8 rounded-lg ${item.color.replace('text-', 'bg-').replace('600', '100')} flex items-center justify-center mr-3 transition-all duration-200 group-hover:scale-110`}
                            >
                                <i className={`${item.icon} ${item.color}`}></i>
                            </div>
                            <span className="text-gray-700 font-medium">{item.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-1 mx-4"></div>

                {/* Logout */}
                <div className="py-2 px-3">
                    <ResponsiveNavLink
                        method="post"
                        href={route('logout')}
                        as="button"
                        className="w-full rounded-lg hover:bg-red-50 transition-colors duration-200 group"
                    >
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 transition-all duration-200 group-hover:scale-110">
                                <i className="ri-logout-box-line text-red-600"></i>
                            </div>
                            <span className="text-red-600 font-medium">Log Out</span>
                        </div>
                    </ResponsiveNavLink>
                </div>
            </div>
        </li>
    )
}
