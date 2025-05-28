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
    const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notification, setNotification] = useState(null)

    // Auto-hide notifications after 2 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [notification])
    const fetchPaymentMethods = async () => {
        setLoading(true)
        try {
            const response = await _paymentMethods.data({})
            setPaymentMethods(response.payment_methods)
            setDefaultPaymentMethod(response.default_payment_method)
        } catch (error) {
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
            fetchPaymentMethods().then()
        } catch (error) {
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
        fetchPaymentMethods().then()
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

            <div className="mb-8">
                <PageHeader
                    title={
                        <div className="flex items-center">
                            <Avatar size="sm" bgColor={moduleConstants.section.bgColor} icon="ri-bank-card-line" />
                            <span className="text-2xl font-bold text-gray-900">Payment Methods</span>
                        </div>
                    }
                    subtitle={
                        <span className="text-gray-600 text-lg">
                            Manage your payment methods and set your preferred default payment option.
                        </span>
                    }
                    action={''}
                ></PageHeader>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Methods List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="flex items-center p-6 border-b bg-gradient-to-r from-indigo-50 to-blue-50">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>
                            </div>
                            <h5 className="m-0 text-xl font-bold text-gray-800">Your Payment Methods</h5>
                        </div>
                        <div className="p-6">
                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="animate-pulse">
                                        <div className="mx-auto h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <svg
                                                className="h-7 w-7 text-indigo-500"
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
                                        <p className="mt-4 text-base font-medium text-gray-600">
                                            Loading payment methods...
                                        </p>
                                    </div>
                                </div>
                            ) : paymentMethods.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <div className="text-indigo-400 mb-4">
                                        <svg
                                            className="mx-auto h-20 w-20"
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
                                    <h3 className="mt-2 text-lg font-semibold text-gray-900">
                                        No payment methods found
                                    </h3>
                                    <p className="mt-3 text-base text-gray-600 max-w-md mx-auto mb-6">
                                        Add your first payment method to start making secure payments for your
                                        subscriptions and services.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-5 mb-6">
                                    {paymentMethods.map((method) => {
                                        const isDefault = method.id === defaultPaymentMethod.id
                                        const cardBrandIcon = `https://cdn.jsdelivr.net/npm/payment-icons@1.0.0/min/flat/${method.card.brand}.svg`

                                        return (
                                            <div
                                                key={method.id}
                                                className={`border rounded-xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 transition-all duration-300 ${
                                                    isDefault
                                                        ? 'border-green-400 bg-green-50 shadow-md'
                                                        : 'hover:border-indigo-200 hover:shadow-md'
                                                }`}
                                            >
                                                <div className="flex items-center">
                                                    <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-white border border-gray-200 p-1">
                                                        {['visa', 'mastercard', 'amex', 'discover'].includes(
                                                            method.card.brand,
                                                        ) ? (
                                                            <img
                                                                src={cardBrandIcon}
                                                                alt={method.card.brand}
                                                                className="h-8 w-auto"
                                                            />
                                                        ) : (
                                                            <svg
                                                                className="h-6 w-6 text-gray-600"
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
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="flex items-center">
                                                            <p className="text-base font-semibold text-gray-800">
                                                                {method.card.brand.charAt(0).toUpperCase() +
                                                                    method.card.brand.slice(1)}{' '}
                                                                •••• {method.card.last4}
                                                            </p>
                                                            {isDefault && (
                                                                <span className="inline-flex items-center ml-3 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
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
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Expires{' '}
                                                            {method.card.exp_month < 10
                                                                ? '0' + method.card.exp_month
                                                                : method.card.exp_month}
                                                            /{method.card.exp_year}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-3 md:ml-auto">
                                                    {!isDefault && (
                                                        <button
                                                            onClick={() => handleSetAsDefault(method.id)}
                                                            className="text-sm px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200 font-medium flex items-center shadow-sm"
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
                                                    {canDeletePaymentMethod(method) && !isDefault ? (
                                                        <DeleteEntityForm
                                                            action={destroy.route({ payment_method: method.id })}
                                                            refresh={fetchPaymentMethods}
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Add Payment Method Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full">
                        <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-blue-600">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-indigo-600 mr-3">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white">Add Payment Method</h3>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-6">
                                <p className="text-gray-700 mb-4">
                                    Add a new payment method to your account for seamless transactions and subscription
                                    management.
                                </p>
                                <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-700 mb-6">
                                    <svg
                                        className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0"
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
                                    <span>Your card information is securely processed by Stripe.</span>
                                </div>
                            </div>
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
