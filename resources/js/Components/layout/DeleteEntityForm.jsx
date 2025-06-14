import DangerButton from '@/Components/DangerButton'
import Avatar from '@/Components/helpers/Avatar.jsx'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import { moduleConstants } from '@/Utils/constants.js'
import { useForm } from '@inertiajs/react'
import { useRef, useState } from 'react'

export default function DeleteEntityForm({ action, refresh, className = '' }) {
    const [confirmingEntityDeletion, setConfirmingEntityDeletion] = useState(false)
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
        setConfirmingEntityDeletion(true)
    }

    const deleteUser = (e) => {
        e.preventDefault()

        destroy(action, {
            preserveScroll: true,
            onSuccess: () => {
                refresh()
                closeModal()
            },
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        })
    }

    const closeModal = () => {
        setConfirmingEntityDeletion(false)

        reset()
    }

    return (
        <section className={`${className}`}>
            <button
                className="group text-white cursor-pointer transition-all duration-300 bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1 rounded-md h-input-height px-input-padding-x py-input-padding-y text-sm inline-flex items-center"
                onClick={confirmUserDeletion}
            >
                <i className="ri-delete-bin-7-line mr-2"></i>
                <span>Delete</span>
            </button>

            <Modal show={confirmingEntityDeletion} onClose={closeModal} maxWidth="md">
                <form onSubmit={deleteUser} className="p-0">
                    {/* Header Section */}
                    <div className="bg-red-50 p-4 rounded-t-md border-b border-red-100">
                        <div className="flex items-center justify-center mb-3">
                            <div className="text-red-600 text-2xl">
                                <i className="ri-delete-bin-7-line"></i>
                            </div>
                        </div>
                        <h2 className="text-xl font-medium text-center text-red-700 mb-1">Confirm Deletion</h2>
                        <p className="text-center text-gray-600 text-sm">This action cannot be reversed</p>
                    </div>

                    {/* Warning Message */}
                    <div className="px-6 pt-6">
                        <div className="bg-yellow-50 border border-yellow-200 p-3 mb-4 rounded-md">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <i className="ri-alert-line text-yellow-600"></i>
                                </div>
                                <div className="ml-2">
                                    <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                                    <p className="mt-1 text-xs text-yellow-700">
                                        Once this item is deleted, all of its resources and data will be permanently
                                        removed. This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="mb-4 relative">
                            <InputLabel htmlFor="password" value="Enter your password to confirm" required={true} className="text-sm" />
                            <div className="relative mt-1">
                                <TextInput
                                    id="password"
                                    type="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    isFocused
                                    placeholder="Password"
                                    className="focus:border-red-300 focus:ring-red-200 text-sm"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <i className="ri-lock-line text-gray-400"></i>
                                </div>
                            </div>
                            <InputError message={errors.password} className="mt-2 text-xs" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2 rounded-b-md border-t border-gray-100">
                        <SecondaryButton onClick={closeModal} className="text-sm">
                            <i className="ri-close-line mr-1"></i> Cancel
                        </SecondaryButton>

                        <DangerButton
                            className="text-sm focus:ring-1 focus:ring-red-500 focus:ring-offset-1"
                            disabled={processing}
                        >
                            <i className="ri-delete-bin-7-line mr-1"></i>
                            {processing ? 'Deleting...' : 'Delete Item'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    )
}
