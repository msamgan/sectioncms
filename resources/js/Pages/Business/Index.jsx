import Actions from '@/Components/helpers/Actions.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import Name from '@/Components/helpers/Name.jsx'
import DeleteEntityForm from '@/Components/layout/DeleteEntityForm.jsx'
import Table from '@/Components/layout/Table.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
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
                            <PrimaryButton
                                className="w-full flex items-center justify-center "
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
                                <i className="ri-cursor-line mr-1"></i> Select
                            </PrimaryButton>

                            <DeleteEntityForm
                                action={destroy.route({ business: business.id })}
                                refresh={getBusinesses}
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

            <Table
                data={data}
                loading={loading}
                permission={can(permissions.business.update)}
                setLoading={setLoading}
                refresher={getBusinesses}
            />
        </Master>
    )
}
