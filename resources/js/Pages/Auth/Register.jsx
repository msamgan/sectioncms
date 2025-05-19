import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        website: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        })
    }

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                <p className="mt-2 text-sm text-gray-600">Sign up to get started with Section CMS</p>
            </div>

            <form onSubmit={submit}>
                <div className="form-floating form-floating-outline relative">
                    <TextInput
                        id="website"
                        name="website"
                        value={data.website}
                        autoComplete="website"
                        isFocused={true}
                        onChange={(e) => setData('website', e.target.value)}
                        required
                        type={'url'}
                        placeholder={'Website'}
                        className="rounded-md pl-10"
                    />
                    <InputLabel htmlFor="website" value="Website" required={true} />
                    <InputError message={errors.website} className="mt-2" />
                </div>

                <div className="form-floating form-floating-outline relative mt-6">
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder={'Name'}
                        className="rounded-md pl-10"
                    />
                    <InputLabel htmlFor="name" value="Name" required={true} />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="form-floating form-floating-outline relative mt-6">
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder={'Email'}
                        className="rounded-md pl-10"
                    />
                    <InputLabel htmlFor="email" value="Email" required={true} />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="form-floating form-floating-outline relative mt-6">
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder={'Password'}
                        className="rounded-md pl-10"
                    />
                    <InputLabel htmlFor="password" value="Password" required={true} />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="form-floating form-floating-outline relative mt-6">
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        placeholder={'Confirm Password'}
                        className="rounded-md pl-10"
                    />
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" required={true} />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-6">
                    <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                        <svg
                            className="mr-2 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            ></path>
                        </svg>
                        Register
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Already have an account?</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Link
                            href={route('login')}
                            className="text-sm text-primary transition duration-150 ease-in-out hover:text-secondary focus:outline-none"
                        >
                            Sign in to your account
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    )
}
