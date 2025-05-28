import PageHeader from '@/Components/PageHeader.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import FullPage from '@/Layouts/FullPage.jsx'
import { moduleConstants } from '@/Utils/constants.js'
// import { paymentMethods as _paymentMethods, destroy, store, updateDefault } from '@actions/PaymentMethodController.js'
import { Head } from '@inertiajs/react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import StripeForm from '@/Components/Stripe/StripeForm.jsx'

export default function Index({ publishableKey, clientSecret }) {
    const [stripePromise, setStripePromise] = useState(null)

    useEffect(() => {
        const loadStripeData = async () => {
            setStripePromise(await loadStripe(publishableKey))
        }

        loadStripeData().then()
    }, [])

    return (
        <FullPage>
            <Head title="Payment Methods"></Head>

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="flex items-center">
                            <Avatar size="sm" bgColor={moduleConstants.section.bgColor} icon="credit-card" />
                            <span>Payment Methods</span>
                        </div>
                    }
                    subtitle={'Manage your payment methods and set your default payment method.'}
                    action={''}
                ></PageHeader>
            </div>

            <div className="w-full">
                <div className="bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-center p-4 border-b bg-gray-50">
                        <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon="credit-card" />
                        <h5 className="m-0 ml-2 text-lg font-semibold">Your Cards</h5>
                    </div>
                    <div className="p-6">
                        <div className="text-center py-8">
                            <div className="text-gray-400 mb-2">
                                <svg
                                    className="mx-auto h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
                            <p className="mt-1 text-sm text-gray-500 mb-12">
                                Get started by adding a new payment method.
                            </p>
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <StripeForm clientSecret={clientSecret} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </FullPage>
    )
}
