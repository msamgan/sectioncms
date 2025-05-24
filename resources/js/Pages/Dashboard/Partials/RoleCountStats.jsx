import Loading from '@/Components/Loading.jsx'
import StatsCard from '@/Components/StatsCard.jsx'
import { roleCount as _roleCount } from '@actions/RoleController.js'
import { useEffect, useState } from 'react'

export default function RoleCountStats() {
    const [roleCount, setRoleCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const getRoleCount = async () => setRoleCount(await _roleCount.data({}))

    useEffect(() => {
        getRoleCount()
            .then()
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <StatsCard count={roleCount} label={'Active Roles'} icon={'ri-shield-user-line'} />
}
