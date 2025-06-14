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
                <div className="p-4 border border-gray-200 rounded-md bg-white transition-all duration-300">
                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-800 mb-1">Card Information</label>
                        <p className="text-xs text-gray-600 mb-3">
                            Enter your card details to securely save your payment method.
                        </p>
                    </div>

                    <div className="mb-6">
                        <div className="card-element-container">
                            <CardElement
                                className="p-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 bg-white"
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
                                            color: '#1f2937',
                                            '::placeholder': {
                                                color: '#9ca3af',
                                                fontWeight: '400',
                                            },
                                            ':-webkit-autofill': {
                                                color: '#1f2937',
                                            },
                                            iconColor: '#3B82F6',
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

                    <div className="flex items-center p-2 bg-blue-50 rounded-md border border-blue-100 text-xs text-blue-700">
                        <i className="ri-lock-line text-[#3B82F6] mr-2 flex-shrink-0"></i>
                        <span>
                            Your payment information is encrypted and secure. We never store your full card details.
                        </span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-3 flex items-start text-xs text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                    <i className="ri-error-warning-line mr-2 flex-shrink-0"></i>
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="mt-3 flex items-start text-xs text-green-600 bg-green-50 p-2 rounded-md border border-green-200">
                    <i className="ri-check-line mr-2 flex-shrink-0"></i>
                    <span>Payment method added successfully!</span>
                </div>
            )}

            <PrimaryButton
                className={
                    'w-full mt-3 text-sm flex items-center justify-center transition-all duration-300'
                }
                disabled={loading}
            >
                {loading ? (
                    <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <i className="ri-add-line mr-2"></i>
                        Add Payment Method
                    </>
                )}
            </PrimaryButton>
        </form>
    )
}
