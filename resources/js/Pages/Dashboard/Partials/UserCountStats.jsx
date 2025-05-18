import { useEffect, useState } from 'react'
import { userCount as _userCount } from '@actions/UserController.js'
import StatsCard from '@/Components/StatsCard.jsx'
import Loading from '@/Components/Loading.jsx'

export default function UserCountStats() {
    const [userCount, setUserCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const getUserCount = async () => setUserCount(await _userCount.data({}))

    useEffect(() => {
        getUserCount()
            .then()
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <StatsCard count={userCount} label={'Active Users'} icon={'ri-user-3-line'} />
}
