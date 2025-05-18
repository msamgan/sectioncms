import { Head } from '@inertiajs/react'
import Master from '@/Layouts/Master.jsx'
import usePermissions from '@/Hooks/usePermissions'
import { permissions } from '@/Utils/permissions/index.js'
import RoleCountStats from '@/Pages/Dashboard/Partials/RoleCountStats.jsx'
import UserCountStats from '@/Pages/Dashboard/Partials/UserCountStats.jsx'
import MediaSizeStats from '@/Pages/Dashboard/Partials/MediaSizeStats.jsx'
import SectionCountStats from '@/Pages/Dashboard/Partials/SectionCountStats.jsx'
import LanguageCountStats from '@/Pages/Dashboard/Partials/LanguageCountStats.jsx'
import ApiStatsChart from '@/Pages/Dashboard/Partials/ApiStatsChart.jsx'

export default function Dashboard({ auth }) {
    const { can } = usePermissions()

    return (
        <Master>
            <Head title="Dashboard" />

            <div className="col-12">
                You're logged in as {auth.user.name} ({auth.user.email}).
            </div>

            <div className="row g-6 mt-4">
                {can(permissions.role.list) && (
                    <div className="col-sm-3 col-lg-2">
                        <RoleCountStats />
                    </div>
                )}

                {can(permissions.user.list) && (
                    <div className="col-sm-3 col-lg-2">
                        <UserCountStats />
                    </div>
                )}

                {can(permissions.medium.list) && (
                    <div className="col-sm-3 col-lg-2">
                        <MediaSizeStats />
                    </div>
                )}

                {can(permissions.section.list) && (
                    <div className="col-sm-3 col-lg-2">
                        <SectionCountStats />
                    </div>
                )}

                {can(permissions.language.list) && (
                    <div className="col-sm-3 col-lg-2">
                        <LanguageCountStats />
                    </div>
                )}
            </div>

            <div className="row g-6 mt-4">
                {can(permissions.api_doc.view) && (
                    <div className="col-sm-12 col-lg-12">
                        <ApiStatsChart />
                    </div>
                )}
            </div>
        </Master>
    )
}
