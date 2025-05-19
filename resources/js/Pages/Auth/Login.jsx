import Checkbox from '@/Components/Checkbox'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('login'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
                <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
            </div>

            <form onSubmit={submit}>
                <div className="form-floating form-floating-outline relative">
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder={'Email'}
                        className="pl-10"
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
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder={'Password'}
                        className="pl-10"
                    />
                    <InputLabel htmlFor="password" value="Password" required={true} />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-primary transition duration-150 ease-in-out hover:text-secondary focus:outline-none"
                        >
                            Forgot your password?
                        </Link>
                    )}
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
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            ></path>
                        </svg>
                        Log in
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Don't have an account?</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Link
                            href={route('register')}
                            className="text-sm text-primary transition duration-150 ease-in-out hover:text-secondary focus:outline-none"
                        >
                            Create an account
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    )
}
