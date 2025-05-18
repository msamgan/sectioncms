import { Head, Link } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo'

export default function Public({ auth, children }) {
    return (
        <>
            <Head title="Dynamic Content Management System" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-blue-500 selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <ApplicationLogo className="h-32 w-auto" />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end gap-3">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="ring-transparent rounded-md px-3 py-2 text-black ring-1 transition hover:text-black/70 focus:outline-none focus-visible:ring-blue-500 dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="ring-transparent rounded-md px-3 py-2 text-black ring-1 transition hover:text-black/70 focus:outline-none focus-visible:ring-blue-500 dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="ring-transparent rounded-md px-3 py-2 text-black ring-1 transition hover:text-black/70 focus:outline-none focus-visible:ring-blue-500 dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            {children}
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            SectionCMS - Built with Laravel and React
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}
