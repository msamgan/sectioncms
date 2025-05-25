import { Link } from '@inertiajs/react'

export default function IndependentMenu({ item, index }) {
    return (
        <li key={index} className={
            route().current(item.route)
                ? 'flex items-center py-2 px-4 text-blue-600 bg-blue-50 rounded-md shadow-sm font-medium transition-all duration-300 ease-in-out'
                : 'flex items-center py-2 px-4 text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-all duration-300 ease-in-out hover:shadow-sm'
        }>
            <Link href={route(item.route)} className="flex items-center w-full">
                <i className={item.icon + ' mr-3 text-lg'}></i>
                <div data-i18n={item.label} className="whitespace-nowrap">{item.label}</div>
            </Link>
        </li>
    )
}
