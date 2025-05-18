import { Link } from '@inertiajs/react'

export default function PublicNavigation({ auth }) {
    return (
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
    )
}
