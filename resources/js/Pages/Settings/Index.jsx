import Master from '@/Layouts/Master.jsx'
import { Head } from '@inertiajs/react'
import { useState } from 'react'
import GeneralInfo from '@/Pages/Business/Settings/Partials/GeneralInfo.jsx'
import AccessToken from '@/Pages/Business/Settings/Partials/AccessToken.jsx'
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm'
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm'

export default function Index({ auth, mustVerifyEmail, status }) {
    const [activeTab, setActiveTab] = useState('general')

    return (
        <Master user={auth.user} header={'Settings'}>
            <Head title="Settings" />

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/4">
                    <div className="flex flex-col justify-between mb-4 lg:mb-0">
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <a
                                    className="flex items-center px-5 py-3 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                    href={route('settings')}
                                >
                                    <i className="ri-settings-4-line mr-3"></i>
                                    <span>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full lg:w-3/4 lg:pt-0 pt-6">
                    <div className="w-full">
                        <div className="mb-6">
                            <div className="mb-5 border-b border-gray-200">
                                <ul className="flex flex-wrap -mb-px" role="tablist">
                                    <li className="mr-6">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ease-in-out ${
                                                activeTab === 'general'
                                                    ? 'text-primary border-primary'
                                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                            role="tab"
                                            onClick={() => setActiveTab('general')}
                                            aria-selected={activeTab === 'general'}
                                        >
                                            <i className="ri-settings-4-line mr-3"></i>
                                            Business Information
                                        </button>
                                    </li>
                                    <li className="mr-6">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ease-in-out ${
                                                activeTab === 'token'
                                                    ? 'text-primary border-primary'
                                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                            role="tab"
                                            onClick={() => setActiveTab('token')}
                                            aria-selected={activeTab === 'token'}
                                        >
                                            <i className="ri-key-line mr-3"></i>
                                            Access Token
                                        </button>
                                    </li>
                                    <li className="mr-6">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ease-in-out ${
                                                activeTab === 'profile'
                                                    ? 'text-primary border-primary'
                                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                            role="tab"
                                            onClick={() => setActiveTab('profile')}
                                            aria-selected={activeTab === 'profile'}
                                        >
                                            <i className="ri-user-line mr-3"></i>
                                            Profile Information
                                        </button>
                                    </li>
                                    <li className="mr-6">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ease-in-out ${
                                                activeTab === 'password'
                                                    ? 'text-primary border-primary'
                                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                            role="tab"
                                            onClick={() => setActiveTab('password')}
                                            aria-selected={activeTab === 'password'}
                                        >
                                            <i className="ri-lock-line mr-3"></i>
                                            Password
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-transparent p-0 shadow-none">
                                <div className={activeTab === 'general' ? 'block' : 'hidden'}>
                                    <GeneralInfo business={auth.user.business} />
                                </div>
                                <div className={activeTab === 'token' ? 'block' : 'hidden'}>
                                    <AccessToken business={auth.user.business} />
                                </div>
                                <div className={activeTab === 'profile' ? 'block' : 'hidden'}>
                                    <div className="bg-white p-6 shadow rounded-lg">
                                        <UpdateProfileInformationForm
                                            mustVerifyEmail={mustVerifyEmail}
                                            status={status}
                                            className="max-w-2xl"
                                        />
                                    </div>
                                </div>
                                <div className={activeTab === 'password' ? 'block' : 'hidden'}>
                                    <div className="bg-white p-6 shadow rounded-lg">
                                        <UpdatePasswordForm className="max-w-2xl" />
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
