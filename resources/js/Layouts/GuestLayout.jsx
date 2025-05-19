import ApplicationLogo from '@/Components/ApplicationLogo'
import { Link } from '@inertiajs/react'

export default function Guest({ children }) {
    return (
        <div className="from-blue-50 via-gray-50 to-indigo-50 flex min-h-screen flex-col items-center bg-gradient-to-br pt-6 sm:justify-center sm:pt-0 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-70 blur-3xl dark:from-blue-900/20 dark:to-indigo-900/20"></div>
                <div className="to-pink-100 dark:to-pink-900/20 absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-100 opacity-70 blur-3xl dark:from-purple-900/20"></div>
            </div>

            <div className="relative z-10">
                <Link href="/" className="block transition-transform duration-300 hover:scale-105">
                    <ApplicationLogo className="h-40 w-40 drop-shadow-md" />
                </Link>
            </div>

            <div className="animate-fadeIn relative z-10 mt-8 w-full overflow-hidden border border-gray-100 bg-white/90 px-8 py-6 shadow-xl backdrop-blur-sm sm:max-w-md sm:rounded-xl dark:border-gray-700 dark:bg-gray-800/90 dark:text-white">
                {children}
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    )
}
