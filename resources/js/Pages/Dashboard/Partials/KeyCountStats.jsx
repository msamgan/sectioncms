import Loading from '@/Components/Loading.jsx'
import StatsCard from '@/Components/StatsCard.jsx'
import { keysCount as _keysCount } from '@actions/SectionController.js'
import { useEffect, useState } from 'react'

export default function KeyCountStats() {
    const [keysCount, setKeysCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const getKeysCount = async () => setKeysCount(await _keysCount.data({}))

    useEffect(() => {
        getKeysCount()
            .then()
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <StatsCard count={keysCount} label={'Active Keys'} icon={'ri-instance-line'} />
}
