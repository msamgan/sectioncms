import { useEffect, useState } from 'react'
import { languageCount as _languageCount } from '@actions/LanguageController.js'
import StatsCard from '@/Components/StatsCard.jsx'
import Loading from '@/Components/Loading.jsx'

export default function LanguageCountStats() {
    const [languageCount, setLanguageCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const getLanguageCount = async () => setLanguageCount(await _languageCount.data({}))

    useEffect(() => {
        getLanguageCount()
            .then()
            .finally(() => setLoading(false))
    }, [])

    return loading ? (
        <Loading />
    ) : (
        <StatsCard count={languageCount} label={'Enabled Languages'} icon={'ri-global-line'} />
    )
}
