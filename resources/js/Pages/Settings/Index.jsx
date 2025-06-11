import NavButton from '@/Components/NavButton.jsx'
import TabButton from '@/Components/TabButton.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import Master from '@/Layouts/Master.jsx'
import AccessToken from '@/Pages/Settings/Partials/AccessToken.jsx'
import GeneralInfo from '@/Pages/Settings/Partials/GeneralInfo.jsx'
import UpdatePasswordForm from '@/Pages/Settings/Partials/UpdatePasswordForm.jsx'
import UpdateProfileInformationForm from '@/Pages/Settings/Partials/UpdateProfileInformationForm.jsx'
import { permissions } from '@/Utils/permissions/index.js'
import { notificationSettings as _notificationSettings } from '@actions/SettingsController.js'
import { Switch } from '@headlessui/react'
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
                <div className="w-full lg:w-1/4">
                    <div className="flex flex-col justify-between mb-4 lg:mb-0">
                        <ul className="flex flex-col space-y-4 ml-12 mt-2.5">
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
                                <NavButton
                                    active={activeTabGroup === 'profile'}
                                    onClick={() => setActiveTabGroup('profile')}
                                >
                                    <i className="ri-user-line mr-3"></i>
                                    <span>Profile Settings</span>
                                </NavButton>
                            </li>
                            <li>
                                <NavButton
                                    active={activeTabGroup === 'settings'}
                                    onClick={() => setActiveTabGroup('settings')}
                                >
                                    <i className="ri-settings-3-line mr-3"></i>
                                    <span>Account Settings</span>
                                </NavButton>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full lg:w-3/4 lg:pt-0 pt-6">
                    <div className="w-full">
                        <div className="mb-6">
                            <div className="mb-5 border-b border-gray-200">
                                {/* Business Settings Tabs */}
                                {can(permissions.business.update) && (
                                    <ul
                                        className={`flex flex-wrap -mb-px ${activeTabGroup === 'business' ? 'block' : 'hidden'}`}
                                        role="tablist"
                                    >
                                        <li className="mr-6">
                                            <TabButton
                                                type="button"
                                                active={activeBusinessTab === 'general'}
                                                role="tab"
                                                onClick={() => setActiveBusinessTab('general')}
                                                aria-selected={activeBusinessTab === 'general'}
                                            >
                                                <i className="ri-settings-4-line mr-3"></i>
                                                Business Information
                                            </TabButton>
                                        </li>
                                        <li className="mr-6">
                                            <TabButton
                                                type="button"
                                                active={activeBusinessTab === 'token'}
                                                role="tab"
                                                onClick={() => setActiveBusinessTab('token')}
                                                aria-selected={activeBusinessTab === 'token'}
                                            >
                                                <i className="ri-key-line mr-3"></i>
                                                Access Token
                                            </TabButton>
                                        </li>
                                    </ul>
                                )}

                                {/* Profile Settings Tabs */}
                                <ul
                                    className={`flex flex-wrap -mb-px ${activeTabGroup === 'profile' ? 'block' : 'hidden'}`}
                                    role="tablist"
                                >
                                    <li className="mr-6">
                                        <TabButton
                                            type="button"
                                            active={activeProfileTab === 'profile'}
                                            role="tab"
                                            onClick={() => setActiveProfileTab('profile')}
                                            aria-selected={activeProfileTab === 'profile'}
                                        >
                                            <i className="ri-user-line mr-3"></i>
                                            Profile Information
                                        </TabButton>
                                    </li>
                                    <li className="mr-6">
                                        <TabButton
                                            type="button"
                                            active={activeProfileTab === 'password'}
                                            role="tab"
                                            onClick={() => setActiveProfileTab('password')}
                                            aria-selected={activeProfileTab === 'password'}
                                        >
                                            <i className="ri-lock-line mr-3"></i>
                                            Password
                                        </TabButton>
                                    </li>
                                </ul>

                                {/* Account Settings Tabs */}
                                <ul
                                    className={`flex flex-wrap -mb-px ${activeTabGroup === 'settings' ? 'block' : 'hidden'}`}
                                    role="tablist"
                                >
                                    <li className="mr-6">
                                        <TabButton
                                            type="button"
                                            active={activeSettingsTab === 'notifications'}
                                            role="tab"
                                            onClick={() => setActiveSettingsTab('notifications')}
                                            aria-selected={activeSettingsTab === 'notifications'}
                                        >
                                            <i className="ri-notification-3-line mr-3"></i>
                                            Notifications
                                        </TabButton>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-transparent p-0 shadow-none">
                                {/* Business Settings Content */}
                                {can(permissions.business.update) && (
                                    <div className={activeTabGroup === 'business' ? 'block' : 'hidden'}>
                                        <div className={activeBusinessTab === 'general' ? 'block' : 'hidden'}>
                                            <GeneralInfo business={auth.user.business} />
                                        </div>
                                        <div className={activeBusinessTab === 'token' ? 'block' : 'hidden'}>
                                            <AccessToken business={auth.user.business} />
                                        </div>
                                    </div>
                                )}

                                {/* Profile Settings Content */}
                                <div className={activeTabGroup === 'profile' ? 'block' : 'hidden'}>
                                    <div className={activeProfileTab === 'profile' ? 'block' : 'hidden'}>
                                        <div className="">
                                            <UpdateProfileInformationForm
                                                mustVerifyEmail={mustVerifyEmail}
                                                status={status}
                                                className="max-w-2xl"
                                            />
                                        </div>
                                    </div>
                                    <div className={activeProfileTab === 'password' ? 'block' : 'hidden'}>
                                        <div className="">
                                            <UpdatePasswordForm className="max-w-2xl" />
                                        </div>
                                    </div>
                                </div>

                                {/* Account Settings Content */}
                                <div className={activeTabGroup === 'settings' ? 'block' : 'hidden'}>
                                    <div className={activeSettingsTab === 'notifications' ? 'block' : 'hidden'}>
                                        {notificationSettings.length > 0 ? (
                                            notificationSettings.map((setting) => (
                                                <div
                                                    key={setting.slug}
                                                    className={'flex items-center justify-between p-4 bg-white w-1/2'}
                                                >
                                                    <div className="mb-4">
                                                        <h3 className="text-lg font-semibold mb-2">{setting.name}</h3>
                                                        <p className="text-gray-600">{setting.description}</p>
                                                    </div>
                                                    <span className="inline-flex items-center">
                                                        <Switch
                                                            checked={setting.value}
                                                            onChange={async (checked) => {
                                                                console.log(`Toggling ${setting.slug} to ${checked}`)
                                                            }}
                                                            className={`${
                                                                setting.value ? 'bg-blue-600' : 'bg-gray-200'
                                                            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                                                        >
                                                            <span
                                                                className={`${
                                                                    setting.enabled ? 'translate-x-5' : 'translate-x-0'
                                                                } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                                            />
                                                        </Switch>
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div key={'one'} className="text-gray-500">
                                                No notification settings available.
                                            </div>
                                        )}
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
