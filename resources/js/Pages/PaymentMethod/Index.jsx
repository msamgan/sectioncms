import PageHeader from '@/Components/PageHeader.jsx'
import StripeForm from '@/Components/Stripe/StripeForm.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import FullPage from '@/Layouts/FullPage.jsx'
import { moduleConstants } from '@/Utils/constants.js'
import { paymentMethods as _paymentMethods, destroy } from '@actions/PaymentMethodController.js'
import { Head } from '@inertiajs/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

export default function Index({ publishableKey, clientSecret }) {
    const [stripePromise, setStripePromise] = useState(null)
    const [paymentMethods, setPaymentMethods] = useState([])
    const [loading, setLoading] = useState(true)
    const [notification, setNotification] = useState(null)

    const fetchPaymentMethods = async () => {
        setLoading(true)
        try {
            const response = await _paymentMethods.data({})
            setPaymentMethods(response)
        } catch (error) {
            console.error('Error fetching payment methods:', error)
            setNotification({
                type: 'error',
                message: 'Failed to load payment methods',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDeletePaymentMethod = async (paymentMethodId) => {
        // Check if this is the last payment method
        if (paymentMethods.length <= 1) {
            setNotification({
                type: 'error',
                message: 'Cannot delete the last payment method',
            })
            return
        }

        try {
            await destroy.call({
                data: {
                    payment_method: paymentMethodId,
                },
            })

            setNotification({
                type: 'success',
                message: 'Payment method deleted successfully',
            })

            // Refresh payment methods
            fetchPaymentMethods()
        } catch (error) {
            console.error('Error deleting payment method:', error)
            setNotification({
                type: 'error',
                message: error.message || 'Failed to delete payment method',
            })
        }
    }

    useEffect(() => {
        const loadStripeData = async () => {
            setStripePromise(await loadStripe(publishableKey))
        }

        loadStripeData().then()
        fetchPaymentMethods()
    }, [])

    return (
        <FullPage>
            <Head title="Payment Methods"></Head>

            {notification && (
                <div
                    className={`mb-4 p-4 rounded-md ${notification.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}
                >
                    {notification.message}
                </div>
            )}

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
                        {loading ? (
                            <div className="text-center py-8">
                                <p>Loading payment methods...</p>
                            </div>
                        ) : paymentMethods.length === 0 ? (
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
                            </div>
                        ) : (
                            <div className="space-y-4 mb-8">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        className="border rounded-md p-4 flex justify-between items-center"
                                    >
                                        <div>
                                            <div className="flex items-center">
                                                <svg
                                                    className="h-8 w-8 text-gray-400"
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
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {method.card.brand.charAt(0).toUpperCase() +
                                                            method.card.brand.slice(1)}{' '}
                                                        ending in {method.card.last4}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Expires {method.card.exp_month}/{method.card.exp_year}
                                                    </p>
                                                </div>
                                            </div>
                                            {method.isDefault && (
                                                <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDeletePaymentMethod(method.id)}
                                            disabled={method.isDefault || paymentMethods.length <= 1}
                                            className={`text-sm px-3 py-1 rounded-md ${
                                                method.isDefault || paymentMethods.length <= 1
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                                            }`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-6 border-t pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Add a new payment method</h3>
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <StripeForm clientSecret={clientSecret} onSuccess={fetchPaymentMethods} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </FullPage>
    )
}
