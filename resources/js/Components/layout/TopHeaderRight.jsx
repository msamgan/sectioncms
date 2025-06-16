import AddSite from '@/Components/layout/AddSite.jsx'
import HeaderNotification from '@/Components/layout/HeaderNotification.jsx'
import TopHeaderDropdown from '@/Components/layout/TopHeaderDropdown.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import { permissions } from '@/Utils/permissions/index.js'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function TopHeaderRight({ user }) {
    const { can } = usePermissions()
    const [activeButton, setActiveButton] = useState(null)
    const [unreadNotifications, setUnreadNotifications] = useState(0)
    const [showTooltip, setShowTooltip] = useState(null)

    // Update unread notifications count
    useEffect(() => {
        if (user && user.notifications) {
            setUnreadNotifications(user.notifications.filter((n) => !n.read_at).length)
        }
    }, [user])

    // Quick action buttons
    const quickActions = [
        {
            id: 'help',
            icon: 'ri-question-line',
            label: 'Help',
            color: 'bg-purple-100 text-purple-600',
            hoverColor: 'hover:bg-purple-200',
            tooltip: 'Get help and documentation',
        },
        {
            id: 'settings',
            icon: 'ri-settings-3-line',
            label: 'Settings',
            color: 'bg-gray-100 text-gray-600',
            hoverColor: 'hover:bg-gray-200',
            tooltip: 'Manage your settings',
            route: 'settings',
        },
    ]

    return (
        <div className="flex items-center" id="navbar-collapse">
            {/* Quick Action Buttons */}
            <div className="hidden md:flex items-center mr-4 space-x-2">
                {quickActions.map((action) => (
                    <div
                        key={action.id}
                        className="relative"
                        onMouseEnter={() => setShowTooltip(action.id)}
                        onMouseLeave={() => setShowTooltip(null)}
                    >
                        {action.route ? (
                            <Link
                                href={route(action.route)}
                                className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${action.color} ${action.hoverColor} hover:shadow-sm transform hover:-translate-y-0.5`}
                                onMouseEnter={() => setActiveButton(action.id)}
                                onMouseLeave={() => setActiveButton(null)}
                            >
                                <i
                                    className={`${action.icon} ${activeButton === action.id ? 'animate-pulse' : ''}`}
                                ></i>
                                <span className="ml-1.5">{action.label}</span>
                            </Link>
                        ) : (
                            <button
                                className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${action.color} ${action.hoverColor} hover:shadow-sm transform hover:-translate-y-0.5`}
                                onMouseEnter={() => setActiveButton(action.id)}
                                onMouseLeave={() => setActiveButton(null)}
                                aria-label={action.label}
                            >
                                <i
                                    className={`${action.icon} ${activeButton === action.id ? 'animate-pulse' : ''}`}
                                ></i>
                                <span className="ml-1.5">{action.label}</span>
                            </button>
                        )}

                        {/* Tooltip */}
                        {showTooltip === action.id && action.tooltip && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-50 animate-fade-in">
                                {action.tooltip}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Main Header Actions */}
            <ul className="flex items-center flex-row gap-3">
                {can(permissions.business.update) && (
                    <li className="relative group">
                        <div className="">
                            <AddSite />
                        </div>
                    </li>
                )}

                <li className="relative">
                    <div className="p-0.5 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-sm">
                        <HeaderNotification user={user} />
                    </div>
                    {unreadNotifications > 0 && (
                        <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-xs font-bold border-2 border-white animate-pulse">
                            {unreadNotifications > 9 ? '9+' : unreadNotifications}
                        </div>
                    )}
                </li>

                <li className="relative">
                    <div className="p-0.5 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-sm">
                        <TopHeaderDropdown user={user} />
                    </div>
                </li>
            </ul>
        </div>
    )
}
