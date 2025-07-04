import { formatDuration } from '@/Utils/methods.js'
import { routes } from '@/Utils/routes/index.js'
import { Link } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

export default function HeaderNotification({ user }) {
    const [unreadNotifications, setUnreadNotifications] = useState(0)
    const [notifications, setNotifications] = useState([])
    const [filteredNotifications, setFilteredNotifications] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('all')
    const dropdownRef = useRef(null)
    const bellRef = useRef(null)

    useEffect(() => {
        // Simulate loading
        setIsLoading(true)

        setTimeout(() => {
            if (user && user.notifications) {
                setUnreadNotifications(user.notifications.filter((notification) => !notification.read_at).length)
                setNotifications(user.notifications.slice(0, 5))
                setIsLoading(false)
            }
        }, 500)

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
    }, [user])

    // Filter notifications based on active tab
    useEffect(() => {
        if (activeTab === 'all') {
            setFilteredNotifications(notifications)
        } else if (activeTab === 'unread') {
            setFilteredNotifications(notifications.filter((notification) => !notification.read_at))
        }
    }, [activeTab, notifications])

    // Bell animation when there are unread notifications
    useEffect(() => {
        if (unreadNotifications > 0 && bellRef.current) {
            const interval = setInterval(() => {
                bellRef.current.classList.add('animate-bell')
                setTimeout(() => {
                    if (bellRef.current) {
                        bellRef.current.classList.remove('animate-bell')
                    }
                }, 1000)
            }, 10000) // Animate every 10 seconds

            return () => clearInterval(interval)
        }
    }, [unreadNotifications])

    const toggleMenu = () => {
        setShowMenu(!showMenu)

        // If opening the menu, mark as read after a delay
        if (!showMenu && unreadNotifications > 0) {
            // In a real app, you would call an API to mark notifications as read
            // This is just a simulation
            // setTimeout(() => {
            //     setUnreadNotifications(0)
            // }, 3000)
        }
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

        // More diverse color palette
        const colorMap = {
            user: 'from-blue-500 to-blue-600',
            role: 'from-indigo-500 to-indigo-600',
            section: 'from-purple-500 to-purple-600',
            language: 'from-cyan-500 to-cyan-600',
            medium: 'from-green-500 to-green-600',
            login: 'from-green-500 to-green-600',
            logout: 'from-red-500 to-red-600',
            default: 'from-blue-500 to-blue-600',
        }

        return colorMap[type] || colorMap.default
    }

    // Get action text based on notification type
    const getActionText = (notification) => {
        const type = notification.type?.split('\\').pop() || ''

        if (type.includes('Created')) return 'created'
        if (type.includes('Updated')) return 'updated'
        if (type.includes('Deleted')) return 'deleted'

        return 'modified'
    }

    return (
        <ul>
            <li className="relative" ref={dropdownRef}>
                <button
                    className="flex items-center justify-center rounded-full p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-blue-500/30"
                    onClick={toggleMenu}
                    aria-expanded={showMenu}
                    aria-label={`Notifications ${unreadNotifications > 0 ? `(${unreadNotifications} unread)` : ''}`}
                >
                    <i ref={bellRef} className="ri-notification-3-line text-xl"></i>
                </button>

                <div
                    className={`absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/30 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none transform transition-all duration-300 ease-in-out ${
                        showMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl">
                        <div className="flex items-center justify-between px-5 py-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                                    <i className="ri-notification-3-line"></i>
                                </div>
                                <h6 className="text-base font-semibold">Notifications</h6>
                            </div>
                            {unreadNotifications > 0 && (
                                <div className="flex items-center">
                                    <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                                        {unreadNotifications} New
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Notification Tabs */}
                        <div className="flex border-t border-white/10">
                            <button
                                className={`flex-1 py-2 text-sm font-medium hover:bg-white/10 transition-colors duration-200 ${
                                    activeTab === 'all' ? 'text-white/90 border-b-2 border-white' : 'text-white/70'
                                }`}
                                onClick={() => setActiveTab('all')}
                            >
                                All
                            </button>
                            <button
                                className={`flex-1 py-2 text-sm font-medium hover:bg-white/10 transition-colors duration-200 ${
                                    activeTab === 'unread' ? 'text-white/90 border-b-2 border-white' : 'text-white/70'
                                }`}
                                onClick={() => setActiveTab('unread')}
                            >
                                Unread
                            </button>
                        </div>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700">
                        {isLoading ? (
                            <div className="py-12 flex flex-col items-center justify-center">
                                <div className="flex space-x-2 mb-3">
                                    <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"></div>
                                    <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce delay-150"></div>
                                    <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce delay-300"></div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Loading notifications...</p>
                            </div>
                        ) : filteredNotifications.length === 0 ? (
                            <div className="py-12 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3 text-gray-400 dark:text-gray-500">
                                    <i className="ri-notification-off-line text-3xl"></i>
                                </div>
                                <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {activeTab === 'all' ? 'No notifications yet' : 'No unread notifications'}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs text-center">
                                    {activeTab === 'all'
                                        ? "When you get notifications, they'll show up here."
                                        : 'All your notifications have been read.'}
                                </p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filteredNotifications.map((notification, index) => (
                                    <li
                                        key={index}
                                        className={`group hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 ${
                                            !notification.read_at ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                                        }`}
                                    >
                                        <div className="flex p-4 items-start">
                                            <div className="flex-shrink-0 mr-3">
                                                <div
                                                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${getNotificationColor(notification)} flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105`}
                                                >
                                                    <i className={`${getNotificationIcon(notification)} text-base`}></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h6
                                                        className={`text-sm ${!notification.read_at ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'} line-clamp-1`}
                                                    >
                                                        {notification.data.title}
                                                    </h6>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                                                        {formatDuration(notification.created_at)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                                                    {notification.data.message}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <span
                                                        className={`text-xs px-2 py-0.5 rounded-full ${
                                                            getActionText(notification) === 'created'
                                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                                : getActionText(notification) === 'updated'
                                                                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                                  : getActionText(notification) === 'deleted'
                                                                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                        }`}
                                                    >
                                                        {getActionText(notification)}
                                                    </span>

                                                    {!notification.read_at && (
                                                        <span className="ml-2 flex items-center text-xs text-primary dark:text-blue-400">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-blue-400 mr-1 animate-pulse"></span>
                                                            Unread
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 dark:border-gray-700 p-4">
                        <div className="flex justify-between items-center">
                            <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors duration-200">
                                Mark all as read
                            </button>
                            <Link
                                className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-sm font-medium text-white hover:shadow-md dark:hover:shadow-gray-900/30 transition-all duration-200 transform hover:-translate-y-0.5"
                                href={routes.notifications.index}
                            >
                                <span>View all</span>
                                <i className="ri-arrow-right-line ml-2"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    )
}
