import Master from '@/Layouts/Master.jsx'
import { Head } from '@inertiajs/react'
import PageHeader from '@/Components/PageHeader.jsx'
import { formatDuration } from '@/Utils/methods.js'
import { useState } from 'react'

export default function Notifications({ auth }) {
    const [notifications, setNotifications] = useState(auth.user.notifications || [])

    // Function to determine notification icon based on notification type
    const getNotificationIcon = (notification) => {
        const type = notification.type.split('\\').pop().replace('Created', '').replace('Updated', '').replace('Deleted', '').toLowerCase() || 'default'

        const iconMap = {
            'user': 'ri-user-line',
            'role': 'ri-shield-user-line',
            'section': 'ri-layout-grid-line',
            'language': 'ri-translate-2',
            'medium': 'ri-file-list-line',
            'login': 'ri-login-circle-line',
            'logout': 'ri-logout-circle-line',
            'default': 'ri-notification-2-line'
        }

        return iconMap[type] || iconMap.default
    }

    // Function to determine notification color based on the notification type
    const getNotificationColor = (notification) => {
        const type = notification.type.split('\\').pop().replace('Created', '').replace('Updated', '').replace('Deleted', '').toLowerCase() || 'default'

        const colorMap = {
            'user': 'bg-primary',
            'role': 'bg-success',
            'section': 'bg-info',
            'language': 'bg-warning',
            'medium': 'bg-secondary',
            'login': 'bg-success',
            'logout': 'bg-danger',
            'default': 'bg-primary'
        }

        return colorMap[type] || colorMap.default
    }

    // Function to mark a notification as read
    const markAsRead = (notificationId) => {
        // In a real implementation, this would make an API call to mark the notification as read
        setNotifications(
            notifications.map(notification =>
                notification.id === notificationId
                    ? { ...notification, read_at: new Date().toISOString() }
                    : notification
            )
        )
    }

    // Function to mark all notifications as read
    const markAllAsRead = () => {
        // In a real implementation, this would make an API call to mark all notifications as read
        setNotifications(
            notifications.map(notification =>
                notification.read_at ? notification : { ...notification, read_at: new Date().toISOString() }
            )
        )
    }

    const unreadCount = notifications.filter(notification => !notification.read_at).length

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
                            className="btn btn-primary btn-sm"
                        >
                            <i className="ri-check-double-line me-1"></i>
                            Mark all as read
                        </button>
                    ) : null
                }
            />

            <div className="card">
                <div className="card-body">
                    {notifications.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="ri-notification-off-line ri-3x text-muted mb-3"></i>
                            <h6 className="text-muted">No notifications yet</h6>
                            <p className="text-muted">When you get notifications, they'll appear here</p>
                        </div>
                    ) : (
                        <ul className="list-group list-group-flush">
                            {notifications.map((notification, index) => (
                                <li
                                    key={index}
                                    className={`list-group-item list-group-item-action dropdown-notifications-item p-4 ${!notification.read_at ? 'bg-light-subtle' : ''}`}
                                >
                                    <div className="d-flex align-items-center">
                                        <div className={`avatar avatar-sm me-3 rounded-full pl-2 pt-1 ${getNotificationColor(notification)}`}>
                                            <span className="text-white">
                                                <i className={getNotificationIcon(notification)}></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <h6 className={`mb-0 ${!notification.read_at ? 'fw-semibold' : ''}`}>
                                                    {notification.data.title}
                                                </h6>
                                                <small className="text-muted">{formatDuration(notification.created_at)}</small>
                                            </div>
                                            <p className="mb-0 text-gray-600">
                                                {notification.data.message}
                                            </p>
                                        </div>
                                        {!notification.read_at && (
                                            <div className="flex-shrink-0 ms-3">
                                                <button
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="btn btn-sm btn-icon btn-text-secondary rounded-pill"
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
                    <div className="card-footer text-center">
                        <button className="btn btn-outline-primary btn-sm">
                            <i className="ri-refresh-line me-1"></i>
                            Load more
                        </button>
                    </div>
                )}*/}
            </div>
        </Master>
    )
}
