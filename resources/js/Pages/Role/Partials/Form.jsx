import Avatar from '@/Components/helpers/Avatar.jsx'
import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import usePermissions from '@/Hooks/usePermissions'
import { dataObject } from '@/Pages/Role/helper.js'
import { moduleConstants } from '@/Utils/constants.js'
import { permissions } from '@/Utils/permissions/index.js'
import { store, update } from '@actions/RoleController.js'
import { Transition } from '@headlessui/react'
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
            <div className="card mb-6 w-2/3 shadow-sm transition-all duration-200 hover:shadow-lg">
                <div className="card-header border-bottom bg-light-subtle">
                    <div className="d-flex align-items-center">
                        <Avatar size="sm" bgColor={moduleConstants.role.bgColor} icon={moduleConstants.role.icon} />
                        <h5 className="card-title m-0 text-lg font-semibold">Role Details</h5>
                    </div>
                </div>
                <div className="card-body mt-4">
                    <div className="row g-5">
                        <div className="col-12 col-md-12">
                            <div className="form-floating form-floating-outline">
                                <TextInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    id="role-name"
                                    placeholder="Role name"
                                    required={true}
                                    isFocused={true}
                                    className="shadow-sm transition-all duration-200 focus:shadow-md"
                                />
                                <InputLabel htmlFor="role-name" required={true}>
                                    Role name
                                </InputLabel>
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-6 w-2/3 shadow-sm transition-all duration-200 hover:shadow-lg">
                <div className="card-header border-bottom bg-light-subtle">
                    <div className="d-flex align-items-center">
                        <Avatar
                            size="sm"
                            bgColor={moduleConstants.permission.bgColor}
                            icon={moduleConstants.permission.icon}
                        />
                        <h5 className="card-title m-0 text-lg font-semibold">Permissions</h5>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row g-5">
                        <div className="col-12 col-md-12">
                            <div className="form-floating form-floating-outline">
                                <div className="col-md">
                                    {Object.keys(permissionsList).map((key, index) => (
                                        <div
                                            key={index}
                                            className={
                                                'rounded-3 bg-light-subtle hover:bg-light mt-6 border p-3 transition-all duration-200'
                                            }
                                        >
                                            <div className="d-flex align-items-center mb-3">
                                                <Avatar
                                                    size="xs"
                                                    bgColor={
                                                        moduleConstants[key]
                                                            ? moduleConstants[key].bgColor
                                                            : 'bg-primary'
                                                    }
                                                    icon={
                                                        moduleConstants[key]
                                                            ? moduleConstants[key].icon
                                                            : 'ri-settings-line'
                                                    }
                                                />
                                                <h6 className="fw-semibold text-dark mb-0 text-lg">
                                                    {key.toUpperCase() + ' MODULE'}
                                                </h6>
                                            </div>
                                            <div className={'flex flex-row flex-wrap justify-start gap-3'}>
                                                {permissionsList[key].map((permission, index) => (
                                                    <div className="pb-2" key={index}>
                                                        <label className="switch switch-square transition-all duration-200 hover:opacity-80">
                                                            <input
                                                                id={`permission-${permission.id}`}
                                                                type="checkbox"
                                                                className="switch-input"
                                                                checked={data.permissions.includes(permission.id)}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
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
                                                            />
                                                            <span className="switch-toggle-slider shadow-sm">
                                                                <span className="switch-on"></span>
                                                                <span className="switch-off"></span>
                                                            </span>
                                                            <span className="switch-label font-medium">
                                                                {permission.name}
                                                            </span>
                                                        </label>
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
                <div className="d-flex justify-content-end w-2/3 gap-4">
                    <button
                        disabled={processing}
                        className="btn btn-primary d-inline-flex align-items-center shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        <i className="ri-save-line me-2"></i>
                        Save Changes
                    </button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <div className="d-flex align-items-center mt-2">
                            <Avatar
                                size="xs"
                                bgColor={moduleConstants.submit.bgColor}
                                icon={moduleConstants.submit.icon}
                            />
                            <p className="text-success mb-0">Saved successfully!</p>
                        </div>
                    </Transition>
                </div>
            )}
        </form>
    )
}
