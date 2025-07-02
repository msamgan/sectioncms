import { Link } from '@inertiajs/react'

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'bg-primary/5 border-primary text-primary focus:border-primary focus:bg-primary/10 focus:text-primary dark:bg-primary/20 dark:border-primary dark:text-primary-300 dark:focus:border-primary-300 dark:focus:bg-primary/30 dark:focus:text-primary-300'
                    : 'border-transparent hover:bg-gray-50 focus:bg-gray-50 text-gray-600 hover:border-gray-300 hover:text-gray-800 focus:border-gray-300 focus:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:bg-gray-700 dark:focus:border-gray-600 dark:focus:text-gray-200'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    )
}
