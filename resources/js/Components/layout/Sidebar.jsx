import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { index } from '@actions/MenuController';

export default function Sidebar({ user, collapsed = false, onToggle }) {
    const [menuItems, setMenuItems] = useState([]);

    const getMenus = async () => setMenuItems(await index.data({}));

    useEffect(() => {
        getMenus().then();
    }, []);

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-20 flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300 ${
                collapsed ? 'w-16' : 'w-64'
            }`}
        >
            {/* Sidebar Header with Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
                <Link href="/" className="flex items-center">
                    <span className={`text-primary ${collapsed ? 'hidden' : 'block'}`}>
                        <svg className="h-8 w-auto" viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 0L50 12.5V37.5L25 50L0 37.5V12.5L25 0Z" fill="currentColor" />
                        </svg>
                    </span>
                    <span className={`ml-3 font-medium text-gray-800 ${collapsed ? 'hidden' : 'block'}`}>
                        Enier Portal
                    </span>
                </Link>
                <button
                    onClick={onToggle}
                    className="p-1 rounded-md text-gray-500 hover:bg-gray-50 focus:outline-none"
                >
                    <i className={`text-lg ${collapsed ? 'ri-menu-line' : 'ri-menu-fold-line'}`}></i>
                </button>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {/* Dashboard Link */}
                    <li>
                        <Link
                            href={route('dashboard')}
                            className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                                route().current('dashboard')
                                    ? 'bg-blue-50 text-primary font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                            }`}
                        >
                            <i className="ri-home-line text-lg"></i>
                            <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Dashboard</span>
                        </Link>
                    </li>

                    {/* Dynamic Menu Items */}
                    {Object.keys(menuItems).map((itemKey, index) => (
                        itemKey === ''
                            ? menuItems[itemKey].map((item, idx) => (
                                <li key={`independent-${idx}`}>
                                    <Link
                                        href={route(item.route)}
                                        className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                                            route().current(item.route)
                                                ? 'bg-blue-50 text-primary font-medium'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                        }`}
                                    >
                                        <i className={`${item.icon} text-lg`}></i>
                                        <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                                    </Link>
                                </li>
                            ))
                            : menuItems[itemKey].length > 0 && (
                                <SidebarSubmenu
                                    key={`dependent-${index}`}
                                    itemKey={itemKey}
                                    items={menuItems[itemKey]}
                                    collapsed={collapsed}
                                />
                            )
                    ))}
                </ul>
            </div>
        </aside>
    );
}

// Submenu component for sidebar
function SidebarSubmenu({ itemKey, items, collapsed }) {
    const [isOpen, setIsOpen] = useState(false);

    // Check if any child route is active
    const isActive = items.map(item => route().current(item.route)).includes(true);

    // Auto-expand menu if a child is active
    useEffect(() => {
        if (isActive) {
            setIsOpen(true);
        }
    }, [isActive]);

    return (
        <li>
            {/* Parent menu item */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md transition-colors ${
                    isActive
                        ? 'bg-blue-50 text-primary font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
            >
                <div className="flex items-center">
                    <i className={`${items[0].parent.icon} text-lg`}></i>
                    <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>{itemKey}</span>
                </div>
                {!collapsed && (
                    <i className={`ri-arrow-down-s-line transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}></i>
                )}
            </button>

            {/* Submenu items */}
            <div className={`mt-1 ml-2 space-y-1 ${isOpen ? 'block' : 'hidden'}`}>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={route(item.route)}
                        className={`flex items-center pl-8 pr-3 py-2.5 rounded-md transition-colors ${
                            route().current(item.route)
                                ? 'bg-blue-50 text-primary font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                        }`}
                    >
                        <i className={`${item.icon} text-lg`}></i>
                        <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                    </Link>
                ))}
            </div>
        </li>
    );
}
