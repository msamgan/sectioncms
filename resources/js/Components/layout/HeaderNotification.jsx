import { formatDuration } from '@/Utils/methods.js'
import { routes } from '@/Utils/routes/index.js'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function HeaderNotification({ user }) {
    const [unreadNotifications, setUnreadNotifications] = useState(0)
    const [topFourNotifications, setTopFourNotifications] = useState([])
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        setUnreadNotifications(user.notifications.filter((notification) => !notification.read_at).length)
        setTopFourNotifications(user.notifications.slice(0, 3))
    }, [])

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <li className="relative mr-4 xl:mr-1">
            <a
                className="flex items-center justify-center rounded-full p-2 text-gray-600 hover:bg-gray-100"
                href="#"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                onClick={toggleMenu}
            >
                <i className="ri-notification-2-line text-2xl"></i>
                <span
                    className={
                        user.notifications.filter((notification) => !notification.read_at).length
                            ? 'absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-white mt-1'
                            : 'hidden'
                    }
                ></span>
            </a>
            <ul
                className={`absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${showMenu ? 'block' : 'hidden'}`}
            >
                <li className="border-b py-2">
                    <div className="flex items-center justify-between px-4 py-2">
                        <h6 className="text-sm font-medium">Notification</h6>
                        <div className="flex items-center">
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 mr-2">
                                {unreadNotifications} New
                            </span>
                        </div>
                    </div>
                </li>
                <li className="max-h-64 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                        {topFourNotifications.map((notification, index) => (
                            <li key={index} className="hover:bg-gray-50 cursor-pointer">
                                <div className="flex p-4">
                                    <div className="flex-grow">
                                        <h6 className="text-sm font-medium mb-1">{notification.data.title}</h6>
                                        <p className="text-sm text-gray-600 mb-1">{notification.data.message}</p>
                                        <p className="text-xs text-gray-500">
                                            {formatDuration(notification.created_at)}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {!notification.read_at && (
                                            <a href="#" className="inline-block">
                                                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </li>

                <li className="border-t">
                    <div className="p-4">
                        <Link
                            className="flex justify-center items-center w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            href={routes.notifications.index}
                        >
                            <span>View all notifications</span>
                        </Link>
                    </div>
                </li>
            </ul>
        </li>
    )
}
