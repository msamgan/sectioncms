import { Link } from '@inertiajs/react'

export default function IndependentMenu({ item, index }) {
    return (
        <li key={index} className={route().current(item.route) ? 'flex items-center py-2 px-4 text-blue-600 bg-blue-50 rounded-md' : 'flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md'}>
            <Link href={route(item.route)} className="flex items-center w-full">
                <i className={item.icon + ' mr-2 text-lg'}></i>
                <div data-i18n={item.label}>{item.label}</div>
            </Link>
        </li>
    )
}
