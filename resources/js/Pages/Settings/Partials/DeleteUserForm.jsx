import DangerButton from '@/Components/DangerButton.jsx'
import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import Modal from '@/Components/Modal.jsx'
import SecondaryButton from '@/Components/SecondaryButton.jsx'
import TextInput from '@/Components/TextInput.jsx'
import { useForm } from '@inertiajs/react'
import { useRef, useState } from 'react'

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const passwordInput = useRef()

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    })

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true)
    }

    const deleteUser = (e) => {
        e.preventDefault()

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        })
    }

    const closeModal = () => {
        setConfirmingUserDeletion(false)

        reset()
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-base font-medium text-gray-900">Delete Account</h2>

                <p className="mt-1 text-xs text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion} className="text-sm">
                <i className="ri-delete-bin-7-line mr-2"></i>
                Delete Account
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="md">
                <form onSubmit={deleteUser} className="p-0">
                    {/* Enhanced Header Section */}
                    <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-t-lg border-b border-red-100 dark:border-red-800/50">
                        <div className="flex items-center justify-center mb-5">
                            <div className="p-4 bg-red-100 dark:bg-red-800/30 rounded-full transform transition-transform duration-300 hover:scale-110">
                                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white">
                                    <i className="ri-delete-bin-7-line text-2xl"></i>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-red-700 dark:text-red-400 mb-2">Delete Account</h2>
                        <p className="text-center text-gray-600 dark:text-gray-400">This action cannot be reversed</p>
                    </div>

                    {/* Warning Message */}
                    <div className="px-8 pt-8">
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 p-5 mb-6 rounded-lg shadow-sm">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <i className="ri-alert-line text-xl text-yellow-600 dark:text-yellow-500"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Important Warning</h3>
                                    <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                        Once your account is deleted, all of its resources and data will be permanently deleted.
                                        Please enter your password to confirm you would like to permanently delete your account.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="mb-6 relative">
                            <InputLabel htmlFor="password" value="Enter your password to confirm" required={true} className="text-sm mb-2" />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    isFocused
                                    placeholder="Password"
                                    className="focus:border-red-300 focus:ring-red-200 text-sm w-full"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <i className="ri-lock-line text-gray-400"></i>
                                </div>
                            </div>
                            <InputError message={errors.password} className="mt-2 text-xs" />
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

                        <DangerButton
                            className="px-5 py-3 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 transition-all duration-300 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-500 focus:ring-opacity-50 shadow-sm hover:shadow-md"
                            disabled={processing}
                        >
                            <i className="ri-delete-bin-7-line mr-3"></i>
                            {processing ? 'Deleting...' : 'Delete Account'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    )
}
