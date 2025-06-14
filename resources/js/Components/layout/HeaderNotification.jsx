import { formatDuration } from '@/Utils/methods.js'
import { routes } from '@/Utils/routes/index.js'
import { Link } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

export default function HeaderNotification({ user }) {
    const [unreadNotifications, setUnreadNotifications] = useState(0)
    const [topFourNotifications, setTopFourNotifications] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        setUnreadNotifications(user.notifications.filter((notification) => !notification.read_at).length)
        setTopFourNotifications(user.notifications.slice(0, 3))

        // Close dropdown when clicking outside
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

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    // Function to determine notification icon based on notification type
    const getNotificationIcon = (notification) => {
        const type =
            notification.type
                ?.split('\\')
                .pop()
                .replace('Created', '')
                .replace('Updated', '')
                .replace('Deleted', '')
                .toLowerCase() || 'default'

        const iconMap = {
            user: 'ri-user-line',
            role: 'ri-shield-user-line',
            section: 'ri-layout-grid-line',
            language: 'ri-translate-2',
            medium: 'ri-file-list-line',
            login: 'ri-login-circle-line',
            logout: 'ri-logout-circle-line',
            default: 'ri-notification-2-line',
        }

        return iconMap[type] || iconMap.default
    }

    // Function to determine notification color based on the notification type
    const getNotificationColor = (notification) => {
        const type =
            notification.type
                ?.split('\\')
                .pop()
                .replace('Created', '')
                .replace('Updated', '')
                .replace('Deleted', '')
                .toLowerCase() || 'default'

        // Using a limited color palette with primary color as default
        const colorMap = {
            user: 'bg-primary',
            role: 'bg-primary',
            section: 'bg-primary',
            language: 'bg-primary',
            medium: 'bg-primary',
            login: 'bg-green-500', // Keep green for positive actions
            logout: 'bg-red-500', // Keep red for negative actions
            default: 'bg-primary',
        }

        return colorMap[type] || colorMap.default
    }

    return (
        <li className="relative mr-4 xl:mr-1" ref={dropdownRef}>
            <button
                className="flex items-center justify-center rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors duration-200 focus:outline-none"
                onClick={toggleMenu}
                aria-expanded={showMenu}
            >
                <i className="ri-notification-2-line text-2xl"></i>
                {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 border-2 border-white text-xs font-bold text-white">
                        {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </span>
                )}
            </button>

            <div
                className={`absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-lg bg-white py-0 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-200 ease-in-out ${
                    showMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
                <div className="border-b border-gray-200">
                    <div className="flex items-center justify-between px-4 py-3">
                        <h6 className="text-sm font-semibold text-gray-800">Notifications</h6>
                        {unreadNotifications > 0 && (
                            <div className="flex items-center">
                                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                    {unreadNotifications} New
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {topFourNotifications.length === 0 ? (
                        <div className="py-8 text-center">
                            <i className="ri-notification-off-line text-3xl text-gray-400 mb-2"></i>
                            <p className="text-sm text-gray-500">No notifications yet</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {topFourNotifications.map((notification, index) => (
                                <li
                                    key={index}
                                    className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                                        !notification.read_at ? 'bg-primary/5' : ''
                                    }`}
                                >
                                    <div className="flex p-4 items-start">
                                        <div
                                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getNotificationColor(notification)}`}
                                        >
                                            <i
                                                className={`${getNotificationIcon(notification)} text-white text-sm`}
                                            ></i>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h6
                                                className={`text-sm ${!notification.read_at ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'} mb-0.5 line-clamp-1`}
                                            >
                                                {notification.data.title}
                                            </h6>
                                            <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                                                {notification.data.message}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDuration(notification.created_at)}
                                            </p>
                                        </div>
                                        {!notification.read_at && (
                                            <div className="ml-2 mt-1">
                                                <span className="h-2 w-2 rounded-full bg-primary block"></span>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="border-t border-gray-200 p-3">
                    <Link
                        className="flex justify-center items-center w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 transition-colors duration-200 shadow-sm"
                        href={routes.notifications.index}
                    >
                        <span>View all notifications</span>
                    </Link>
                </div>
            </div>
        </li>
    )
}
