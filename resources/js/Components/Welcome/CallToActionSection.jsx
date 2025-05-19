import { Link } from '@inertiajs/react'
import CtaButton from '@/Components/CtaButton'

export default function CallToActionSection({ auth }) {
    return (
        <div className="mb-8 mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl dark:from-blue-800 dark:to-indigo-900">
            <div className="relative px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14 16H9v-2h5V9h2v5h5v2h-5v5h-2v-5zm-3 9h2v2H7v-2h4zm8 0h2v2h-2v-2zm-8 6h2v2H7v-2h4zm8 0h2v2h-2v-2zm-8 6h2v2H7v-2h4zm8 0h2v2h-2v-2z"
                            fill="white"
                            fillRule="evenodd"
                        />
                    </svg>
                </div>

                <div className="relative flex flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
                    <div className="max-w-xl">
                        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                            Ready to transform your content management?
                        </h2>
                        <p className="mt-3 text-lg text-blue-100">
                            Start building dynamic, structured content with SectionCMS today. No credit card required.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <CtaButton
                            href={auth.user ? route('dashboard') : route('register')}
                            size="lg"
                            pulse={!auth.user}
                            highContrast={true}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            }
                        >
                            {auth.user ? 'Go to Dashboard' : 'Get Started for Free'}
                        </CtaButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
