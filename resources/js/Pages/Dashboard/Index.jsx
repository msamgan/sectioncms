import usePermissions from '@/Hooks/usePermissions'
import Master from '@/Layouts/Master.jsx'
import { DashboardStatsSection } from '@/Components/layout/DashboardSection'
import DashboardSection from '@/Components/layout/DashboardSection'
import { StatsGridItem } from '@/Components/layout/StatsGrid'
import WelcomeBanner from '@/Components/layout/WelcomeBanner'
import ApiStatsChart from '@/Pages/Dashboard/Partials/ApiStatsChart.jsx'
import KeyCountStats from '@/Pages/Dashboard/Partials/KeyCountStats.jsx'
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

            {/* Welcome, Banner */}
            <WelcomeBanner user={auth.user} className="mb-8 mt-6" />

            {/* Stats Overview Section */}
            <DashboardStatsSection
                icon="ri-dashboard-line"
                title="Overview"
                headerAction={
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary flex items-center transition-colors">
                        <i className="ri-refresh-line mr-1"></i>
                        Refresh
                    </button>
                }
            >
                {can(permissions.role.list) && (
                    <StatsGridItem>
                        <RoleCountStats />
                    </StatsGridItem>
                )}

                {can(permissions.user.list) && (
                    <StatsGridItem>
                        <UserCountStats />
                    </StatsGridItem>
                )}

                {can(permissions.medium.list) && (
                    <StatsGridItem>
                        <MediaSizeStats />
                    </StatsGridItem>
                )}

                {can(permissions.language.list) && (
                    <StatsGridItem>
                        <LanguageCountStats />
                    </StatsGridItem>
                )}
            </DashboardStatsSection>

            {/* Content Stats Section */}
            <DashboardStatsSection
                icon="ri-file-list-line"
                title="Content Statistics"
                iconBgColor="bg-indigo-100"
                iconTextColor="text-indigo-600"
            >
                {can(permissions.section.list) && (
                    <StatsGridItem>
                        <SectionCountStats />
                    </StatsGridItem>
                )}

                {can(permissions.section.list) && (
                    <StatsGridItem>
                        <KeyCountStats />
                    </StatsGridItem>
                )}
            </DashboardStatsSection>

            {/* API Stats Chart Section */}
            {can(permissions.api_doc.view) && (
                <DashboardSection
                    icon="ri-line-chart-line"
                    title="API Usage Analytics"
                    iconBgColor="bg-purple-100"
                    iconTextColor="text-purple-600"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 sm:p-4">
                        <ApiStatsChart />
                    </div>
                </DashboardSection>
            )}
        </Master>
    )
}
