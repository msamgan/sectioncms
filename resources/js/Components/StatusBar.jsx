import DisplayMessage from '@/Components/DisplayMessage.jsx'
import { paymentMethods as _paymentMethods } from '@actions/PaymentMethodController.js'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function StatusBar() {
    const [hasPaymentMethods, setHasPaymentMethods] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkPaymentMethods = async () => {
            setLoading(true)
            try {
                const response = await _paymentMethods.data({})
                setHasPaymentMethods(response.payment_methods.length > 0)
            } catch (error) {
                console.error('Failed to check payment methods:', error)
                setHasPaymentMethods(true)
            } finally {
                setLoading(false)
            }
        }

        checkPaymentMethods().then()
    }, [])

    if (loading || hasPaymentMethods) {
        return null
    }

    return (
        <div className="px-4 md:px-6 py-2">
            <DisplayMessage
                text={
                    <span>
                        You don't have any payment methods set up.
                        <Link
                            href={route('payment-methods.index')}
                            className="ml-2 font-medium text-primary hover:text-primary/80 underline"
                        >
                            Add a payment method
                        </Link>
                    </span>
                }
                type="warning"
            />
        </div>
    )
}
