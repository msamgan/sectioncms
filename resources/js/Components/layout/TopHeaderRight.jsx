import AddSite from '@/Components/layout/AddSite.jsx'
import HeaderNotification from '@/Components/layout/HeaderNotification.jsx'
import TopHeaderDropdown from '@/Components/layout/TopHeaderDropdown.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import { permissions } from '@/Utils/permissions/index.js'

export default function TopHeaderRight({ user }) {
    const { can } = usePermissions()
    return (
        <div className="flex items-center" id="navbar-collapse">
            <ul className="flex items-center flex-row gap-2">
                {can(permissions.business.update) && <AddSite />}
                <HeaderNotification user={user} />
                <TopHeaderDropdown user={user} />
            </ul>
        </div>
    )
}
