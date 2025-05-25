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
                    ? 'relative py-2 px-4 text-primary bg-purple-50 rounded-md shadow-sm font-medium transition-all duration-300 ease-in-out'
                    : 'relative py-2 px-4 text-dark hover:text-primary hover:bg-purple-50 rounded-md transition-all duration-300 ease-in-out hover:shadow-sm'
            }
        >
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center w-full justify-between">
                <div className="flex items-center">
                    <i
                        className={menuItems[itemKey][0].parent.icon + ' mr-3 text-lg'}
                    ></i>
                    <div
                        data-i18n={itemKey}
                        className="whitespace-nowrap"
                    >
                        {itemKey}
                    </div>
                </div>
                <i className={`ri-arrow-down-s-line ml-2 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-primary' : ''}`}></i>
            </a>

            <ul className={`absolute left-0 top-full w-full mt-2 py-2 border border-light rounded-lg shadow-lg bg-white z-10 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                {menuItems[itemKey].map((item, index) => (
                    <li key={index} className={route().current(item.route)
                        ? 'flex items-center py-2 px-4 mx-2 text-primary bg-purple-50 rounded-md shadow-sm font-medium transition-all duration-300 ease-in-out'
                        : 'flex items-center py-2 px-4 mx-2 text-dark hover:text-primary hover:bg-purple-50 rounded-md transition-all duration-300 ease-in-out hover:shadow-sm'}>
                        <Link href={route(item.route)} className="flex items-center w-full">
                            <i className={item.icon + ' mr-3 text-lg'}></i>
                            <div data-i18n={item.label} className="whitespace-nowrap">{item.label}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    )
}
