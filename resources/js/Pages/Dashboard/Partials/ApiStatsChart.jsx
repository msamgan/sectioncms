import LoadingIndicator from '@/Components/LoadingIndicator.jsx'
import Chart from '@/Pages/Dashboard/Partials/Chart.jsx'
import { stats as _stats } from '@actions/ApiStatsController.js'
import { useEffect, useState } from 'react'

export default function ApiStatsChart() {
    const [stats, setStats] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [label, setLabel] = useState([])
    const [dataSet, setDataSet] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const getStats = async () => {
        try {
            setError(null)
            const data = await _stats.data({})
            setStats(data)
            return data
        } catch (err) {
            setError('Failed to load API statistics. Please try again.')
            console.error('Error fetching API stats:', err)
            return null
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true)
        await getStats()
        setTimeout(() => setRefreshing(false), 600) // Add a small delay to show the refresh animation
    }

    useEffect(() => {
        getStats()
            .then()
            .finally(() => {
                // Loading state is managed in the second useEffect
            })
    }, [])

    useEffect(() => {
        if (stats && stats.labels && stats.data) {
            setLabel(stats.labels)
            setDataSet(stats.data)
        }
        setLoading(false)
    }, [stats])

    // Render loading state
    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-[400px] flex items-center justify-center">
                <LoadingIndicator type="wave" size="md" text="Loading API statistics" center={true} />
            </div>
        )
    }

    // Render error state
    if (error) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-[400px] flex flex-col items-center justify-center">
                <div className="text-red-500 mb-4 text-5xl">
                    <i className="ri-error-warning-line"></i>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">{error}</p>
                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                    <i className="ri-refresh-line mr-2"></i>
                    Try Again
                </button>
            </div>
        )
    }

    // Render empty state
    if (!dataSet || dataSet.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-[400px] flex flex-col items-center justify-center">
                <div className="text-blue-500 mb-4 text-5xl">
                    <i className="ri-bar-chart-box-line"></i>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">No API statistics available yet.</p>
                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                    <i className="ri-refresh-line mr-2"></i>
                    Refresh
                </button>
            </div>
        )
    }

    // Render chart
    return (
        <div className="relative">
            <div className="absolute top-2 right-2 z-10">
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="p-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    title="Refresh data"
                >
                    <i className={`ri-refresh-line ${refreshing ? 'animate-spin' : ''}`}></i>
                </button>
            </div>
            <div className="h-[400px]">
                <Chart labels={label} dataSet={dataSet} title={'API Usage Statistics'} dataLabel={'API Calls'} />
            </div>
        </div>
    )
}
