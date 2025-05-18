import { useEffect, useState } from 'react'
import { stats as _stats } from '@actions/ApiStatsController.js'
import Chart from '@/Pages/Dashboard/Partials/Chart.jsx'
import Loading from '@/Components/Loading.jsx'

export default function ApiStatsChart() {
    const [stats, setStats] = useState({})
    const [loading, setLoading] = useState(true)
    const [label, setLabel] = useState([])
    const [dataSet, setDataSet] = useState([])

    const getStats = async () => setStats(await _stats.data({}))

    useEffect(() => {
        getStats()
            .then()
            .finally(() => {
                // setLoading(false)
            })
    }, [])

    useEffect(() => {
        setLabel(stats.labels)
        setDataSet(stats.data)

        setLoading(false)
    }, [stats])

    return (
        <div className="max-h-80">
            {loading ? <Loading /> : <Chart labels={label} dataSet={dataSet} title={'Api Stats'} dataLabel={'Calls'} />}
        </div>
    )
}
