import Master from '@/Layouts/Master.jsx'
import { Head } from '@inertiajs/react'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'
import DeleteUserForm from './Partials/DeleteUserForm'
import { useState } from 'react'

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [activeTab, setActiveTab] = useState('profile')

    return (
        <Master user={auth.user} header={'Profile'}>
            <Head title="Profile" />

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/4">
                    <div className="flex flex-col justify-between mb-4 lg:mb-0">
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <a
                                    className="flex items-center px-5 py-3 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                    href={route('profile.edit')}
                                >
                                    <i className="ri-user-line mr-3"></i>
                                    <span>Profile Settings</span>
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
                                    {/*<li className="mr-6">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ease-in-out ${
                                                activeTab === 'delete'
                                                    ? 'text-primary border-primary'
                                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                            role="tab"
                                            onClick={() => setActiveTab('delete')}
                                            aria-selected={activeTab === 'delete'}
                                        >
                                            <i className="ri-delete-bin-line mr-3"></i>
                                            Delete Account
                                        </button>
                                    </li>*/}
                                </ul>
                            </div>
                            <div className="bg-white p-6 shadow rounded-lg">
                                <div className={activeTab === 'profile' ? 'block' : 'hidden'}>
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-2xl"
                                    />
                                </div>
                                <div className={activeTab === 'password' ? 'block' : 'hidden'}>
                                    <UpdatePasswordForm className="max-w-2xl" />
                                </div>
                                <div className={activeTab === 'delete' ? 'block' : 'hidden'}>
                                    <DeleteUserForm className="max-w-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}
