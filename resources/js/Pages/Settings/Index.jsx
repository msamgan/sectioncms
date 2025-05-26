import Master from '@/Layouts/Master.jsx'
import AccessToken from '@/Pages/Business/Settings/Partials/AccessToken.jsx'
import GeneralInfo from '@/Pages/Business/Settings/Partials/GeneralInfo.jsx'
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm'
import { Head } from '@inertiajs/react'
import { useState } from 'react'

export default function Index({ auth, mustVerifyEmail, status }) {
    const [activeTabGroup, setActiveTabGroup] = useState('business')
    const [activeBusinessTab, setActiveBusinessTab] = useState('general')
    const [activeProfileTab, setActiveProfileTab] = useState('profile')

    return (
        <Master user={auth.user} header={'Settings'}>
            <Head title="Settings" />

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/4">
                    <div className="flex flex-col justify-between mb-4 lg:mb-0">
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <button
                                    className={`flex items-center px-5 py-3 rounded-md text-sm font-medium ${
                                        activeTabGroup === 'business'
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    } transition-colors`}
                                    onClick={() => setActiveTabGroup('business')}
                                >
                                    <i className="ri-store-2-line mr-3"></i>
                                    <span>Business Settings</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`flex items-center px-5 py-3 rounded-md text-sm font-medium ${
                                        activeTabGroup === 'profile'
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    } transition-colors`}
                                    onClick={() => setActiveTabGroup('profile')}
                                >
                                    <i className="ri-user-line mr-3"></i>
                                    <span>Profile Settings</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full lg:w-3/4 lg:pt-0 pt-6">
                    <div className="w-full">
                        <div className="mb-6">
                            <div className="mb-5 border-b border-gray-200">
                                {/* Business Settings Tabs */}
                                <ul
                                    className={`flex flex-wrap -mb-px ${activeTabGroup === 'business' ? 'block' : 'hidden'}`}
                                    role="tablist"
                                >
                                    <li className="mr-6">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ease-in-out ${
                                                activeBusinessTab === 'general'
                                                    ? 'text-primary border-primary'
                                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                            role="tab"
                                            onClick={() => setActiveBusinessTab('general')}
                                            aria-selected={activeBusinessTab === 'general'}
                                        >
                                            <i className="ri-settings-4-line mr-3"></i>
                                            Business Information
                                        </button>
                                    </li>
                                    <li className="mr-6">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ease-in-out ${
                                                activeBusinessTab === 'token'
                                                    ? 'text-primary border-primary'
                                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                            role="tab"
                                            onClick={() => setActiveBusinessTab('token')}
                                            aria-selected={activeBusinessTab === 'token'}
                                        >
                                            <i className="ri-key-line mr-3"></i>
                                            Access Token
                                        </button>
                                    </li>
                                </ul>

                                {/* Profile Settings Tabs */}
                                <ul
                                    className={`flex flex-wrap -mb-px ${activeTabGroup === 'profile' ? 'block' : 'hidden'}`}
                                    role="tablist"
                                >
                                    <li className="mr-6">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ease-in-out ${
                                                activeProfileTab === 'profile'
                                                    ? 'text-primary border-primary'
                                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                            role="tab"
                                            onClick={() => setActiveProfileTab('profile')}
                                            aria-selected={activeProfileTab === 'profile'}
                                        >
                                            <i className="ri-user-line mr-3"></i>
                                            Profile Information
                                        </button>
                                    </li>
                                    <li className="mr-6">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ease-in-out ${
                                                activeProfileTab === 'password'
                                                    ? 'text-primary border-primary'
                                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                            role="tab"
                                            onClick={() => setActiveProfileTab('password')}
                                            aria-selected={activeProfileTab === 'password'}
                                        >
                                            <i className="ri-lock-line mr-3"></i>
                                            Password
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-transparent p-0 shadow-none">
                                {/* Business Settings Content */}
                                <div className={activeTabGroup === 'business' ? 'block' : 'hidden'}>
                                    <div className={activeBusinessTab === 'general' ? 'block' : 'hidden'}>
                                        <GeneralInfo business={auth.user.business} />
                                    </div>
                                    <div className={activeBusinessTab === 'token' ? 'block' : 'hidden'}>
                                        <AccessToken business={auth.user.business} />
                                    </div>
                                </div>

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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}
