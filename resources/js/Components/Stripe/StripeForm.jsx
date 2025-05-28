import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { store } from '@actions/PaymentMethodController.js'
import { usePage } from '@inertiajs/react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'

export default function StripeForm({ clientSecret, onSuccess }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    // Auto-hide error and success messages after 2 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                if (error) setError(null)
                if (success) setSuccess(false)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [error, success])
    const { auth } = usePage().props

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }

        setLoading(true)
        setError(null)
        setSuccess(false)

        stripe
            .confirmCardSetup(clientSecret, {
                payment_method: {
                    card: elements.getElement('card'),
                    billing_details: {
                        name: auth.user.name,
                        email: auth.user.email,
                    },
                },
            })
            .then((result) => {
                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    setError(result.error.message)
                    setLoading(false)
                } else {
                    // The setup has succeeded. You can now use the payment method.
                    store
                        .call({
                            data: {
                                payment_method: result.setupIntent.payment_method,
                                is_default: true,
                            },
                        })
                        .then(() => {
                            // Clear the card element
                            elements.getElement('card').clear()
                            setSuccess(true)

                            // Call the onSuccess callback if provided
                            if (onSuccess && typeof onSuccess === 'function') {
                                onSuccess()
                            }
                        })
                        .catch((error) => {
                            setError(error.message || 'Failed to store payment method')
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }
            })
            .catch((error) => {
                setLoading(false)
                setError(error.message || 'An unexpected error occurred')
            })
    }

    const cardBrands = [
        { name: 'visa', src: 'https://cdn.jsdelivr.net/npm/payment-icons@1.0.0/min/flat/visa.svg' },
        { name: 'mastercard', src: 'https://cdn.jsdelivr.net/npm/payment-icons@1.0.0/min/flat/mastercard.svg' },
        { name: 'amex', src: 'https://cdn.jsdelivr.net/npm/payment-icons@1.0.0/min/flat/amex.svg' },
        { name: 'discover', src: 'https://cdn.jsdelivr.net/npm/payment-icons@1.0.0/min/flat/discover.svg' },
    ]

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
                <div className="p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="mb-5">
                        <label className="block text-lg font-semibold text-gray-800 mb-2">Card Information</label>
                        <p className="text-sm text-gray-600 mb-4">
                            Enter your card details to securely save your payment method.
                        </p>
                    </div>

                    <div className="mb-6">
                        <div className="card-element-container">
                            <CardElement
                                className="p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
                                            color: '#1f2937',
                                            '::placeholder': {
                                                color: '#9ca3af',
                                                fontWeight: '400',
                                            },
                                            ':-webkit-autofill': {
                                                color: '#1f2937',
                                            },
                                            iconColor: '#6366f1',
                                        },
                                        invalid: {
                                            color: '#ef4444',
                                            iconColor: '#ef4444',
                                        },
                                    },
                                    hidePostalCode: true,
                                }}
                            />
                        </div>
                        <div className="flex justify-end items-center mt-2">
                            <div className="flex space-x-2">
                                {cardBrands.map((brand) => (
                                    <img
                                        key={brand.name}
                                        src={brand.src}
                                        alt={brand.name}
                                        className="h-6 w-auto"
                                        title={brand.name.charAt(0).toUpperCase() + brand.name.slice(1)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center p-3 bg-blue-50 rounded-md border border-blue-100 text-sm text-blue-700">
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
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        <span>
                            Your payment information is encrypted and secure. We never store your full card details.
                        </span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 flex items-start text-sm text-red-600 bg-red-50 p-4 rounded-md border border-red-200 shadow-sm">
                    <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="font-medium">{error}</span>
                </div>
            )}

            {success && (
                <div className="mt-4 flex items-start text-sm text-green-600 bg-green-50 p-4 rounded-md border border-green-200 shadow-sm">
                    <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Payment method added successfully!</span>
                </div>
            )}

            <PrimaryButton
                className={
                    'w-full mt-5 py-3.5 text-base font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300'
                }
                disabled={loading}
            >
                {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        Add Payment Method
                    </>
                )}
            </PrimaryButton>
        </form>
    )
}
