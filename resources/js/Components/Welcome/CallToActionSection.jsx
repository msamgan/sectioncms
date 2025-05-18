import { Link } from '@inertiajs/react'

export default function CallToActionSection({ auth }) {
    return (
        <div className="mt-12 text-center">
            <Link
                href={auth.user ? route('dashboard') : route('register')}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {auth.user ? 'Go to Dashboard' : 'Get Started'}
            </Link>
        </div>
    )
}
