import ApplicationLogo from '@/Components/ApplicationLogo'
import { Link } from '@inertiajs/react'

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 pt-6 sm:justify-center sm:pt-0 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-70 blur-3xl dark:from-blue-900/20 dark:to-indigo-900/20"></div>
                <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 opacity-70 blur-3xl dark:from-purple-900/20 dark:to-pink-900/20"></div>
            </div>

            <div className="relative z-10">
                <Link href="/" className="block transition-transform duration-300 hover:scale-105">
                    <ApplicationLogo className="h-40 w-40 drop-shadow-md" />
                </Link>
            </div>

            <div className="relative z-10 mt-8 w-full overflow-hidden bg-white/90 px-8 py-6 shadow-xl backdrop-blur-sm sm:max-w-md sm:rounded-xl border border-gray-100 dark:bg-gray-800/90 dark:border-gray-700 dark:text-white animate-fadeIn">
                {children}
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    )
}
