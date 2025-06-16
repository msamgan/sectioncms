import { index } from '@actions/MenuController'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Sidebar({ user, collapsed = false, onToggle }) {
    const [menuItems, setMenuItems] = useState([])
    const [hoveredItem, setHoveredItem] = useState(null)

    const menuItemBaseClass = 'flex items-center rounded-lg transition-all duration-250'
    const menuItemActiveClass = 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-sm'
    const menuItemInactiveClass = 'text-gray-600 hover:bg-blue-50 hover:text-primary'

    const getMenus = async () => {
        const data = await index.data({})
        setMenuItems(data)
    }

    useEffect(() => {
        getMenus().then()
    }, [])

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-20 flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-250 ${
                collapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className="invisible h-16"></div>

            {/* Sidebar Header with Logo */}
            <div className="flex items-center justify-center py-4 mt-3 border-b border-gray-100">
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start px-6'}`}>
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                            <i className="ri-dashboard-line text-xl"></i>
                        </div>
                    </div>
                    {!collapsed && (
                        <div className="ml-3">
                            <h3 className="text-sm font-bold text-gray-800">Section CMS</h3>
                            <p className="text-xs text-gray-500">Dashboard</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <div className="absolute top-20 -right-5">
                <button
                    onClick={onToggle}
                    className="p-1.5 rounded-full bg-white text-primary border border-gray-100 shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-250"
                >
                    <i className={`text-lg ${collapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'}`}></i>
                </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-6">
                <div className={`px-4 mb-4 ${collapsed ? 'text-center' : ''}`}>
                    <h6 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main Menu</h6>
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
                                          ? 'text-primary'
                                          : 'text-gray-500'
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
                                                        ? 'text-primary'
                                                        : 'text-gray-500'
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
            <div className={`p-4 border-t border-gray-100 ${collapsed ? 'text-center' : ''}`}>
                <div className={`flex ${collapsed ? 'flex-col items-center' : 'items-center'}`}>
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                            <span className="text-xs font-medium">{user.name.charAt(0)}</span>
                        </div>
                    </div>
                    {!collapsed && (
                        <div className="ml-3 min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.role.display_name}</p>
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
    const menuItemInactiveClass = 'text-gray-600 hover:bg-blue-50 hover:text-primary'

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
                            isActive ? '' : hoveredItem === menuId ? 'text-primary' : 'text-gray-500'
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
                                          ? 'text-primary'
                                          : 'text-gray-500'
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
