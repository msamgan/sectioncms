import Master from '@/Layouts/Master.jsx'
import AccessToken from '@/Pages/Business/Settings/Partials/AccessToken.jsx'
import GeneralInfo from '@/Pages/Business/Settings/Partials/GeneralInfo.jsx'
import { Head } from '@inertiajs/react'
import { useState } from 'react'

export default function Index({ auth }) {
    const [activeTab, setActiveTab] = useState('general')

    return (
        <Master user={auth.user} header={'Business Settings'}>
            <Head title="Business Settings" />

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/6">
                    <div className="flex flex-col justify-between mb-4 lg:mb-0">
                        <ul className="flex flex-col space-y-1">
                            <li className="mb-1">
                                <a
                                    className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                    href={route('business.settings')}
                                >
                                    <i className="ri-store-2-line mr-2"></i>
                                    <span>General Details</span>
                                </a>
                            </li>
                            {/*<li className="mb-1">
								<a className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors" href={route('business.settings')}>
									<i className="ri-map-2-line mr-2"></i>
									<span>Locations</span>
								</a>
							</li>
							<li className="mb-1">
								<a className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors" href="#">
									<i className="ri-bank-card-line mr-2"></i>
									<span>Businesses</span>
								</a>
							</li>*/}
                        </ul>
                    </div>
                </div>
                <div className="w-full lg:w-5/6 lg:pt-0 pt-6">
                    <div className="w-full">
                        <div className="mb-6">
                            <ul className="flex flex-wrap border-b border-gray-200 mb-4" role="tablist">
                                <li className="mr-2">
                                    <button
                                        type="button"
                                        className={`px-4 py-2 rounded-t-md text-sm font-medium ${
                                            activeTab === 'general'
                                                ? 'bg-white text-blue-600 border border-gray-200 border-b-white'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                        role="tab"
                                        onClick={() => setActiveTab('general')}
                                        aria-selected={activeTab === 'general'}
                                    >
                                        General
                                    </button>
                                </li>
                                <li className="mr-2">
                                    <button
                                        type="button"
                                        className={`px-4 py-2 rounded-t-md text-sm font-medium ${
                                            activeTab === 'token'
                                                ? 'bg-white text-blue-600 border border-gray-200 border-b-white'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                        role="tab"
                                        onClick={() => setActiveTab('token')}
                                        aria-selected={activeTab === 'token'}
                                    >
                                        Access Token
                                    </button>
                                </li>
                            </ul>
                            <div className="bg-transparent p-0 shadow-none">
                                <div className={activeTab === 'general' ? 'block' : 'hidden'}>
                                    <GeneralInfo business={auth.user.business} />
                                </div>
                                <div className={activeTab === 'token' ? 'block' : 'hidden'}>
                                    <AccessToken business={auth.user.business} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}
