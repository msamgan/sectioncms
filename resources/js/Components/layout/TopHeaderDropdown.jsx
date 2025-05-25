import ResponsiveNavLink from '@/Components/ResponsiveNavLink.jsx'
import usePermissions from '@/Hooks/usePermissions'
import { permissions } from '@/Utils/permissions/index.js'
import { useState } from 'react'

export default function TopHeaderDropdown({ user }) {
    const { can } = usePermissions()
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <li className="relative">
            <a
                onClick={toggleMenu}
                className="flex items-center justify-center rounded-full p-2 text-gray-600 hover:bg-gray-100"
                href="#"
                data-bs-toggle="dropdown"
            >
                <div className="relative">
                    <img src={'../../assets/img/avatars/1.png'} alt="user-image" className="h-8 w-8 rounded-full" />
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border border-white"></span>
                </div>
            </a>
            <ul
                className={`absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${showMenu ? 'block' : 'hidden'}`}
            >
                <li>
                    <a className="block px-4 py-2 hover:bg-gray-50" href="#">
                        <div className="flex items-center">
                            <div className="mr-2 flex-shrink-0">
                                <div className="relative">
                                    <img
                                        src={'../../assets/img/avatars/1.png'}
                                        alt="user-image"
                                        className="h-8 w-8 rounded-full"
                                    />
                                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border border-white"></span>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <span className="block font-medium">{user.name}</span>
                                <span className="text-sm text-gray-500">{user.role.display_name}</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <div className="border-t border-gray-200 my-1"></div>
                </li>
                <li>
                    <ResponsiveNavLink className="px-2" href={route('profile.edit')}>
                        <div className="flex items-center">
                            <i className="ri-user-3-line mr-3"></i>
                            <span>My Profile</span>
                        </div>
                    </ResponsiveNavLink>
                </li>
                {user.business_id && can(permissions.business.update) && (
                    <li>
                        <ResponsiveNavLink className="px-2" href={route('business.settings')}>
                            <div className="flex items-center">
                                <i className="ri-settings-3-line mr-3"></i>
                                <span>Business Settings</span>
                            </div>
                        </ResponsiveNavLink>
                    </li>
                )}
                {/*<li>
                            <a className="block px-4 py-2 hover:bg-gray-50" href="#">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i className="ri-file-text-line mr-3"></i>
                                        <span>Billing</span>
                                    </div>
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">4</span>
                                </div>
                            </a>
                        </li>*/}
                <li>
                    <div className="border-t border-gray-200 my-1"></div>
                </li>
                <li>
                    <ResponsiveNavLink className="px-2" method="post" href={route('logout')} as="button">
                        <div className="flex items-center">
                            <i className="ri-shut-down-line mr-3"></i>
                            <span>Log Out</span>
                        </div>
                    </ResponsiveNavLink>
                </li>
            </ul>
        </li>
    )
}
