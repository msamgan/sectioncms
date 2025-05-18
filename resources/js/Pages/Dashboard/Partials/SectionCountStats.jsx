import { useEffect, useState } from 'react'
import { sectionCount as _sectionCount } from '@actions/SectionController.js'
import StatsCard from '@/Components/StatsCard.jsx'
import Loading from '@/Components/Loading.jsx'

export default function SectionCountStats() {
    const [sectionCount, setSectionCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const getSectionCount = async () => setSectionCount(await _sectionCount.data({}))

    useEffect(() => {
        getSectionCount()
            .then()
            .finally(() => setLoading(false))
    }, [])

    return loading ? (
        <Loading />
    ) : (
        <StatsCard count={sectionCount} label={'Active Sections'} icon={'ri-instance-line'} />
    )
}
