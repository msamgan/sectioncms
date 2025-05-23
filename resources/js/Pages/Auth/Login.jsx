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

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold tracking-tight">
                    <span className="block text-gray-900 dark:text-white">Welcome Back!</span>
                    <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text dark:from-blue-400 dark:to-indigo-400">
                        SectionCMS
                    </span>
                </h1>
                <p className="mt-3 text-gray-600 dark:text-gray-300">Sign in to your account to continue</p>
            </div>

            <form onSubmit={submit}>
                <div className="form-floating form-floating-outline relative">
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        required={true}
                        className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-800 dark:text-gray-300 peer-focus:dark:text-blue-500"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder={'awesome@awesomeness.com'}
                        className="peer w-full rounded-lg border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20 dark:border-gray-500 dark:bg-gray-700 dark:text-white"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="form-floating form-floating-outline relative mt-6">
                    <InputLabel
                        htmlFor="password"
                        value="Password"
                        required={true}
                        className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-800 dark:text-gray-300 peer-focus:dark:text-blue-500"
                    />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder={'my super secret password'}
                        className="peer w-full rounded-lg border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20 dark:border-gray-500 dark:bg-gray-700 dark:text-white"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="text-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-blue-600 transition duration-150 ease-in-out hover:text-indigo-600 hover:underline focus:outline-none dark:text-blue-400 dark:hover:text-indigo-400"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={processing}
                        className="group relative flex w-full transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                    >
                        <svg
                            className="mr-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-12"
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
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-3 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                Don't have an account?
                            </span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link
                            href={route('register')}
                            className="inline-flex items-center text-sm font-medium text-blue-600 transition duration-150 ease-in-out hover:text-indigo-600 hover:underline focus:outline-none dark:text-blue-400 dark:hover:text-indigo-400"
                        >
                            Create an account
                            <svg
                                className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    )
}
