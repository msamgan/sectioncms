import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import { dataObject } from '@/Pages/User/helper.js'
import { moduleConstants } from '@/Utils/constants.js'
import { permissions } from '@/Utils/permissions/index.js'
import { store, update } from '@actions/UserController.js'
import { Transition } from '@headlessui/react'
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
            <div className="mb-6 w-2/3 shadow-lg transition-all duration-300 hover:shadow-xl rounded-lg border border-gray-200 overflow-hidden">
                <div className="border-b bg-gradient-to-r from-blue-100 to-indigo-100 p-5">
                    <div className="flex items-center">
                        <div className="bg-primary rounded-md shadow-md p-1">
                            <Avatar
                                size="sm"
                                bgColor="transparent"
                                icon={moduleConstants.user.icon}
                                className="text-white"
                            />
                        </div>
                        <h5 className="text-xl font-bold text-primary ml-3">User Details</h5>
                    </div>
                </div>
                <div className="p-8 bg-white">
                    <div className="space-y-8">
                        <div className="w-full">
                            <div className="relative mb-4">
                                <InputLabel htmlFor="user-name" required={true} className="block text-gray-700 font-medium mb-2">
                                    Name
                                </InputLabel>
                                <TextInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    id="user-name"
                                    placeholder="John Doe"
                                    required={true}
                                    isFocused={true}
                                    className="shadow-sm transition-all duration-200 focus:shadow-md focus:border-primary rounded-md hover:border-primary"
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="w-full">
                                <div className="relative mb-4">
                                    <InputLabel htmlFor="user-email" required={true} className="block text-gray-700 font-medium mb-2">
                                        Email
                                    </InputLabel>
                                    <TextInput
                                        type="text"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        id="user-email"
                                        placeholder="john@example.com"
                                        required={true}
                                        className="shadow-sm transition-all duration-200 focus:shadow-md focus:border-primary rounded-md hover:border-primary"
                                    />
                                    <InputError className="mt-2" message={errors.email} />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="relative mb-4">
                                    <InputLabel htmlFor="user-password" required={!user} className="block text-gray-700 font-medium mb-2">
                                        Password
                                    </InputLabel>
                                    <TextInput
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        id="user-password"
                                        placeholder="••••••••"
                                        required={!user}
                                        className="shadow-sm transition-all duration-200 focus:shadow-md focus:border-primary rounded-md hover:border-primary"
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
                                <InputLabel htmlFor="role" required={true} className="block text-gray-700 font-medium mb-2">
                                    Role
                                </InputLabel>
                                <select
                                    id="role"
                                    className="w-full rounded-md shadow-sm transition-all duration-200 focus:shadow-md focus:border-primary hover:border-primary"
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
                    </div>
                </div>
            </div>
            {showSaveButton && (
                <div className="flex justify-end w-2/3 gap-4">
                    <button
                        disabled={processing}
                        className="bg-primary hover:bg-blue-700 text-white flex items-center shadow-md transition-all duration-300 hover:shadow-xl px-6 py-3 rounded-lg font-medium text-base"
                    >
                        <i className="ri-save-line mr-2 text-lg"></i>
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
                        <div className="flex items-center mt-2 bg-green-50 px-5 py-3 rounded-lg border border-green-200 shadow-sm">
                            <div className="bg-success p-1.5 rounded-md shadow-md mr-3">
                                <Avatar
                                    size="xs"
                                    bgColor="transparent"
                                    icon={moduleConstants.submit.icon}
                                    className="text-white"
                                />
                            </div>
                            <p className="text-success m-0 font-medium">Saved successfully!</p>
                        </div>
                    </Transition>
                </div>
            )}
        </form>
    )
}
