import NavButton from '@/Components/NavButton.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import { permissions } from '@/Utils/permissions/index.js'

export default function Sidebar({ activeTabGroup, setActiveTabGroup }) {
    const { can } = usePermissions()

    return (
        <div className="w-full lg:w-1/4">
            <div className="flex flex-col justify-between mb-4 lg:mb-0">
                <ul className="flex flex-col space-y-4 ml-12 mt-2.5">
                    <li>
                        <NavButton active={activeTabGroup === 'profile'} onClick={() => setActiveTabGroup('profile')}>
                            <i className="ri-user-line mr-3"></i>
                            <span>Profile Settings</span>
                        </NavButton>
                    </li>
                    {can(permissions.business.update) && (
                        <li>
                            <NavButton
                                active={activeTabGroup === 'business'}
                                onClick={() => setActiveTabGroup('business')}
                            >
                                <i className="ri-store-2-line mr-3"></i>
                                <span>Business Settings</span>
                            </NavButton>
                        </li>
                    )}
                    <li>
                        <NavButton active={activeTabGroup === 'settings'} onClick={() => setActiveTabGroup('settings')}>
                            <i className="ri-settings-3-line mr-3"></i>
                            <span>Account Settings</span>
                        </NavButton>
                    </li>
                </ul>
            </div>
        </div>
    )
}
