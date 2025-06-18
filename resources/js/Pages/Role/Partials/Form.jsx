import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import FormCard from '@/Components/layout/FormCard.jsx'
import PermissionGroup from '@/Components/layout/PermissionGroup.jsx'
import SaveButton from '@/Components/layout/SaveButton.jsx'
import usePermissions from '@/Hooks/usePermissions'
import { dataObject } from '@/Pages/Role/helper.js'
import { moduleConstants } from '@/Utils/constants.js'
import { permissions } from '@/Utils/permissions/index.js'
import { store, update } from '@actions/RoleController.js'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Form({ getRoles, role = null, permissionsList }) {
    const { can } = usePermissions()

    const [showSaveButton, setShowSaveButton] = useState(false)
    const [action, setAction] = useState(store.route())
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm(dataObject(role))

    useEffect(() => {
        setAction(role ? update.route({ role: role.id }) : store.route())
        setData(dataObject(role))
        setShowSaveButton(role ? can(permissions.role.update) : can(permissions.role.create))
    }, [role])

    const submit = (e) => {
        e.preventDefault()

        post(action, {
            onSuccess: (r) => {
                if (!role) {
                    reset('name', 'permissions')
                }

                getRoles()
            },
            onError: () => {},
        })
    }

    return (
        <form onSubmit={submit}>
            <FormCard
                icon={moduleConstants.role.icon}
                title="Role Details"
            >
                <div className="w-full">
                    <div className="relative mb-4">
                        <InputLabel
                            htmlFor="role-name"
                            required={true}
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Role name
                        </InputLabel>
                        <TextInput
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            id="role-name"
                            placeholder="Role name"
                            required={true}
                            isFocused={true}
                            className="transition-all duration-200 focus:border-primary rounded-md hover:border-primary"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                </div>
            </FormCard>

            <FormCard
                icon={moduleConstants.permission.icon}
                title="Permissions"
            >
                <div className="w-full">
                    <div className="relative">
                        <div>
                            {Object.keys(permissionsList).map((key, index) => (
                                <PermissionGroup
                                    key={index}
                                    moduleName={key}
                                    permissions={permissionsList[key]}
                                    selectedPermissions={data.permissions}
                                    onTogglePermission={(permissionId, checked) => {
                                        if (checked) {
                                            setData('permissions', [
                                                ...data.permissions,
                                                permissionId,
                                            ])
                                        } else {
                                            setData(
                                                'permissions',
                                                data.permissions.filter(
                                                    (p) => p !== permissionId,
                                                ),
                                            )
                                        }
                                    }}
                                    onToggleMultiplePermissions={(permissionIds, checked) => {
                                        if (checked) {
                                            // Add all permissions that aren't already selected
                                            setData('permissions', [
                                                ...data.permissions,
                                                ...permissionIds
                                            ])
                                        } else {
                                            // Remove all specified permissions
                                            setData(
                                                'permissions',
                                                data.permissions.filter(
                                                    (p) => !permissionIds.includes(p)
                                                ),
                                            )
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </FormCard>

            {showSaveButton && (
                <SaveButton
                    processing={processing}
                    recentlySuccessful={recentlySuccessful}
                />
            )}
        </form>
    )
}
