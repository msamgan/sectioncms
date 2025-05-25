import DisplayMessage from '@/Components/DisplayMessage.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import Name from '@/Components/helpers/Name.jsx'
import Table from '@/Components/layout/Table.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import StatsCard from '@/Components/StatsCard.jsx'
import usePermissions from '@/Hooks/usePermissions'
import Master from '@/Layouts/Master.jsx'
import ActionsPartial from '@/Pages/Medium/Partials/ActionsPartial.jsx'
import Preview from '@/Pages/Medium/Partials/Preview.jsx'
import Uploader from '@/Pages/Medium/Uploader.jsx'
import { moduleConstants } from '@/Utils/constants.js'
import { formatFileSize, parseQueryString } from '@/Utils/methods.js'
import { permissions } from '@/Utils/permissions/index.js'
import { media as _media } from '@actions/MediumController.js'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'

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
                <div className="flex items-center">
                    <Avatar size="sm" bgColor={moduleConstants.medium.bgColor} icon={moduleConstants.medium.icon} />
                    <div>
                        <Name value={medium.name} />
                        <small className="text-gray-500 block">{medium.type}</small>
                    </div>
                </div>
            ),
            Size: (
                <div className="flex items-center">
                    <Avatar size="xs" bgColor="bg-blue-500" icon="ri-file-text-line" />
                    <span className="font-semibold">{formatFileSize(medium.size)}</span>
                </div>
            ),
            Actions: <ActionsPartial setNotification={setNotification} medium={medium} getMedia={getMedia} />,
        }
    }

    useEffect(() => {
        setData(media.map((medium) => processMedium(medium)))
    }, [media])

    useEffect(() => {
        if (can(permissions.medium.list)) {
            getMedia(parseQueryString())
                .then()
                .finally(() => setLoading(false))
        }
    }, [])

    return (
        <Master>
            <Head title="Medium" />

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="flex items-center">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                <div>
                    <StatsCard count={media.length} label="Total Files" icon={moduleConstants.medium.icon} />
                </div>
                <div>
                    <StatsCard
                        count={formatFileSize(media.reduce((acc, medium) => acc + medium.size, 0))}
                        label="Total Size"
                        icon="ri-file-text-line"
                    />
                </div>
            </div>

            {can(permissions.medium.create) && <Uploader getMedia={getMedia} />}

            {notification && <DisplayMessage message={notification} type="success" />}

            <div className="w-full">
                <div className="bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-center p-4 border-b bg-gray-50">
                        <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon={moduleConstants.list.icon} />
                        <h5 className="m-0 ml-2 text-lg font-semibold">Media Files</h5>
                    </div>
                    <div className="p-0">
                        <Table
                            data={data}
                            loading={loading}
                            permission={can(permissions.medium.list)}
                            setLoading={setLoading}
                            refresher={getMedia}
                        />
                    </div>
                </div>
            </div>
        </Master>
    )
}
