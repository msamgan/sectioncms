import CreateActionButton from '@/Components/CreateActionButton.jsx'
import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import EditActionButton from '@/Components/EditActionButton.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import Actions from '@/Components/helpers/Actions.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import Name from '@/Components/helpers/Name.jsx'
import Table from '@/Components/layout/Table.jsx'
import OffCanvas from '@/Components/off_canvas/OffCanvas.jsx'
import usePermissions from '@/Hooks/usePermissions'
import Master from '@/Layouts/Master.jsx'
import Form from '@/Pages/User/Partials/Form.jsx'
import { pageObject } from '@/Pages/User/helper.js'
import { moduleConstants } from '@/Utils/constants.js'
import { parseQueryString } from '@/Utils/methods.js'
import { permissions } from '@/Utils/permissions/index.js'
import { roles as rcRoles } from '@actions/RoleController.js'
import { users as _users, destroy, show } from '@actions/UserController.js'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Index() {
    const { can } = usePermissions()

    const [users, setUsers] = useState([])
    const [data, setData] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [pageData, setPageData] = useState(pageObject(null))
    const [roles, setRoles] = useState([])

    const getUsers = async (query) => setUsers(await _users.data({ params: query }))

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
                    <Avatar size="sm" bgColor={moduleConstants.user.bgColor} icon={moduleConstants.user.icon} />
                    <div>
                        <Name value={user.name} />
                        <small className="text-muted d-block">{user.email}</small>
                    </div>
                </div>
            ),
            Roles: (
                <div className="d-flex align-items-center">
                    <Avatar size="xs" bgColor={moduleConstants.role.bgColor} icon={moduleConstants.role.icon} />
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
            getUsers(parseQueryString())
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
                            <Avatar size="sm" bgColor={moduleConstants.user.bgColor} icon={moduleConstants.user.icon} />
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
                <div className="card shadow-sm transition-all duration-200 hover:shadow-lg">
                    <div className="card-header border-bottom bg-light-subtle">
                        <div className="d-flex align-items-center">
                            <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon={moduleConstants.list.icon} />
                            <h5 className="card-title m-0 text-lg font-semibold">User List</h5>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <Table
                            data={data}
                            loading={loading}
                            permission={can(permissions.user.list)}
                            setLoading={setLoading}
                            refresher={getUsers}
                        />
                    </div>
                </div>
            </div>
        </Master>
    )
}
