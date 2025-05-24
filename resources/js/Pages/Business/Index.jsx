import PageHeader from '@/Components/PageHeader.jsx'
import Actions from '@/Components/helpers/Actions.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import Name from '@/Components/helpers/Name.jsx'
import DeleteEntityForm from '@/Components/layout/DeleteEntityForm.jsx'
import Table from '@/Components/layout/Table.jsx'
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
                <div className="d-flex align-items-center">
                    <Avatar size="sm" bgColor={moduleConstants.business.bgColor} icon={moduleConstants.business.icon} />
                    <div>
                        <Name value={business.name} />
                    </div>
                </div>
            ),
            Actions: (
                <Actions>
                    {businesses.length >= 2 && (
                        <>
                            <div
                                className={'dropdown-item ml-5 cursor-pointer'}
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
                                <i className="ri-cursor-line me-1 text-black"></i> Select
                            </div>

                            <DeleteEntityForm
                                action={destroy.route({ business: business.id })}
                                refresh={getBusinesses}
                                className={'dropdown-item'}
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
        <Master hideMenu={true}>
            <Head title="Users" />

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="d-flex align-items-center">
                            <Avatar
                                size="sm"
                                bgColor={moduleConstants.business.bgColor}
                                icon={moduleConstants.business.icon}
                            />
                            <span>Businesses</span>
                        </div>
                    }
                    subtitle={'Find all of your businesses and there associated details.'}
                    action={''}
                ></PageHeader>
            </div>

            <div className="col-12">
                <div className="card shadow-sm transition-all duration-200 hover:shadow-lg">
                    <div className="card-header border-bottom bg-light-subtle">
                        <div className="d-flex align-items-center">
                            <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon={moduleConstants.list.icon} />
                            <h5 className="card-title m-0 text-lg font-semibold">Business List</h5>
                        </div>
                    </div>
                    <div className="card-body p-0">
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
