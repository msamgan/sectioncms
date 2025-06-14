import Loading from '@/Components/Loading.jsx'
import StatsCard from '@/Components/StatsCard.jsx'
import { languageCount as _languageCount } from '@actions/LanguageController.js'
import { useEffect, useState } from 'react'

export default function LanguageCountStats() {
    const [languageCount, setLanguageCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const getLanguageCount = async () => setLanguageCount(await _languageCount.data({}))

    useEffect(() => {
        getLanguageCount()
            .then()
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <StatsCard count={languageCount} label={'Languages'} icon={'ri-global-line'} />
}
