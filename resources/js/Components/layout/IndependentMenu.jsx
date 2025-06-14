import { Link } from '@inertiajs/react'

export default function IndependentMenu({ item, index }) {
    return (
        <li
            key={index}
            className={
                route().current(item.route)
                    ? 'flex items-center py-2.5 px-5 text-[#3B82F6] font-medium transition-all duration-300 ease-in-out border-b-2 border-[#3B82F6]'
                    : 'flex items-center py-2.5 px-5 text-gray-700 hover:text-[#3B82F6] transition-all duration-300 ease-in-out hover:border-b hover:border-b-[#3B82F6]'
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
