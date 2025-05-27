import { Link } from '@inertiajs/react'
import { useState } from 'react'

export default function DependentMenu({ menuItems, itemKey, index }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = (e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    const isActive = menuItems[itemKey].map((item, index) => route().current(item.route)).includes(true)

    return (
        <li
            key={index}
            onClick={toggleOpen}
            className={
                isActive
                    ? 'relative py-2.5 px-5 text-primary  rounded-lg font-medium transition-all duration-300 ease-in-out border border-l-0 border-t-0 border-r-0 border-b-2 border-b-primary'
                    : 'relative py-2.5 px-5 text-gray-700 hover:text-primary hover: rounded-lg transition-all duration-300 ease-in-out hover:border hover:border-l-primary hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-b-1 hover:border-b-primary'
            }
        >
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center w-full justify-between">
                <div className="flex items-center">
                    <i className={menuItems[itemKey][0].parent.icon + ' mr-3 text-lg'}></i>
                    <div data-i18n={itemKey} className="whitespace-nowrap font-medium">
                        {itemKey}
                    </div>
                </div>
                <i
                    className={`ri-arrow-down-s-line ml-3 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-primary' : ''}`}
                ></i>
            </a>

            <ul
                className={`absolute left-0 top-full w-full mt-2 py-2 border border-purple-100 rounded-lg bg-white z-10 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
            >
                {menuItems[itemKey].map((item, index) => (
                    <li
                        key={index}
                        className={
                            route().current(item.route)
                                ? 'flex items-center py-2 px-4 mx-2 my-1 text-primary  rounded-md font-medium transition-all duration-300 ease-in-out border border-l-0 border-t-0 border-r-0 border-b-2 border-b-primary'
                                : 'flex items-center py-2 px-4 mx-2 my-1 text-gray-700 hover:text-primary hover: rounded-md transition-all duration-300 ease-in-out hover:border hover:border-l-primary hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-b-1 hover:border-b-primary'
                        }
                    >
                        <Link href={route(item.route)} className="flex items-center w-full">
                            <i className={item.icon + ' mr-3 text-lg'}></i>
                            <div data-i18n={item.label} className="whitespace-nowrap font-medium">
                                {item.label}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    )
}
