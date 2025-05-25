import usePermissions from '@/Hooks/usePermissions'
import Master from '@/Layouts/Master.jsx'
import ApiStatsChart from '@/Pages/Dashboard/Partials/ApiStatsChart.jsx'
import LanguageCountStats from '@/Pages/Dashboard/Partials/LanguageCountStats.jsx'
import MediaSizeStats from '@/Pages/Dashboard/Partials/MediaSizeStats.jsx'
import RoleCountStats from '@/Pages/Dashboard/Partials/RoleCountStats.jsx'
import SectionCountStats from '@/Pages/Dashboard/Partials/SectionCountStats.jsx'
import UserCountStats from '@/Pages/Dashboard/Partials/UserCountStats.jsx'
import { permissions } from '@/Utils/permissions/index.js'
import { Head } from '@inertiajs/react'

export default function Dashboard({ auth }) {
    const { can } = usePermissions()

    return (
        <Master>
            <Head title="Dashboard" />

            <div className="w-full bg-white rounded-xl border border-light p-4">
                <p className="text-dark">
                    You're logged in as <span className="font-medium text-primary">{auth.user.name}</span> (
                    <span className="text-gray-500">{auth.user.email}</span>).
                </p>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-8">
                {can(permissions.role.list) && (
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <RoleCountStats />
                    </div>
                )}

                {can(permissions.user.list) && (
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <UserCountStats />
                    </div>
                )}

                {can(permissions.medium.list) && (
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <MediaSizeStats />
                    </div>
                )}

                {can(permissions.section.list) && (
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <SectionCountStats />
                    </div>
                )}

                {can(permissions.language.list) && (
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <LanguageCountStats />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-12 gap-6 mt-8">
                {can(permissions.api_doc.view) && (
                    <div className="col-span-12">
                        <ApiStatsChart />
                    </div>
                )}
            </div>
        </Master>
    )
}
