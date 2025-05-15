import Master from '@/Layouts/Master.jsx'
import { Head } from '@inertiajs/react'
import { permissions } from '@/Utils/permissions/index.js'
import { useEffect, useState } from 'react'
import Name from '@/Components/helpers/Name.jsx'
import Table from '@/Components/layout/Table.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import { media as _media } from '@actions/MediumController.js'
import usePermissions from '@/Hooks/usePermissions'
import Uploader from '@/Pages/Medium/Uploader.jsx'
import { formatFileSize, parseQueryString } from '@/Utils/methods.js'
import Preview from '@/Pages/Medium/Partials/Preview.jsx'
import ActionsPartial from '@/Pages/Medium/Partials/ActionsPartial.jsx'

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
            Name: <Name value={medium.name} />,
            Size: formatFileSize(medium.size),
            Type: medium.type,
            Actions: <ActionsPartial setNotification={setNotification} medium={medium} getMedia={getMedia} />,
        }
    }

    useEffect(() => {
        if (can(permissions.medium.list)) {
            getMedia(parseQueryString())
                .then()
                .finally(() => setLoading(false))
        }
    }, [])

    useEffect(() => {
        setData(media.map((medium) => processMedium(medium)))
    }, [media])

    return (
        <Master>
            <Head title="Medium" />

            <PageHeader
                title={'Medium'}
                subtitle={'Find all of your business’s Medium and there associated details.'}
            ></PageHeader>

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
                <Table data={data} loading={loading} permission={can(permissions.medium.list)} />
            </div>
        </Master>
    )
}
