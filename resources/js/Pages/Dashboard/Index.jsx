import usePermissions from '@/Hooks/usePermissions'
import Master from '@/Layouts/Master.jsx'
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

            {/* Welcome Banner */}
            <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 overflow-hidden relative mt-6">
                {/* Decorative circles */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white opacity-5 rounded-full"></div>
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white opacity-5 rounded-full"></div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Welcome back, {auth.user.name}!
                        </h1>
                        <p className="text-blue-100 flex flex-wrap items-center gap-2">
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center">
                                <i className="ri-mail-line mr-2"></i>
                                {auth.user.email}
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm hidden sm:flex items-center">
                                <i className="ri-user-line mr-2"></i>
                                {auth.user.role.display_name}
                            </span>
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm flex items-center">
                            <i className="ri-time-line mr-2"></i>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Overview Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3 text-primary">
                            <i className="ri-dashboard-line text-xl"></i>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
                    </div>
                    <div className="hidden sm:block">
                        <button className="text-sm text-gray-500 hover:text-primary flex items-center transition-colors">
                            <i className="ri-refresh-line mr-1"></i>
                            Refresh
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 md:gap-6">
                    {can(permissions.role.list) && (
                        <div className="col-span-6 md:col-span-6 lg:col-span-3">
                            <RoleCountStats />
                        </div>
                    )}

                    {can(permissions.user.list) && (
                        <div className="col-span-6 md:col-span-6 lg:col-span-3">
                            <UserCountStats />
                        </div>
                    )}

                    {can(permissions.medium.list) && (
                        <div className="col-span-6 md:col-span-6 lg:col-span-3">
                            <MediaSizeStats />
                        </div>
                    )}

                    {can(permissions.language.list) && (
                        <div className="col-span-6 md:col-span-6 lg:col-span-3">
                            <LanguageCountStats />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Stats Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-3 text-indigo-600">
                            <i className="ri-file-list-line text-xl"></i>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Content Statistics</h2>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 md:gap-6">
                    {can(permissions.section.list) && (
                        <div className="col-span-6 md:col-span-6 lg:col-span-3">
                            <SectionCountStats />
                        </div>
                    )}

                    {can(permissions.section.list) && (
                        <div className="col-span-6 md:col-span-6 lg:col-span-3">
                            <KeyCountStats />
                        </div>
                    )}
                </div>
            </div>

            {/* API Stats Chart Section */}
            {can(permissions.api_doc.view) && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="bg-purple-100 p-2 rounded-lg mr-3 text-purple-600">
                                <i className="ri-line-chart-line text-xl"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">API Usage Analytics</h2>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
                        <ApiStatsChart />
                    </div>
                </div>
            )}
        </Master>
    )
}
