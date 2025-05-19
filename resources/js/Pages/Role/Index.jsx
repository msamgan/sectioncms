import Master from '@/Layouts/Master.jsx'
import { Head } from '@inertiajs/react'
import PageHeader from '@/Components/PageHeader.jsx'
import OffCanvas from '@/Components/off_canvas/OffCanvas.jsx'
import Table from '@/Components/layout/Table.jsx'
import { pageObject } from '@/Pages/Role/helper.js'
import Form from '@/Pages/Role/Partials/Form.jsx'
import { useEffect, useState } from 'react'
import Name from '@/Components/helpers/Name.jsx'
import ActiveBadge from '@/Components/helpers/ActiveBadge.jsx'
import Actions from '@/Components/helpers/Actions.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import { permissions } from '@/Utils/permissions/index.js'
import { destroy, roles as _roles, show } from '@actions/RoleController.js'
import { permissions as _permissions } from '@actions/PermissionController.js'
import usePermissions from '@/Hooks/usePermissions'
import EditActionButton from '@/Components/EditActionButton.jsx'
import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import CreateActionButton from '@/Components/CreateActionButton.jsx'
import StatsCard from '@/Components/StatsCard.jsx'

export default function Index() {
    const { can } = usePermissions()

    const [roles, setRoles] = useState([])
    const [role, setRole] = useState(null)
    const [data, setData] = useState([])
    const [pageData, setPageData] = useState(pageObject(null))
    const [loading, setLoading] = useState(true)
    const [permissionsList, setPermissionsList] = useState([])

    const getPermissions = async () => setPermissionsList(await _permissions.data({}))

    const getRoles = async () => setRoles(await _roles.data({}))

    const getRole = async (id) => setRole(await show.data({ params: { role: id } }))

    const editRole = (role) => {
        getRole(role.id).then()
        setPageData(pageObject(role))
    }

    const processRole = (role) => {
        return {
            Name: (
                <div className="d-flex align-items-center">
                    <Avatar
                        size="sm"
                        bgColor="bg-success"
                        icon="ri-shield-user-line"
                    />
                    <div>
                        <Name value={role.display_name} />
                        <small className="text-muted d-block">{role.name}</small>
                    </div>
                </div>
            ),
            UserCount: (
                <div className="d-flex align-items-center">
                    <Avatar
                        size="xs"
                        bgColor="bg-primary"
                        icon="ri-user-line"
                    />
                    <span className="fw-semibold">{role.users_count}</span>
                </div>
            ),
            Status: <span className="badge rounded-pill bg-success">Active</span>,
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
            getRoles()
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
                        <div className="d-flex align-items-center">
                            <Avatar
                                size="sm"
                                bgColor="bg-success"
                                icon="ri-shield-user-line"
                            />
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

            <div className="row g-4 mb-4">
                <div className="col-sm-6 col-xl-3">
                    <StatsCard
                        count={roles.length}
                        label="Total Roles"
                        icon="ri-shield-user-line"
                    />
                </div>
                <div className="col-sm-6 col-xl-3">
                    <StatsCard
                        count={roles.reduce((acc, role) => acc + role.users_count, 0)}
                        label="Total Users Assigned"
                        icon="ri-user-line"
                    />
                </div>
            </div>

            {can([permissions.role.view, permissions.role.update, permissions.role.create]) && (
                <OffCanvas id="roleFormCanvas" title={pageData.title}>
                    <Form getRoles={getRoles} role={role} permissionsList={permissionsList} />
                </OffCanvas>
            )}

            <div className="col-12">
                <div className="card shadow-sm hover:shadow-lg transition-all duration-200">
                    <div className="card-header border-bottom bg-light-subtle">
                        <div className="d-flex align-items-center">
                            <Avatar
                                size="sm"
                                bgColor="bg-primary"
                                icon="ri-list-check"
                            />
                            <h5 className="card-title m-0 text-lg font-semibold">Role List</h5>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <Table data={data} loading={loading} permission={can(permissions.role.list)} />
                    </div>
                </div>
            </div>
        </Master>
    )
}
