import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import FormCard from '@/Components/layout/FormCard.jsx'
import SaveButton from '@/Components/layout/SaveButton.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import { dataObject } from '@/Pages/User/helper.js'
import { moduleConstants } from '@/Utils/constants.js'
import { permissions } from '@/Utils/permissions/index.js'
import { store, update } from '@actions/UserController.js'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Form({ getUsers, user = null, roles }) {
    const { can } = usePermissions()

    const [action, setAction] = useState(store.route())
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm(dataObject(null))
    const [showSaveButton, setShowSaveButton] = useState(false)

    useEffect(() => {
        setAction(user ? update.route({ user: user.id }) : store.route())
        setData(dataObject(user))
        setShowSaveButton(user ? can(permissions.user.update) : can(permissions.user.create))
    }, [user])

    const submit = (e) => {
        e.preventDefault()

        post(action, {
            onSuccess: (r) => {
                if (!user) {
                    reset('name', 'email', 'password', 'role')
                }

                getUsers()
            },
            onError: () => {},
        })
    }

    return (
        <form onSubmit={submit}>
            <FormCard
                icon={moduleConstants.user.icon}
                title="User Details"
            >
                <div className="w-full">
                    <div className="relative mb-4">
                        <InputLabel
                            htmlFor="name"
                            required={true}
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Name
                        </InputLabel>
                        <TextInput
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            id="name"
                            placeholder="John Doe"
                            required={true}
                            isFocused={true}
                            className="transition-all duration-200 focus:border-primary rounded-md hover:border-primary"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full">
                        <div className="relative mb-4">
                            <InputLabel
                                htmlFor="email"
                                required={true}
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Email
                            </InputLabel>
                            <TextInput
                                type="text"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                id="email"
                                placeholder="john@example.com"
                                required={true}
                                className="transition-all duration-200 focus:border-primary rounded-md hover:border-primary"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="relative mb-4">
                            <InputLabel
                                htmlFor="password"
                                required={!user}
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Password
                            </InputLabel>
                            <TextInput
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                id="password"
                                placeholder="••••••••"
                                required={!user}
                                className="transition-all duration-200 focus:border-primary rounded-md hover:border-primary"
                            />
                            <InputError className="mt-2" message={errors.password} />
                            {user && (
                                <small className="text-gray-500">
                                    If you enter a password, the current password will be replaced.
                                </small>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="relative mb-4">
                        <InputLabel
                            htmlFor="role"
                            required={true}
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Role
                        </InputLabel>
                        <select
                            id="role"
                            className="w-full rounded-md transition-all duration-200 focus:border-primary hover:border-primary"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                        >
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.display_name}
                                </option>
                            ))}
                        </select>
                        <InputError className="mt-2" message={errors.role} />
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
