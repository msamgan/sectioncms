import Master from '@/Layouts/Master.jsx'
import { Head } from '@inertiajs/react'
import { permissions } from '@/Utils/permissions/index.js'
import { useEffect, useState } from 'react'
import Actions from '@/Components/helpers/Actions.jsx'
import Name from '@/Components/helpers/Name.jsx'
import ActiveBadge from '@/Components/helpers/ActiveBadge.jsx'
import Table from '@/Components/layout/Table.jsx'
import { pageObject } from '@/Pages/User/helper.js'
import PageHeader from '@/Components/PageHeader.jsx'
import OffCanvas from '@/Components/off_canvas/OffCanvas.jsx'
import Form from '@/Pages/User/Partials/Form.jsx'
import { roles as rcRoles } from '@actions/RoleController.js'
import { destroy, show, users as _users } from '@actions/UserController.js'
import usePermissions from '@/Hooks/usePermissions'
import EditActionButton from '@/Components/EditActionButton.jsx'
import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import CreateActionButton from '@/Components/CreateActionButton.jsx'
import StatsCard from '@/Components/StatsCard.jsx'

export default function Index() {
    const { can } = usePermissions()

    const [users, setUsers] = useState([])
    const [data, setData] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [pageData, setPageData] = useState(pageObject(null))
    const [roles, setRoles] = useState([])

    const getUsers = async () => setUsers(await _users.data({}))

    const getRoles = async () => setRoles(await rcRoles.data({}))

    const getUser = async (id) => setUser(await show.data({ params: { user: id } }))

    const editUser = (user) => {
        getUser(user.id).then()
        setPageData(pageObject(user))
    }

    const processUser = (user) => {
        return {
            Name: (
                <div className="d-flex align-items-center">
                    <div className="avatar avatar-sm me-3">
                        <span className="avatar-initial rounded-circle bg-primary">
                            <i className="ri-user-line text-white"></i>
                        </span>
                    </div>
                    <div>
                        <Name value={user.name} />
                        <small className="text-muted d-block">{user.email}</small>
                    </div>
                </div>
            ),
            Roles: (
                <div className="d-flex align-items-center">
                    <div className="avatar avatar-xs me-2">
                        <span className="avatar-initial rounded-circle bg-success">
                            <i className="ri-shield-user-line text-white"></i>
                        </span>
                    </div>
                    <span className="fw-semibold">{user.roles.map((role) => role.display_name).join(', ')}</span>
                </div>
            ),
            Status: <span className="badge rounded-pill bg-success">Active</span>,
            Actions: (
                <Actions>
                    <EditActionButton module={'user'} onClick={() => editUser(user)} />
                    <DeleteActionButton module={'user'} route={destroy.route({ user: user.id })} refresh={getUsers} />
                </Actions>
            ),
        }
    }

    useEffect(() => {
        if (can(permissions.user.list)) {
            getUsers()
                .then()
                .finally(() => setLoading(false))
        }

        getRoles().then()
    }, [])

    useEffect(() => {
        setData(users.map((user) => processUser(user)))
    }, [users])

    return (
        <Master>
            <Head title="Users" />

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="d-flex align-items-center">
                            <div className="avatar avatar-sm me-3">
                                <span className="avatar-initial rounded-circle bg-primary">
                                    <i className="ri-user-line text-white"></i>
                                </span>
                            </div>
                            <span>Users</span>
                        </div>
                    }
                    subtitle={"Find all of your business's users and there associated details."}
                    action={
                        <CreateActionButton
                            module={'user'}
                            onClick={() => {
                                setUser(null)
                                setPageData(pageObject(null))
                            }}
                        />
                    }
                ></PageHeader>
            </div>

            {can([permissions.user.view, permissions.user.update, permissions.user.create]) && (
                <OffCanvas id="userFormCanvas" title={pageData.title}>
                    <Form getUsers={getUsers} roles={roles} user={user} />
                </OffCanvas>
            )}

            <div className="col-12">
                <div className="card shadow-sm hover:shadow-lg transition-all duration-200">
                    <div className="card-header border-bottom bg-light-subtle">
                        <div className="d-flex align-items-center">
                            <div className="avatar avatar-sm me-3">
                                <span className="avatar-initial rounded-circle bg-primary">
                                    <i className="ri-list-check text-white"></i>
                                </span>
                            </div>
                            <h5 className="card-title m-0 text-lg font-semibold">User List</h5>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <Table data={data} loading={loading} permission={can(permissions.user.list)} />
                    </div>
                </div>
            </div>
        </Master>
    )
}
