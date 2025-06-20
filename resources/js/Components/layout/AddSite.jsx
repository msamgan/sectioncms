import Avatar from '@/Components/helpers/Avatar.jsx'
import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import Modal from '@/Components/Modal.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import SecondaryButton from '@/Components/SecondaryButton.jsx'
import TextInput from '@/Components/TextInput.jsx'
import { store } from '@actions/BusinessController.js'
import { Link, useForm } from '@inertiajs/react'
import { useRef, useState } from 'react'

export default function AddSite() {
    const [confirming, setConfirming] = useState(false)
    const urlInput = useRef()
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        name: '',
    })

    const closeModal = () => {
        setConfirming(false)
        reset()
    }

    const submit = (e) => {
        e.preventDefault()
        post(store.route(), {
            onSuccess: () => {
                window.location.href = route('dashboard')
            },
            onError: () => urlInput.current.focus(),
        })
    }

    return (
        <>
            <PrimaryButton
                onClick={() => setConfirming(true)}
                className="mr-8 group shadow-sm hover:shadow-md transition-all duration-300 flex items-center transform hover:-translate-y-0.5 bg-gradient-to-r from-blue-500 to-indigo-600"
            >
                <i className="ri-add-line me-2 group-hover:rotate-90 transition-transform duration-300"></i>
                <span>Add New</span>
            </PrimaryButton>

            <Link
                href={route('business')}
                className="text-primary hover:text-primary/80 transition-colors duration-300 transform hover:scale-110"
            >
                <i className="ri-global-fill ri-22px me-6 cursor-pointer transition-transform duration-300"></i>
            </Link>

            <Modal show={confirming} onClose={closeModal} maxWidth="md">
                <form onSubmit={submit} className="p-0">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-t-xl border-b border-gray-100">
                        <div className="flex items-center justify-center mb-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-sm opacity-30"></div>
                                <div className="p-3 bg-white rounded-full transform transition-transform duration-300 hover:scale-110 relative shadow-sm">
                                    <Avatar
                                        size="md"
                                        bgColor="bg-gradient-to-r from-blue-500 to-indigo-600"
                                        icon="ri-global-line"
                                        className="mx-auto"
                                    />
                                </div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Add New Site</h2>
                        <p className="text-center text-gray-600">Enter the URL for your new site</p>
                    </div>

                    {/* Main Content */}
                    <div className="px-6 pt-6">
                        {/* Info Message */}
                        <div className="bg-blue-50 border border-blue-100 p-4 mb-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center transition-all duration-200 group-hover:scale-110">
                                        <i className="ri-information-line text-blue-600"></i>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-800">Important Information</h3>
                                    <p className="mt-1 text-sm text-gray-700">
                                        This action will create a new site in your account. Please make sure to provide
                                        the correct information before proceeding.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* URL Input */}
                        <div className="mb-6 relative">
                            <InputLabel htmlFor="site-url" value="Site URL" required={true} />
                            <div className="relative mt-1 group">
                                <TextInput
                                    id="site-url"
                                    type="url"
                                    ref={urlInput}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required={true}
                                    isFocused={true}
                                    placeholder="https://example.com"
                                    className="focus:border-primary focus:ring-primary/20 transition-all duration-300"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <i className="ri-link text-gray-400 group-hover:text-primary transition-colors duration-300"></i>
                                </div>
                            </div>
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 flex justify-end space-x-3 rounded-b-xl border-t border-gray-100">
                        <SecondaryButton
                            onClick={closeModal}
                            className="px-4 py-2 transition-all duration-200 hover:bg-gray-200 transform hover:-translate-y-0.5 hover:shadow-sm"
                        >
                            <i className="ri-close-line mr-1"></i> Cancel
                        </SecondaryButton>

                        <PrimaryButton
                            className="px-4 py-2 transition-all duration-300 hover:bg-primary/80 focus:ring-2 focus:ring-primary/50 focus:ring-opacity-50 transform hover:-translate-y-0.5 hover:shadow-md"
                            disabled={processing}
                        >
                            <i className="ri-add-line mr-1"></i>
                            {processing ? 'Adding...' : 'Add Site'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    )
}
