import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { store } from '@actions/PaymentMethodController.js'
import { usePage } from '@inertiajs/react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'

export default function StripeForm({ clientSecret }) {
    const [loading, setLoading] = useState(false)
    const { auth } = usePage().props

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }

        setLoading(true)

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
                setLoading(false)

                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    console.error(result.error.message)
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
                        .then()
                        .catch((error) => {
                            console.error('Error storing payment method:', error)
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }
            })
            .catch((error) => {
                setLoading(false)
                console.error('Error confirming card setup:', error)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <PrimaryButton className={'w-full mt-4'}>{loading ? 'Processing...' : 'Add Payment Method'}</PrimaryButton>
        </form>
    )
}
