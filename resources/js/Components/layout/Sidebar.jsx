import { index } from '@actions/MenuController'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Sidebar({ user, collapsed = false, onToggle }) {
    const [menuItems, setMenuItems] = useState([])

    const menuItemBaseClass = 'flex items-center rounded-md transition-all duration-250'
    const menuItemActiveClass = 'bg-blue-50 text-primary font-medium border-l-2 border-primary'
    const menuItemInactiveClass = 'text-gray-600 hover:bg-gray-50 hover:text-primary'

    const getMenus = async () => {
        const data = await index.data({})
        setMenuItems(data)
    }

    useEffect(() => {
        getMenus().then()
    }, [])

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-20 flex flex-col bg-white border-r border-gray-100 transition-all duration-250 ${
                collapsed ? 'w-16' : 'w-64'
            }`}
        >
            <div className="invisible h-16"></div>

            <div className="absolute top-3 right-3">
                <button
                    onClick={onToggle}
                    className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-250"
                >
                    <i className={`text-lg ${collapsed ? 'ri-menu-line' : 'ri-menu-fold-line'}`}></i>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 pt-8">
                <ul className="space-y-1 px-3">
                    <li>
                        <Link
                            href={route('dashboard')}
                            className={`${menuItemBaseClass} px-3 py-2.5 ${
                                route().current('dashboard') ? menuItemActiveClass : menuItemInactiveClass
                            }`}
                        >
                            <i className="ri-home-line text-lg"></i>
                            <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Dashboard</span>
                        </Link>
                    </li>
                    {Object.keys(menuItems).map((itemKey, index) =>
                        itemKey === ''
                            ? menuItems[itemKey].map((item, idx) => (
                                  <li key={`independent-${idx}`}>
                                      <Link
                                          href={route(item.route)}
                                          className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                                              route().current(item.route)
                                                    ? `${menuItemActiveClass}`
                                                    : `${menuItemInactiveClass}`
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
                              ),
                    )}
                </ul>
            </div>
        </aside>
    )
}

function SidebarSubmenu({ itemKey, items, collapsed }) {
    const [isOpen, setIsOpen] = useState(false)

    const isActive = items.map((item) => route().current(item.route)).includes(true)
    useEffect(() => {
        if (isActive) {
            setIsOpen(true)
        }
    }, [isActive])

    const menuItemBaseClass = 'flex items-center rounded-md transition-all duration-250'
    const menuItemActiveClass = 'bg-blue-50 text-primary font-medium border-l-2 border-primary'
    const menuItemInactiveClass = 'text-gray-600 hover:bg-gray-50 hover:text-primary'

    return (
        <li>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${menuItemBaseClass} justify-between w-full px-3 py-2.5 ${
                    isActive ? menuItemActiveClass : menuItemInactiveClass
                }`}
            >
                <div className="flex items-center">
                    <i className={`${items[0].parent.icon} text-lg`}></i>
                    <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>{itemKey}</span>
                </div>
                {!collapsed && (
                    <i
                        className={`ri-arrow-down-s-line transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    ></i>
                )}
            </button>
            <div className={`mt-1 ml-2 space-y-1 ${isOpen ? 'block' : 'hidden'}`}>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={route(item.route)}
                        className={`${menuItemBaseClass} pl-8 pr-3 py-2.5 ${
                            route().current(item.route) ? menuItemActiveClass : menuItemInactiveClass
                        }`}
                    >
                        <i className={`${item.icon} text-lg`}></i>
                        <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                    </Link>
                ))}
            </div>
        </li>
    )
}
