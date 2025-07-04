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
                    {/* Enhanced Header Section */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-t-lg border-b border-amber-100 dark:border-amber-800/50">
                        <div className="flex items-center justify-center mb-5">
                            <div className="p-4 bg-amber-100 dark:bg-amber-800/30 rounded-full transform transition-transform duration-300 hover:scale-110">
                                <Avatar
                                    size="xl"
                                    bgColor="bg-blue-500"
                                    icon="ri-global-line"
                                    className="mx-auto"
                                />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-amber-700 dark:text-amber-400 mb-2">Add New Site</h2>
                        <p className="text-center text-gray-600 dark:text-gray-400">Enter the URL for your new site</p>
                    </div>

                    {/* Main Content */}
                    <div className="px-6 pt-6">
                        {/* Info Message */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 p-5 mb-6 rounded-lg shadow-sm">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <i className="ri-information-line text-xl text-yellow-600 dark:text-yellow-500"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Important Information</h3>
                                    <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
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
                    <div className="bg-gray-50 dark:bg-gray-900/30 px-8 py-5 flex justify-end space-x-4 rounded-b-lg border-t border-gray-100 dark:border-gray-700">
                        <SecondaryButton
                            onClick={closeModal}
                            className="px-5 py-3 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            <i className="ri-close-line mr-3"></i> Cancel
                        </SecondaryButton>

                        <PrimaryButton
                            className="px-5 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-300 focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 focus:ring-opacity-50 shadow-sm hover:shadow-md"
                            disabled={processing}
                        >
                            <i className="ri-add-line mr-3"></i>
                            {processing ? 'Adding...' : 'Add Site'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    )
}
