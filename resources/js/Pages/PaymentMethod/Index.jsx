import PageHeader from '@/Components/PageHeader.jsx'
import StripeForm from '@/Components/Stripe/StripeForm.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import DeleteEntityForm from '@/Components/layout/DeleteEntityForm.jsx'
import FullPage from '@/Layouts/FullPage.jsx'
import { moduleConstants } from '@/Utils/constants.js'
import { paymentMethods as _paymentMethods, destroy, updateDefault } from '@actions/PaymentMethodController.js'
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

    const handleSetAsDefault = async (paymentMethodId) => {
        try {
            await updateDefault.call({
                data: {
                    payment_method: paymentMethodId,
                },
            })

            setNotification({
                type: 'success',
                message: 'Default payment method updated successfully',
            })

            // Refresh payment methods
            fetchPaymentMethods()
        } catch (error) {
            console.error('Error updating default payment method:', error)
            setNotification({
                type: 'error',
                message: error.message || 'Failed to update default payment method',
            })
        }
    }

    const canDeletePaymentMethod = (method) => {
        // Cannot delete if this is the last payment method
        if (paymentMethods.length <= 1) {
            return false
        }

        // Cannot delete if this is the default payment method
        if (method.isDefault) {
            return false
        }

        return true
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
                    className={`mb-6 p-4 rounded-lg border shadow-sm flex items-start ${
                        notification.type === 'error'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-green-50 text-green-700 border-green-200'
                    }`}
                >
                    <div className="flex-shrink-0">
                        {notification.type === 'error' ? (
                            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5 text-green-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">{notification.message}</p>
                    </div>
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
                <div className="bg-white rounded-lg shadow-md transition-all duration-200 hover:shadow-xl border border-gray-100">
                    <div className="flex items-center p-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                        <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon="credit-card" />
                        <h5 className="m-0 ml-3 text-xl font-semibold text-gray-800">Your Payment Methods</h5>
                    </div>
                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-10">
                                <div className="animate-pulse">
                                    <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg
                                            className="h-6 w-6 text-blue-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </div>
                                    <p className="mt-3 text-sm font-medium text-gray-600">Loading payment methods...</p>
                                </div>
                            </div>
                        ) : paymentMethods.length === 0 ? (
                            <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                <div className="text-blue-400 mb-3">
                                    <svg
                                        className="mx-auto h-16 w-16"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mt-2 text-base font-medium text-gray-900">No payment methods found</h3>
                                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto mb-6">
                                    Add your first payment method below to start making payments securely.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4 mb-8">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        className={`border rounded-lg p-5 flex justify-between items-center transition-all duration-200 hover:shadow-sm ${
                                            method.isDefault ? 'border-green-400 bg-green-50' : 'hover:border-blue-200'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center">
                                                {/* Card brand icon - using a more specific icon based on the card brand if possible */}
                                                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                                                    <svg
                                                        className="h-6 w-6"
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
                                                <div className="ml-4">
                                                    <p className="text-base font-medium text-gray-800">
                                                        {method.card.brand.charAt(0).toUpperCase() +
                                                            method.card.brand.slice(1)}{' '}
                                                        •••• {method.card.last4}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Expires{' '}
                                                        {method.card.exp_month < 10
                                                            ? '0' + method.card.exp_month
                                                            : method.card.exp_month}
                                                        /{method.card.exp_year}
                                                    </p>
                                                </div>
                                            </div>
                                            {method.isDefault && (
                                                <span className="inline-flex items-center mt-3 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                    <svg
                                                        className="w-3.5 h-3.5 mr-1"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex space-x-3">
                                            {!method.isDefault && (
                                                <button
                                                    onClick={() => handleSetAsDefault(method.id)}
                                                    className="text-sm px-4 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200 font-medium flex items-center"
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-1.5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    Set Default
                                                </button>
                                            )}
                                            {canDeletePaymentMethod(method) ? (
                                                <DeleteEntityForm
                                                    action={destroy.route({ payment_method: method.id })}
                                                    refresh={fetchPaymentMethods}
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 border-t pt-8">
                            <div className="flex items-center mb-6">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Add a new payment method</h3>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 mb-4">
                                <div className="flex items-start mb-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg
                                            className="h-5 w-5 text-blue-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-blue-700">
                                            Your card information is securely processed by Stripe. We never store your
                                            full card details on our servers.
                                        </p>
                                    </div>
                                </div>
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <StripeForm clientSecret={clientSecret} onSuccess={fetchPaymentMethods} />
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FullPage>
    )
}
