import { useEffect, useState } from 'react'
import { mediaSize as _mediaSize } from '@actions/MediumController.js'
import StatsCard from '@/Components/StatsCard.jsx'
import Loading from '@/Components/Loading.jsx'
import { formatFileSize } from '@/Utils/methods.js'

export default function MediaSizeStats() {
    const [mediaSize, setMediaSize] = useState(0)
    const [loading, setLoading] = useState(true)

    const getMediaSize = async () => setMediaSize(await _mediaSize.data({}))

    useEffect(() => {
        getMediaSize()
            .then()
            .finally(() => setLoading(false))
    }, [])

    return loading ? (
        <Loading />
    ) : (
        <StatsCard count={formatFileSize(mediaSize)} label={'Total Media Size'} icon={'ri-image-line'} />
    )
}
