import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Avatar from '@/Components/helpers/Avatar.jsx'
import { Transition } from '@headlessui/react'
import { Link, useForm, usePage } from '@inertiajs/react'

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    })

    const submit = (e) => {
        e.preventDefault()

        patch(route('profile.update'))
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex items-center">
                        <Avatar size="sm" bgColor="bg-blue-500" icon="ri-user-line" />
                        <h5 className="ml-3 text-lg font-semibold text-gray-800">Profile Information</h5>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <InputLabel htmlFor="name" required={true}>
                                Name
                            </InputLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-user-line text-gray-500"></i>
                                </div>
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="name"
                                    className="w-full pl-10"
                                />
                            </div>
                            <InputError className="mt-1" message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="email" required={true}>
                                Email
                            </InputLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-mail-line text-gray-500"></i>
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                    className="w-full pl-10"
                                />
                            </div>
                            <InputError className="mt-1" message={errors.email} />
                        </div>
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-800">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}
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
                    <p className="text-sm text-green-600 font-medium">Saved successfully!</p>
                </Transition>
            </div>
        </form>
    )
}
