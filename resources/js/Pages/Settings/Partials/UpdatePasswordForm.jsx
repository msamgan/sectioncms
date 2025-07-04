import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { useRef } from 'react'

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef()
    const currentPasswordInput = useRef()

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const updatePassword = (e) => {
        e.preventDefault()

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation')
                    passwordInput.current.focus()
                }

                if (errors.current_password) {
                    reset('current_password')
                    currentPasswordInput.current.focus()
                }
            },
        })
    }

    return (
        <form onSubmit={updatePassword} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg">
                <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-6 py-4">
                    <div className="flex items-center">
                        <Avatar size="sm" bgColor="bg-blue-500" icon="ri-lock-line" />
                        <h5 className="ml-3 text-lg font-semibold text-gray-800 dark:text-gray-200">Update Password</h5>
                    </div>
                </div>
                <div className="p-6 dark:text-gray-300">
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Ensure your account is using a long, random password to stay secure.
                    </p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <InputLabel htmlFor="current_password" required={true}>
                                Current Password
                            </InputLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-lock-line text-gray-500 dark:text-gray-400"></i>
                                </div>
                                <TextInput
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    type="password"
                                    autoComplete="current-password"
                                    className="w-full pl-10"
                                />
                            </div>
                            <InputError message={errors.current_password} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <InputLabel htmlFor="password" required={true}>
                                New Password
                            </InputLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-lock-password-line text-gray-500 dark:text-gray-400"></i>
                                </div>
                                <TextInput
                                    id="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    type="password"
                                    autoComplete="new-password"
                                    className="w-full pl-10"
                                />
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <InputLabel htmlFor="password_confirmation" required={true}>
                                Confirm Password
                            </InputLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-checkbox-circle-line text-gray-500 dark:text-gray-400"></i>
                                </div>
                                <TextInput
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    type="password"
                                    autoComplete="new-password"
                                    className="w-full pl-10"
                                />
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center gap-5">
                <button
                    disabled={processing}
                    className="inline-flex items-center px-5 py-3 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-secondary focus:bg-primary-dark active:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 shadow-sm hover:shadow-md disabled:opacity-25"
                >
                    <i className="ri-save-line mr-3"></i>
                    Save Changes
                </button>
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Saved successfully!</p>
                </Transition>
            </div>
        </form>
    )
}
