import Actions from '@/Components/helpers/Actions.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import Name from '@/Components/helpers/Name.jsx'
import DeleteEntityForm from '@/Components/layout/DeleteEntityForm.jsx'
import Table from '@/Components/layout/Table.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import StatsCard from '@/Components/StatsCard.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import Master from '@/Layouts/Master.jsx'
import { moduleConstants } from '@/Utils/constants.js'
import { parseQueryString } from '@/Utils/methods.js'
import { permissions } from '@/Utils/permissions/index.js'
import { businesses as _businesses, destroy, select } from '@actions/BusinessController.js'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Index() {
    const { can } = usePermissions()

    const [businesses, setBusinesses] = useState([])
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const getBusinesses = async (query) => setBusinesses(await _businesses.data({ params: query }))

    const processBusiness = (business) => {
        return {
            Name: (
                <div className="flex items-center">
                    <Avatar size="sm" bgColor={moduleConstants.business.bgColor} icon={moduleConstants.business.icon} />
                    <div>
                        <Name value={business.name} />
                        <small className="text-gray-500 dark:text-gray-400 block transition-colors duration-250">Business</small>
                    </div>
                </div>
            ),
            Actions: (
                <Actions>
                    {businesses.length >= 2 && (
                        <>
                            <div
                                className={'px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-250'}
                                onClick={() => {
                                    select
                                        .call({
                                            params: {
                                                business: business.id,
                                            },
                                        })
                                        .then((response) => {
                                            if (response.status === 200) {
                                                window.location.href = route('dashboard')
                                            }
                                        })
                                }}
                            >
                                <i className="ri-cursor-line mr-1 text-black dark:text-white transition-colors duration-250"></i> Select
                            </div>

                            <DeleteEntityForm
                                action={destroy.route({ business: business.id })}
                                refresh={getBusinesses}
                                className={'px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-250'}
                            />
                        </>
                    )}
                </Actions>
            ),
        }
    }

    useEffect(() => {
        setData(businesses.map((business) => processBusiness(business)))
    }, [businesses])

    useEffect(() => {
        if (can(permissions.business.update)) {
            getBusinesses(parseQueryString())
                .then()
                .finally(() => setLoading(false))
        }
    }, [])

    return (
        <Master>
            <Head title="Businesses" />

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="flex items-center">
                            <Avatar
                                size="sm"
                                bgColor={moduleConstants.business.bgColor}
                                icon={moduleConstants.business.icon}
                            />
                            <span>Businesses</span>
                        </div>
                    }
                    subtitle={'Find all of your businesses and their associated details.'}
                ></PageHeader>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                <div>
                    <StatsCard
                        count={businesses.length}
                        label="Total Businesses"
                        icon={moduleConstants.business.icon}
                    />
                </div>
            </div>

            <div className="w-full">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/10 transition-all duration-250">
                    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon={moduleConstants.list.icon} />
                        <h5 className="m-0 ml-2 text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-250">Business List</h5>
                    </div>
                    <div className="p-0 overflow-visible">
                        <Table
                            data={data}
                            loading={loading}
                            permission={can(permissions.business.update)}
                            setLoading={setLoading}
                            refresher={getBusinesses}
                        />
                    </div>
                </div>
            </div>
        </Master>
    )
}
