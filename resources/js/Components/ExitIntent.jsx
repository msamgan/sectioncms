import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function ExitIntent() {
    const [isVisible, setIsVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            document.addEventListener('mouseleave', handleMouseLeave)
        }, 10000)

        return () => {
            clearTimeout(timer)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    const handleMouseLeave = (e) => {
        if (e.clientY <= 0) {
            const hasSeenPopup = sessionStorage.getItem('exitIntentShown')

            if (!hasSeenPopup) {
                setIsVisible(true)
                sessionStorage.setItem('exitIntentShown', 'true')

                // Remove the event listener after showing once
                document.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }

    const handleClose = () => {
        setIsVisible(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Simple email validation
        if (!email || !email.includes('@') || !email.includes('.')) {
            setError('Please enter a valid email address')
            return
        }

        // In a real app, you would send this to your backend
        console.log('Submitted email:', email)

        // Show success message
        setIsSubmitted(true)
        setError('')

        // Close popup after 3 seconds
        setTimeout(() => {
            setIsVisible(false)
        }, 3000)
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Colored top bar */}
                <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                <div className="p-6">
                    {!isSubmitted ? (
                        <>
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                    <svg
                                        className="h-8 w-8 text-blue-600 dark:text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    Wait! Don't miss out
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Sign up now and get{' '}
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">30% off</span> your
                                    first 3 months of SectionCMS.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                    {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Get My Discount
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    By signing up, you agree to our{' '}
                                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                                        Terms
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="py-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                <svg
                                    className="h-8 w-8 text-green-600 dark:text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Thank You!</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">
                                Your discount code has been sent to your email.
                            </p>
                            <Link
                                href={route('register')}
                                className="border-transparent inline-flex items-center justify-center rounded-md border bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Create Your Account Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
