import PageHeader from '@/Components/PageHeader.jsx'
import Master from '@/Layouts/Master.jsx'
import { formatDuration } from '@/Utils/methods.js'
import { Head } from '@inertiajs/react'
import { useState } from 'react'

export default function Notifications({ auth }) {
    const [notifications, setNotifications] = useState(auth.user.notifications || [])

    // Function to determine notification icon based on notification type
    const getNotificationIcon = (notification) => {
        const type =
            notification.type
                .split('\\')
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
            payment_method: 'ri-bank-card-line',
            default: 'ri-notification-2-line',
        }

        return iconMap[type] || iconMap.default
    }

    // Function to determine notification color based on the notification type
    const getNotificationColor = (notification) => {
        const type =
            notification.type
                .split('\\')
                .pop()
                .replace('Created', '')
                .replace('Updated', '')
                .replace('Deleted', '')
                .toLowerCase() || 'default'

        const colorMap = {
            user: 'bg-blue-500',
            role: 'bg-green-500',
            section: 'bg-cyan-500',
            language: 'bg-yellow-500',
            medium: 'bg-purple-500',
            login: 'bg-green-500',
            logout: 'bg-red-500',
            payment_method: 'bg-indigo-500',
            default: 'bg-blue-500',
        }

        return colorMap[type] || colorMap.default
    }

    // Function to mark a notification as read
    const markAsRead = (notificationId) => {
        // In a real implementation, this would make an API call to mark the notification as read
        setNotifications(
            notifications.map((notification) =>
                notification.id === notificationId
                    ? { ...notification, read_at: new Date().toISOString() }
                    : notification,
            ),
        )
    }

    // Function to mark all notifications as read
    const markAllAsRead = () => {
        // In a real implementation, this would make an API call to mark all notifications as read
        setNotifications(
            notifications.map((notification) =>
                notification.read_at ? notification : { ...notification, read_at: new Date().toISOString() },
            ),
        )
    }

    const unreadCount = notifications.filter((notification) => !notification.read_at).length

    return (
        <Master>
            <Head title="Notifications" />
            <PageHeader
                title={'Notifications'}
                subtitle={'Stay updated with system activities and important events'}
                action={
                    unreadCount > 0 ? (
                        <button
                            onClick={markAllAsRead}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <i className="ri-check-double-line mr-2"></i>
                            Mark all as read
                        </button>
                    ) : null
                }
            />

            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="p-6">
                    {notifications.length === 0 ? (
                        <div className="py-12 text-center">
                            <i className="ri-notification-off-line text-5xl text-gray-400 mb-4"></i>
                            <h6 className="text-xl font-medium text-gray-500 mb-2">No notifications yet</h6>
                            <p className="text-gray-400">When you get notifications, they'll appear here</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {notifications.map((notification, index) => (
                                <li
                                    key={index}
                                    className={`py-5 px-4 transition-all duration-200 ${
                                        !notification.read_at ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${getNotificationColor(notification)}`}
                                        >
                                            <span className="text-white">
                                                <i className={`${getNotificationIcon(notification)} text-lg`}></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <h6
                                                    className={`text-sm truncate ${!notification.read_at ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}
                                                >
                                                    {notification.data.title}
                                                </h6>
                                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                                    {formatDuration(notification.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {notification.data.message}
                                            </p>
                                        </div>
                                        {!notification.read_at && (
                                            <div className="ml-4 flex-shrink-0">
                                                <button
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                                                    title="Mark as read"
                                                >
                                                    <i className="ri-check-line"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/*{notifications.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                        <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150">
                            <i className="ri-refresh-line mr-2"></i>
                            Load more
                        </button>
                    </div>
                )}*/}
            </div>
        </Master>
    )
}
