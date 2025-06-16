import DeleteEntityForm from '@/Components/layout/DeleteEntityForm.jsx'
import usePermissions from '@/Hooks/usePermissions'
import { permissions } from '@/Utils/permissions/index.js'

export default function DeleteActionButton({ module, route, refresh }) {
    const { can } = usePermissions()

    return can(permissions[module].delete) ? (
        <DeleteEntityForm action={route} refresh={refresh} className={'w-full text-left'} />
    ) : null
}
