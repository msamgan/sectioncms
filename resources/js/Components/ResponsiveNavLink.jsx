import { Link } from '@inertiajs/react'

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'bg-primary/5 border-primary text-primary focus:border-primary focus:bg-primary/10 focus:text-primary'
                    : 'border-transparent hover:bg-gray-50 focus:bg-gray-50 text-gray-600 hover:border-gray-300 hover:text-gray-800 focus:border-gray-300 focus:text-gray-800'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    )
}
