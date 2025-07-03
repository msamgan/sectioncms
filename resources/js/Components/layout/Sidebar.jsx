import { index } from '@actions/MenuController'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Sidebar({ user, collapsed = false, onToggle }) {
    const [menuItems, setMenuItems] = useState([])
    const [hoveredItem, setHoveredItem] = useState(null)

    const menuItemBaseClass = 'flex items-center rounded-lg transition-all duration-250'
    const menuItemActiveClass = 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-sm'
    const menuItemInactiveClass = 'text-gray-600 hover:bg-blue-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400'

    const getMenus = async () => {
        const data = await index.data({})
        setMenuItems(data)
    }

    useEffect(() => {
        getMenus().then()
    }, [])

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-20 flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-300 ${
                collapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className="invisible h-16"></div>

            {/* Sidebar Header with Logo */}
            <div className="flex items-center justify-center py-5 mt-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start px-6'}`}>
                    <div className="flex-shrink-0 relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg ring-2 ring-blue-100 dark:ring-blue-800 transition-all duration-200 hover:shadow-xl hover:scale-105">
                            <i className="ri-dashboard-line text-xl"></i>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
                    </div>
                    {!collapsed && (
                        <div className="ml-4">
                            <h3 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent dark:text-white">Section CMS</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Management Dashboard</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <div className="absolute top-20 -right-5 mt-3">
                <button
                    onClick={onToggle}
                    className="p-1.5 rounded-full bg-white dark:bg-gray-800 text-primary dark:text-blue-400 border border-gray-100 dark:border-gray-700 shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-250"
                >
                    <i className={`text-lg ${collapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'}`}></i>
                </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-6">
                <div className={`px-4 mb-4 ${collapsed ? 'text-center' : ''}`}>
                    <h6 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Main Menu</h6>
                </div>
                <ul className="space-y-2 px-3">
                    <li>
                        <Link
                            href={route('dashboard')}
                            className={`${menuItemBaseClass} px-4 py-3 ${
                                route().current('dashboard') ? menuItemActiveClass : menuItemInactiveClass
                            }`}
                            onMouseEnter={() => setHoveredItem('dashboard')}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div
                                className={`flex-shrink-0 flex items-center justify-center w-6 h-6 ${
                                    route().current('dashboard')
                                        ? ''
                                        : hoveredItem === 'dashboard'
                                          ? 'text-primary dark:text-blue-400'
                                          : 'text-gray-500 dark:text-gray-400'
                                }`}
                            >
                                <i className="ri-home-line text-lg"></i>
                            </div>
                            <span className={`ml-3 ${collapsed ? 'hidden' : 'block'} font-medium text-sm`}>
                                Dashboard
                            </span>
                            {!collapsed && route().current('dashboard') && (
                                <span className="ml-auto">
                                    <i className="ri-check-line"></i>
                                </span>
                            )}
                        </Link>
                    </li>
                    {Object.keys(menuItems).map((itemKey, index) =>
                        itemKey === ''
                            ? menuItems[itemKey].map((item, idx) => (
                                  <li key={`independent-${idx}`}>
                                      <Link
                                          href={route(item.route)}
                                          className={`${menuItemBaseClass} px-4 py-3 ${
                                              route().current(item.route) ? menuItemActiveClass : menuItemInactiveClass
                                          }`}
                                          onMouseEnter={() => setHoveredItem(`ind-${idx}`)}
                                          onMouseLeave={() => setHoveredItem(null)}
                                      >
                                          <div
                                              className={`flex-shrink-0 flex items-center justify-center w-6 h-6 ${
                                                  route().current(item.route)
                                                      ? ''
                                                      : hoveredItem === `ind-${idx}`
                                                        ? 'text-primary dark:text-blue-400'
                                                        : 'text-gray-500 dark:text-gray-400'
                                              }`}
                                          >
                                              <i className={`${item.icon} text-lg`}></i>
                                          </div>
                                          <span
                                              className={`ml-3 ${collapsed ? 'hidden' : 'block'} font-medium text-sm`}
                                          >
                                              {item.label}
                                          </span>
                                          {!collapsed && route().current(item.route) && (
                                              <span className="ml-auto">
                                                  <i className="ri-check-line"></i>
                                              </span>
                                          )}
                                      </Link>
                                  </li>
                              ))
                            : menuItems[itemKey].length > 0 && (
                                  <SidebarSubmenu
                                      key={`dependent-${index}`}
                                      itemKey={itemKey}
                                      items={menuItems[itemKey]}
                                      collapsed={collapsed}
                                      hoveredItem={hoveredItem}
                                      setHoveredItem={setHoveredItem}
                                      menuIndex={index}
                                  />
                              ),
                    )}
                </ul>
            </div>

            {/* User Profile Section */}
            <div className={`p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 ${collapsed ? 'text-center' : ''}`}>
                <div className={`flex ${collapsed ? 'flex-col items-center' : 'items-center'} group cursor-pointer hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-200`}>
                    <div className="flex-shrink-0 relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg ring-2 ring-white dark:ring-gray-800 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all duration-200">
                            <span className="text-sm font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    {!collapsed && (
                        <div className="ml-3 min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-200">{user.name}</p>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user.role.display_name}</p>
                            </div>
                        </div>
                    )}
                    {!collapsed && (
                        <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <i className="ri-more-2-line text-gray-400 dark:text-gray-500"></i>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}

function SidebarSubmenu({ itemKey, items, collapsed, hoveredItem, setHoveredItem, menuIndex }) {
    const [isOpen, setIsOpen] = useState(false)

    const isActive = items.map((item) => route().current(item.route)).includes(true)
    useEffect(() => {
        if (isActive) {
            setIsOpen(true)
        }
    }, [isActive])

    const menuItemBaseClass = 'flex items-center rounded-lg transition-all duration-250'
    const menuItemActiveClass = 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-sm'
    const menuItemInactiveClass = 'text-gray-600 hover:bg-blue-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400'

    const menuId = `menu-${menuIndex}`

    return (
        <li>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${menuItemBaseClass} justify-between w-full px-4 py-3 ${
                    isActive ? menuItemActiveClass : menuItemInactiveClass
                }`}
                onMouseEnter={() => setHoveredItem(menuId)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <div className="flex items-center">
                    <div
                        className={`flex-shrink-0 flex items-center justify-center w-6 h-6 ${
                            isActive ? '' : hoveredItem === menuId ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                        }`}
                    >
                        <i className={`${items[0].parent.icon} text-lg`}></i>
                    </div>
                    <span className={`ml-3 ${collapsed ? 'hidden' : 'block'} font-medium text-sm`}>{itemKey}</span>
                </div>
                {!collapsed && (
                    <i
                        className={`ri-arrow-down-s-line transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    ></i>
                )}
            </button>
            <div
                className={`mt-2 space-y-1 overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                {items.map((item, index) => {
                    const subItemId = `${menuId}-sub-${index}`
                    return (
                        <Link
                            key={index}
                            href={route(item.route)}
                            className={`${menuItemBaseClass} ${collapsed ? 'px-4' : 'pl-12 pr-4'} py-2.5 ${
                                route().current(item.route) ? menuItemActiveClass : menuItemInactiveClass
                            }`}
                            onMouseEnter={() => setHoveredItem(subItemId)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div
                                className={`flex-shrink-0 flex items-center justify-center w-6 h-6 ${
                                    route().current(item.route)
                                        ? ''
                                        : hoveredItem === subItemId
                                          ? 'text-primary dark:text-blue-400'
                                          : 'text-gray-500 dark:text-gray-400'
                                }`}
                            >
                                <i className={`${item.icon} text-lg`}></i>
                            </div>
                            <span className={`ml-3 ${collapsed ? 'hidden' : 'block'} font-medium text-sm`}>
                                {item.label}
                            </span>
                            {!collapsed && route().current(item.route) && (
                                <span className="ml-auto">
                                    <i className="ri-check-line"></i>
                                </span>
                            )}
                        </Link>
                    )
                })}
            </div>
        </li>
    )
}
