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

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold tracking-tight">
                    <span className="block text-gray-900 dark:text-white">Create Account</span>
                    <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text dark:from-blue-400 dark:to-indigo-400">
                        SectionCMS
                    </span>
                </h1>
                <p className="mt-3 text-gray-600 dark:text-gray-300">Sign up to get started with Section CMS</p>
            </div>

            <form onSubmit={submit}>
                <div className="form-floating form-floating-outline relative">
                    <InputLabel htmlFor="website" value="Website" required={true} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" />
                    <TextInput
                        id="website"
                        name="website"
                        value={data.website}
                        autoComplete="website"
                        isFocused={true}
                        onChange={(e) => setData('website', e.target.value)}
                        required
                        type={'url'}
                        placeholder={'https://example.com'}
                        className="pl-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white peer w-full"
                    />
                    <InputError message={errors.website} className="mt-2" />
                </div>

                <div className="form-floating form-floating-outline relative mt-6">
                    <InputLabel htmlFor="name" value="Name" required={true} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder={'Your full name'}
                        className="pl-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white peer w-full"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="form-floating form-floating-outline relative mt-6">
                    <InputLabel htmlFor="email" value="Email" required={true} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder={'awesome@awesomeness.com'}
                        className="pl-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white peer w-full"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="form-floating form-floating-outline relative mt-6">
                    <InputLabel htmlFor="password" value="Password" required={true} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder={'my super secret password'}
                        className="pl-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white peer w-full"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="form-floating form-floating-outline relative mt-6">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" required={true} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        placeholder={'Confirm your password'}
                        className="pl-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white peer w-full"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={processing}
                        className="group relative w-full flex justify-center items-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
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
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            ></path>
                        </svg>
                        Register
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-3 text-gray-500 dark:bg-gray-800 dark:text-gray-400">Already have an account?</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center text-sm font-medium text-blue-600 transition duration-150 ease-in-out hover:text-indigo-600 hover:underline focus:outline-none dark:text-blue-400 dark:hover:text-indigo-400"
                        >
                            Sign in to your account
                            <svg
                                className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    )
}
