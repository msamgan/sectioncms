import CreateActionButton from '@/Components/CreateActionButton.jsx'
import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import EditActionButton from '@/Components/EditActionButton.jsx'
import Actions from '@/Components/helpers/Actions.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import Name from '@/Components/helpers/Name.jsx'
import Table from '@/Components/layout/Table.jsx'
import OffCanvas from '@/Components/off_canvas/OffCanvas.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import StatsCard from '@/Components/StatsCard.jsx'
import usePermissions from '@/Hooks/usePermissions'
import Master from '@/Layouts/Master.jsx'
import { pageObject } from '@/Pages/Role/helper.js'
import Form from '@/Pages/Role/Partials/Form.jsx'
import { moduleConstants } from '@/Utils/constants.js'
import { parseQueryString } from '@/Utils/methods.js'
import { permissions } from '@/Utils/permissions/index.js'
import { permissions as _permissions } from '@actions/PermissionController.js'
import { roles as _roles, destroy, show } from '@actions/RoleController.js'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Index() {
    const { can } = usePermissions()

    const [roles, setRoles] = useState([])
    const [role, setRole] = useState(null)
    const [data, setData] = useState([])
    const [pageData, setPageData] = useState(pageObject(null))
    const [loading, setLoading] = useState(true)
    const [permissionsList, setPermissionsList] = useState([])

    const getPermissions = async () => setPermissionsList(await _permissions.data({}))

    const getRoles = async (query) => setRoles(await _roles.data({ params: query }))

    const getRole = async (id) => setRole(await show.data({ params: { role: id } }))

    const editRole = (role) => {
        getRole(role.id).then()
        setPageData(pageObject(role))
    }

    const processRole = (role) => {
        return {
            Name: (
                <div className="flex items-center">
                    <Avatar size="sm" bgColor={moduleConstants.role.bgColor} icon={moduleConstants.role.icon} />
                    <div>
                        <Name value={role.display_name} />
                        <small className="text-gray-500 block">{role.name}</small>
                    </div>
                </div>
            ),
            UserCount: (
                <div className="flex items-center">
                    <Avatar size="xs" bgColor={moduleConstants.user.bgColor} icon={moduleConstants.user.icon} />
                    <span className="font-semibold">{role.users_count}</span>
                </div>
            ),
            Status: <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>,
            Actions: (
                <Actions>
                    <EditActionButton module={'role'} onClick={() => editRole(role)} />
                    <DeleteActionButton module={'role'} route={destroy.route({ role: role.id })} refresh={getRoles} />
                </Actions>
            ),
        }
    }

    useEffect(() => {
        if (can(permissions.role.list)) {
            getRoles(parseQueryString())
                .then()
                .finally(() => setLoading(false))
        }

        getPermissions().then()
    }, [])

    useEffect(() => setData(roles.map((role) => processRole(role))), [roles])

    return (
        <Master>
            <Head title="Roles" />

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="flex items-center">
                            <Avatar size="sm" bgColor={moduleConstants.role.bgColor} icon={moduleConstants.role.icon} />
                            <span>Roles</span>
                        </div>
                    }
                    subtitle={"Find all of your business's roles and there associated permissions."}
                    action={
                        <CreateActionButton
                            module={'role'}
                            onClick={() => {
                                setRole(null)
                                setPageData(pageObject(null))
                            }}
                        />
                    }
                ></PageHeader>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                <div>
                    <StatsCard count={roles.length} label="Total Roles" icon={moduleConstants.role.icon} />
                </div>
                <div>
                    <StatsCard
                        count={roles.reduce((acc, role) => acc + role.users_count, 0)}
                        label="Total Users Assigned"
                        icon={moduleConstants.user.icon}
                    />
                </div>
            </div>

            {can([permissions.role.view, permissions.role.update, permissions.role.create]) && (
                <OffCanvas id="roleFormCanvas" title={pageData.title}>
                    <Form getRoles={getRoles} role={role} permissionsList={permissionsList} />
                </OffCanvas>
            )}

            <div className="w-full">
                <div className="bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-lg border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center">
                            <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon={moduleConstants.list.icon} />
                            <h5 className="m-0 text-lg font-semibold ml-3">Role List</h5>
                        </div>
                    </div>
                    <div className="p-0">
                        <Table
                            data={data}
                            loading={loading}
                            permission={can(permissions.role.list)}
                            setLoading={setLoading}
                            refresher={getRoles}
                        />
                    </div>
                </div>
            </div>
        </Master>
    )
}
