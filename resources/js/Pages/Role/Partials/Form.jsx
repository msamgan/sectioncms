import Avatar from '@/Components/helpers/Avatar.jsx'
import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import usePermissions from '@/Hooks/usePermissions'
import { dataObject } from '@/Pages/Role/helper.js'
import { moduleConstants } from '@/Utils/constants.js'
import { permissions } from '@/Utils/permissions/index.js'
import { store, update } from '@actions/RoleController.js'
import { Switch, Transition } from '@headlessui/react'
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
            <div className="mb-6 w-2/3 border border-gray-200 rounded-md overflow-hidden transition-all duration-300">
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center">
                        <div className="bg-primary rounded-md p-1">
                            <Avatar
                                size="sm"
                                bgColor="transparent"
                                icon={moduleConstants.role.icon}
                                className="text-white"
                            />
                        </div>
                        <h5 className="text-lg font-medium text-primary ml-3">Role Details</h5>
                    </div>
                </div>
                <div className="p-6 bg-white">
                    <div className="space-y-6">
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
                    </div>
                </div>
            </div>

            <div className="mb-6 w-2/3 border border-gray-200 rounded-md overflow-hidden transition-all duration-300">
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center">
                        <div className="bg-primary rounded-md p-1">
                            <Avatar
                                size="sm"
                                bgColor="transparent"
                                icon={moduleConstants.permission.icon}
                                className="text-white"
                            />
                        </div>
                        <h5 className="text-lg font-medium text-primary ml-3">Permissions</h5>
                    </div>
                </div>
                <div className="p-6 bg-white">
                    <div className="space-y-6">
                        <div className="w-full">
                            <div className="relative">
                                <div>
                                    {Object.keys(permissionsList).map((key, index) => (
                                        <div
                                            key={index}
                                            className="mb-6 p-4 rounded-md border border-gray-200 bg-white transition-all duration-200"
                                        >
                                            <div className="flex items-center mb-4">
                                                <div className="bg-primary rounded-md p-1 mr-3">
                                                    <Avatar
                                                        size="xs"
                                                        bgColor="transparent"
                                                        icon={
                                                            moduleConstants[key]
                                                                ? moduleConstants[key].icon
                                                                : 'ri-settings-line'
                                                        }
                                                        className="text-white"
                                                    />
                                                </div>
                                                <h6 className="text-base font-medium text-primary">
                                                    {key.toUpperCase() + ' MODULE'}
                                                </h6>
                                            </div>
                                            <div className="flex flex-wrap gap-4">
                                                {permissionsList[key].map((permission, index) => (
                                                    <div className="mb-2 mr-6" key={index}>
                                                        <div className="flex items-center cursor-pointer group">
                                                            <Switch
                                                                id={`permission-${permission.id}`}
                                                                checked={data.permissions.includes(permission.id)}
                                                                onChange={(checked) => {
                                                                    if (checked) {
                                                                        setData('permissions', [
                                                                            ...data.permissions,
                                                                            permission.id,
                                                                        ])
                                                                    } else {
                                                                        setData(
                                                                            'permissions',
                                                                            data.permissions.filter(
                                                                                (p) => p !== permission.id,
                                                                            ),
                                                                        )
                                                                    }
                                                                }}
                                                                className={(state) =>
                                                                    `${
                                                                        state.checked ? 'bg-primary' : 'bg-gray-200'
                                                                    } relative inline-flex h-6 w-6 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1`
                                                                }
                                                            >
                                                                <span className="sr-only">{permission.name}</span>
                                                                <span
                                                                    className={(state) =>
                                                                        `${
                                                                            state.checked
                                                                                ? 'translate-x-6'
                                                                                : 'translate-x-1'
                                                                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`
                                                                    }
                                                                />
                                                            </Switch>
                                                            <span
                                                                onClick={() => {
                                                                    if (data.permissions.includes(permission.id)) {
                                                                        setData(
                                                                            'permissions',
                                                                            data.permissions.filter(
                                                                                (p) => p !== permission.id,
                                                                            ),
                                                                        )
                                                                    } else {
                                                                        setData('permissions', [
                                                                            ...data.permissions,
                                                                            permission.id,
                                                                        ])
                                                                    }
                                                                }}
                                                                className="ml-3 text-gray-700 group-hover:text-primary transition-colors duration-150"
                                                            >
                                                                {permission.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showSaveButton && (
                <div className="flex justify-end w-2/3 gap-4">
                    <button
                        disabled={processing}
                        className="bg-primary hover:bg-primary/90 text-white flex items-center transition-all duration-300 px-4 py-2 rounded-md font-medium text-sm"
                    >
                        <i className="ri-save-line mr-2"></i>
                        Save Changes
                    </button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 transform scale-95"
                        enterTo="opacity-100 transform scale-100"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100 transform scale-100"
                        leaveTo="opacity-0 transform scale-95"
                    >
                        <div className="flex items-center mt-2 bg-green-50 px-4 py-2 rounded-md border border-green-200">
                            <div className="text-green-500 mr-2">
                                <i className="ri-check-line"></i>
                            </div>
                            <p className="text-green-600 m-0 text-sm">Saved successfully!</p>
                        </div>
                    </Transition>
                </div>
            )}
        </form>
    )
}
