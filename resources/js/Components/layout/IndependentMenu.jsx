import { Link } from '@inertiajs/react'

export default function IndependentMenu({ item, index }) {
    return (
        <li
            key={index}
            className={
                route().current(item.route)
                    ? 'flex items-center py-2.5 px-5 text-primary bg-purple-50 rounded-lg shadow-sm font-medium transition-all duration-300 ease-in-out border border-purple-100'
                    : 'flex items-center py-2.5 px-5 text-gray-700 hover:text-primary hover:bg-purple-50 rounded-lg transition-all duration-300 ease-in-out hover:shadow-sm hover:border hover:border-purple-100'
            }
        >
            <Link href={route(item.route)} className="flex items-center w-full">
                <i className={item.icon + ' mr-3 text-lg'}></i>
                <div data-i18n={item.label} className="whitespace-nowrap font-medium">
                    {item.label}
                </div>
            </Link>
        </li>
    )
}
