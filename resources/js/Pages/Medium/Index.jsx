import Master from '@/Layouts/Master.jsx'
import { Head } from '@inertiajs/react'
import { permissions } from '@/Utils/permissions/index.js'
import { useEffect, useState } from 'react'
import Name from '@/Components/helpers/Name.jsx'
import Table from '@/Components/layout/Table.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import { media as _media } from '@actions/MediumController.js'
import usePermissions from '@/Hooks/usePermissions'
import useUrlChangeAlert from '@/Hooks/useUrlChangeAlert.js'
import Uploader from '@/Pages/Medium/Uploader.jsx'
import { formatFileSize } from '@/Utils/methods.js'
import Preview from '@/Pages/Medium/Partials/Preview.jsx'
import ActionsPartial from '@/Pages/Medium/Partials/ActionsPartial.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import StatsCard from '@/Components/StatsCard.jsx'
import { moduleConstants } from '@/Utils/constants.js'

export default function Index() {
    const { can } = usePermissions()

    const [media, setMedia] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [notification, setNotification] = useState(null)

    const getMedia = async (query) => setMedia(await _media.data({ params: query }))

    const processMedium = (medium) => {
        return {
            Preview: <Preview medium={medium} />,
            Name: (
                <div className="d-flex align-items-center">
                    <Avatar size="sm" bgColor={moduleConstants.medium.bgColor} icon={moduleConstants.medium.icon} />
                    <div>
                        <Name value={medium.name} />
                        <small className="text-muted d-block">{medium.type}</small>
                    </div>
                </div>
            ),
            Size: (
                <div className="d-flex align-items-center">
                    <Avatar size="xs" bgColor="bg-info" icon="ri-file-text-line" />
                    <span className="fw-semibold">{formatFileSize(medium.size)}</span>
                </div>
            ),
            Actions: <ActionsPartial setNotification={setNotification} medium={medium} getMedia={getMedia} />,
        }
    }

    useEffect(() => {
        setData(media.map((medium) => processMedium(medium)))
    }, [media])

    if (can(permissions.medium.list)) {
        useUrlChangeAlert(getMedia, setLoading)
    }

    return (
        <Master>
            <Head title="Medium" />

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="d-flex align-items-center">
                            <Avatar
                                size="sm"
                                bgColor={moduleConstants.medium.bgColor}
                                icon={moduleConstants.medium.icon}
                            />
                            <span>Media Library</span>
                        </div>
                    }
                    subtitle={"Find all of your business's media files and their associated details."}
                ></PageHeader>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-sm-6 col-xl-3">
                    <StatsCard count={media.length} label="Total Files" icon={moduleConstants.medium.icon} />
                </div>
                <div className="col-sm-6 col-xl-3">
                    <StatsCard
                        count={formatFileSize(media.reduce((acc, medium) => acc + medium.size, 0))}
                        label="Total Size"
                        icon="ri-file-text-line"
                    />
                </div>
            </div>

            {can(permissions.medium.create) && <Uploader getMedia={getMedia} />}

            {notification && (
                <div
                    className="bs-toast toast fade show position-absolute end-2 top-2 bg-primary"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header">
                        <i className="icon-base ri ri-checkbox-circle-fill text-success me-2"></i>
                        <div className="fw-medium me-auto">Notification.</div>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body text-white">{notification}</div>
                </div>
            )}

            <div className="col-12">
                <div className="card shadow-sm transition-all duration-200 hover:shadow-lg">
                    <div className="card-header border-bottom bg-light-subtle">
                        <div className="d-flex align-items-center">
                            <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon={moduleConstants.list.icon} />
                            <h5 className="card-title m-0 text-lg font-semibold">Media Files</h5>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <Table data={data} loading={loading} permission={can(permissions.medium.list)} />
                    </div>
                </div>
            </div>
        </Master>
    )
}
