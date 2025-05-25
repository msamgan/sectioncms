import { Link } from '@inertiajs/react'
import { useState } from 'react'

export default function DependentMenu({ menuItems, itemKey, index }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const isActive = menuItems[itemKey].map((item, index) => route().current(item.route)).includes(true);

    return (
        <li
            key={index}
            onClick={toggleOpen}
            className={
                isActive
                    ? 'relative py-2 px-4 text-blue-600 bg-blue-50 rounded-md'
                    : 'relative py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md'
            }
        >
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center w-full justify-between">
                <div className="flex items-center">
                    <i
                        className={menuItems[itemKey][0].parent.icon + ' mr-2 text-lg'}
                    ></i>
                    <div
                        data-i18n={itemKey}
                    >
                        {itemKey}
                    </div>
                </div>
                <i className={`ri-arrow-down-s-line transition-transform ${isOpen ? 'transform rotate-180' : ''}`}></i>
            </a>

            <ul className={`absolute left-0 top-full w-full pl-4 mt-2 space-y-1 border border-gray-200 rounded-md shadow-md bg-white z-10 ${isOpen ? 'block' : 'hidden'}`}>
                {menuItems[itemKey].map((item, index) => (
                    <li key={index} className={route().current(item.route)
                        ? 'flex items-center py-2 px-4 text-blue-600 bg-blue-50 rounded-md'
                        : 'flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md'}>
                        <Link href={route(item.route)} className="flex items-center w-full">
                            <i className={item.icon + ' mr-2 text-lg'}></i>
                            <div data-i18n={item.label}>{item.label}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    )
}
