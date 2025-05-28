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
        <form onSubmit={handleSubmit}>
            <div className="p-4 border rounded-md bg-gray-50">
                <CardElement
                    className="p-2"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}

            <PrimaryButton className={'w-full mt-4'} disabled={loading}>
                {loading ? 'Processing...' : 'Add Payment Method'}
            </PrimaryButton>
        </form>
    )
}
