import AddSite from '@/Components/layout/AddSite.jsx'
import HeaderNotification from '@/Components/layout/HeaderNotification.jsx'
import TopHeaderDropdown from '@/Components/layout/TopHeaderDropdown.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import { permissions } from '@/Utils/permissions/index.js'

export default function TopHeaderRight({ user }) {
    const { can } = usePermissions()
    return (
        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            <ul className="navbar-nav align-items-center ms-auto flex-row">
                {can(permissions.business.update) && <AddSite />}
                <HeaderNotification user={user} />
                <TopHeaderDropdown user={user} />
            </ul>
        </div>
    )
}
