import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { store } from '@actions/PaymentMethodController.js'
import { usePage } from '@inertiajs/react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'

export default function StripeForm({ clientSecret, onSuccess }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
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
                    console.error(result.error.message)
                    setError(result.error.message)
                    setLoading(false)
                } else {
                    // The setup has succeeded. You can now use the payment method.
                    console.log('Payment method added successfully:', result.setupIntent.payment_method)
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

                            // Call the onSuccess callback if provided
                            if (onSuccess && typeof onSuccess === 'function') {
                                onSuccess()
                            }
                        })
                        .catch((error) => {
                            console.error('Error storing payment method:', error)
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
                console.error('Error confirming card setup:', error)
            })
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
                <div className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
                    <CardElement
                        className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                                },
                                invalid: {
                                    color: '#ef4444',
                                    iconColor: '#ef4444',
                                },
                            },
                            hidePostalCode: true,
                        }}
                    />
                    <div className="mt-4 flex items-center text-xs text-gray-500">
                        <svg
                            className="h-4 w-4 mr-1.5 text-gray-400"
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
                        Your payment information is encrypted and secure
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-3 flex items-start text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                    <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            <PrimaryButton className={'w-full mt-4 py-3 text-base flex items-center justify-center'} disabled={loading}>
                {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
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
                        Processing...
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
