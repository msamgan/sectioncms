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

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/4">
                    <div className="flex flex-col justify-between mb-4 lg:mb-0">
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <a
                                    className="flex items-center px-5 py-3 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                    href={route('business.settings')}
                                >
                                    <i className="ri-store-2-line mr-3"></i>
                                    <span>General Details</span>
                                </a>
                            </li>
                            {/*<li>
								<a className="flex items-center px-5 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors" href={route('business.settings')}>
									<i className="ri-map-2-line mr-3"></i>
									<span>Locations</span>
								</a>
							</li>
							<li>
								<a className="flex items-center px-5 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors" href="#">
									<i className="ri-bank-card-line mr-3"></i>
									<span>Businesses</span>
								</a>
							</li>*/}
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
                                            General
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
                                </ul>
                            </div>
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
