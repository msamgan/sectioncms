import { useState, useEffect } from 'react'
import { Head } from '@inertiajs/react'
import FullPage from '@/Layouts/FullPage.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import { moduleConstants } from '@/Utils/constants.js'
import { paymentMethods as _paymentMethods, destroy, updateDefault, store } from '@actions/PaymentMethodController.js'
import { useForm } from '@inertiajs/react'

export default function Index({ intent }) {
    const [paymentMethods, setPaymentMethods] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAddCardForm, setShowAddCardForm] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        payment_method: '',
    })

    const getPaymentMethods = async () => {
        try {
            const methods = await _paymentMethods.data({})
            setPaymentMethods(methods)
        } catch (error) {
            console.error('Error fetching payment methods:', error)
            // toast.error('Failed to load payment methods')
        } finally {
            setLoading(false)
        }
    }

    const handleSetDefault = async (paymentMethodId) => {
        try {
            await updateDefault.data({ payment_method: paymentMethodId })
            // toast.success('Default payment method updated')
            getPaymentMethods()
        } catch (error) {
            console.error('Error updating default payment method:', error)
            // toast.error('Failed to update default payment method')
        }
    }

    const handleDelete = async (paymentMethodId) => {
        try {
            await destroy.data({ payment_method: paymentMethodId })
            // toast.success('Payment method deleted')
            getPaymentMethods()
        } catch (error) {
            console.error('Error deleting payment method:', error)
            // toast.error(error.response?.data?.message || 'Failed to delete payment method')
        }
    }

    const handleAddCard = async (e) => {
        e.preventDefault()

        if (!data.payment_method) {
            // toast.error('Please provide a valid payment method')
            return
        }

        try {
            await store.data(data)
            // toast.success('Payment method added successfully')
            reset()
            setShowAddCardForm(false)
            getPaymentMethods()
        } catch (error) {
            console.error('Error adding payment method:', error)
            // toast.error('Failed to add payment method')
        }
    }

    // Setup Stripe Elements
    const setupStripe = () => {
        if (!window.Stripe) {
            console.error('Stripe.js not loaded')
            return
        }

        const stripe = window.Stripe(process.env.MIX_STRIPE_KEY)
        const elements = stripe.elements()

        const cardElement = elements.create('card', {
            style: {
                base: {
                    color: '#32325d',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            }
        })

        cardElement.mount('#card-element')

        // Handle form submission
        const cardForm = document.getElementById('payment-form')
        cardForm.addEventListener('submit', async (event) => {
            event.preventDefault()

            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            })

            if (error) {
                const errorElement = document.getElementById('card-errors')
                errorElement.textContent = error.message
            } else {
                setData('payment_method', paymentMethod.id)
                handleAddCard(event)
            }
        })
    }

    useEffect(() => {
        getPaymentMethods()
    }, [])

    useEffect(() => {
        if (showAddCardForm) {
            // Load Stripe.js asynchronously
            const stripeScript = document.createElement('script')
            stripeScript.src = 'https://js.stripe.com/v3/'
            stripeScript.async = true
            stripeScript.onload = setupStripe
            document.body.appendChild(stripeScript)

            return () => {
                document.body.removeChild(stripeScript)
            }
        }
    }, [showAddCardForm])

    const formatCardDetails = (method) => {
        return {
            brand: method.card.brand,
            last4: method.card.last4,
            expMonth: method.card.exp_month,
            expYear: method.card.exp_year,
        }
    }

    return (
        <FullPage>
            <Head title="Payment Methods" ></Head>

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="flex items-center">
                            <Avatar
                                size="sm"
                                bgColor={moduleConstants.section.bgColor}
                                icon="credit-card"
                            />
                            <span>Payment Methods</span>
                        </div>
                    }
                    subtitle={"Manage your payment methods and set your default payment method."}
                    action={''}
                ></PageHeader>
            </div>

            <div className="w-full">
                <input id="card-holder-name" type="text" />
                <div id="card-element"></div>

                <button id="card-button" data-secret="{{ $intent->client_secret }}">
                    Update Payment Method
                </button>

                <div className="bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-center p-4 border-b bg-gray-50">
                        <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon="credit-card" />
                        <h5 className="m-0 ml-2 text-lg font-semibold">Your Cards</h5>
                    </div>
                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-4">
                                <div
                                    className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                <p className="mt-2 text-gray-500">Loading payment methods...</p>
                            </div>
                        ) : paymentMethods.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-gray-400 mb-2">
                                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
                                <p className="mt-1 text-sm text-gray-500">Get started by adding a new payment
                                    method.</p>
                                <div className="mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddCardForm(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                  clipRule="evenodd" />
                                        </svg>
                                        Add Card
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {paymentMethods.map((method) => {
                                    const card = formatCardDetails(method)
                                    return (
                                        <div key={method.id}
                                             className={`border rounded-lg p-4 ${method.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center">
                                                    <div className="mr-3">
                                                        {card.brand === 'visa' && (
                                                            <svg className="h-8 w-8" viewBox="0 0 32 32"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <rect fill="#1A1F71" width="32" height="32" rx="4" />
                                                                <path
                                                                    d="M13.1 12.6L10 19.4H7.8L6.3 14.1C6.2 13.6 6 13.4 5.6 13.2C4.9 12.9 3.8 12.6 3 12.5L3 12.2H6.8C7.3 12.2 7.8 12.5 7.9 13.1L8.7 17.4L10.6 12.2H13.1V12.6ZM24 19.4H21.7L23.2 12.2H25.5L24 19.4ZM19.1 12.2L17.6 17.1L17.4 16.2L16.4 13.1C16.3 12.5 15.9 12.2 15.4 12.2H12.7L12.7 12.5C13.5 12.7 14.3 13 14.8 13.3L16.7 19.4H19.2L22 12.2H19.1Z"
                                                                    fill="white" />
                                                            </svg>
                                                        )}
                                                        {card.brand === 'mastercard' && (
                                                            <svg className="h-8 w-8" viewBox="0 0 32 32"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <rect fill="#000000" width="32" height="32" rx="4" />
                                                                <circle cx="12" cy="16" r="6" fill="#EB001B" />
                                                                <circle cx="20" cy="16" r="6" fill="#F79E1B" />
                                                                <path
                                                                    d="M16 20.5C17.8075 19.0053 19 16.6543 19 14C19 11.3457 17.8075 8.99474 16 7.5C14.1925 8.99474 13 11.3457 13 14C13 16.6543 14.1925 19.0053 16 20.5Z"
                                                                    fill="#FF5F00" />
                                                            </svg>
                                                        )}
                                                        {card.brand === 'amex' && (
                                                            <svg className="h-8 w-8" viewBox="0 0 32 32"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <rect fill="#006FCF" width="32" height="32" rx="4" />
                                                                <path
                                                                    d="M4.5 16.5L6.5 12.5H9L10.5 15L12 12.5H14.5L12.5 16.5L14.5 20.5H12L10.5 18L9 20.5H6.5L8.5 16.5H4.5ZM15 12.5H20.5L21.5 14H23L24 12.5H27.5L25 16.5L27.5 20.5H24L23 19H21.5L20.5 20.5H15V12.5ZM17.5 14V15.5H19.5V17H17.5V18.5H20L21 17H22.5L21 15.5L22.5 14H21L20 12.5H17.5V14Z"
                                                                    fill="white" />
                                                            </svg>
                                                        )}
                                                        {card.brand !== 'visa' && card.brand !== 'mastercard' && card.brand !== 'amex' && (
                                                            <svg className="h-8 w-8" viewBox="0 0 32 32"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <rect fill="#6B7280" width="32" height="32" rx="4" />
                                                                <path
                                                                    d="M8 12H24V14H8V12ZM8 16H24V18H8V16ZM8 20H16V22H8V20Z"
                                                                    fill="white" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 capitalize">{card.brand}</p>
                                                        <p className="text-gray-500">•••• {card.last4}</p>
                                                    </div>
                                                </div>
                                                {method.isDefault && (
                                                    <span
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500 mb-4">
                                                Expires {card.expMonth}/{card.expYear}
                                            </div>
                                            <div className="flex justify-between">
                                                {!method.isDefault && (
                                                    <button
                                                        onClick={() => handleSetDefault(method.id)}
                                                        className="text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        Make Default
                                                    </button>
                                                )}
                                                {!method.isDefault && (
                                                    <button
                                                        onClick={() => handleDelete(method.id)}
                                                        className="text-sm text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                                {method.isDefault && (
                                                    <div></div>
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
        </FullPage>
    )
}
