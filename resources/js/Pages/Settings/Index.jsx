import usePermissions from '@/Hooks/usePermissions.js'
import Master from '@/Layouts/Master.jsx'
import AccountTabs from '@/Pages/Settings/Partials/AccountTabs.jsx'
import BusinessContent from '@/Pages/Settings/Partials/BusinessContent.jsx'
import BusinessTabs from '@/Pages/Settings/Partials/BusinessTabs.jsx'
import NotificationsContent from '@/Pages/Settings/Partials/NotificationsContent.jsx'
import ProfileContent from '@/Pages/Settings/Partials/ProfileContent.jsx'
import ProfileTabs from '@/Pages/Settings/Partials/ProfileTabs.jsx'
import Sidebar from '@/Pages/Settings/Partials/Sidebar.jsx'
import { permissions } from '@/Utils/permissions/index.js'
import { notificationSettings as _notificationSettings } from '@actions/SettingsController.js'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Index({ auth, mustVerifyEmail, status }) {
    const { can } = usePermissions()
    const [activeTabGroup, setActiveTabGroup] = useState('profile')
    const [activeBusinessTab, setActiveBusinessTab] = useState('general')
    const [activeProfileTab, setActiveProfileTab] = useState('profile')
    const [activeSettingsTab, setActiveSettingsTab] = useState('notifications')
    const [notificationSettings, setNotificationSettings] = useState([])

    const getNotificationSettings = async () => setNotificationSettings(await _notificationSettings.data({}))

    useEffect(() => {
        getNotificationSettings().then()
    }, [])

    return (
        <Master user={auth.user} header={'Settings'}>
            <Head title="Settings" />

            <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar activeTabGroup={activeTabGroup} setActiveTabGroup={setActiveTabGroup} />

                <div className="w-full lg:w-3/4 lg:pt-0 pt-6">
                    <div className="w-full">
                        <div className="mb-6">
                            <div className="mb-5 border-b border-gray-200">
                                {/* Business Settings Tabs */}
                                {can(permissions.business.update) && (
                                    <BusinessTabs
                                        activeBusinessTab={activeBusinessTab}
                                        setActiveBusinessTab={setActiveBusinessTab}
                                        isVisible={activeTabGroup === 'business'}
                                    />
                                )}

                                {/* Profile Settings Tabs */}
                                <ProfileTabs
                                    activeProfileTab={activeProfileTab}
                                    setActiveProfileTab={setActiveProfileTab}
                                    isVisible={activeTabGroup === 'profile'}
                                />

                                {/* Account Settings Tabs */}
                                <AccountTabs
                                    activeSettingsTab={activeSettingsTab}
                                    setActiveSettingsTab={setActiveSettingsTab}
                                    isVisible={activeTabGroup === 'settings'}
                                />
                            </div>

                            <div className="bg-transparent p-0 shadow-none">
                                {/* Business Settings Content */}
                                {can(permissions.business.update) && (
                                    <div className={activeTabGroup === 'business' ? 'block' : 'hidden'}>
                                        <BusinessContent
                                            activeBusinessTab={activeBusinessTab}
                                            business={auth.user.business}
                                        />
                                    </div>
                                )}

                                {/* Profile Settings Content */}
                                <div className={activeTabGroup === 'profile' ? 'block' : 'hidden'}>
                                    <ProfileContent
                                        activeProfileTab={activeProfileTab}
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                    />
                                </div>

                                {/* Account Settings Content */}
                                <div className={activeTabGroup === 'settings' ? 'block' : 'hidden'}>
                                    <div className={activeSettingsTab === 'notifications' ? 'block' : 'hidden'}>
                                        <NotificationsContent notificationSettings={notificationSettings} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}
