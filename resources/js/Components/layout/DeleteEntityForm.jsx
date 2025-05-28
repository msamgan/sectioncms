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
                className="group text-white cursor-pointer transition-all duration-300 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-input h-input-height px-input-padding-x py-input-padding-y text-sm shadow-sm hover:shadow-md inline-flex items-center"
                onClick={confirmUserDeletion}
            >
                <i className="ri-delete-bin-7-line mr-2 transition-transform duration-300 group-hover:rotate-12"></i>
                <span>Delete</span>
            </button>

            <Modal show={confirmingEntityDeletion} onClose={closeModal} maxWidth="md">
                <form onSubmit={deleteUser} className="p-0">
                    {/* Enhanced Header Section */}
                    <div className="bg-red-50 p-6 rounded-t-lg border-b border-red-100">
                        <div className="flex items-center justify-center mb-4">
                            <div className="p-3 bg-red-100 rounded-full transform transition-transform duration-300 hover:scale-110">
                                <Avatar
                                    size="xl"
                                    bgColor={moduleConstants.delete.bgColor}
                                    icon={moduleConstants.delete.icon}
                                    className="mx-auto"
                                />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-red-700 mb-1">Confirm Deletion</h2>
                        <p className="text-center text-gray-600">This action cannot be reversed</p>
                    </div>

                    {/* Warning Message */}
                    <div className="px-6 pt-6">
                        <div className="bg-yellow-50 border border-yellow-200 p-4 mb-5 rounded-lg shadow-sm">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <i className="ri-alert-line text-xl text-yellow-600"></i>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                                    <p className="mt-1 text-sm text-yellow-700">
                                        Once this item is deleted, all of its resources and data will be permanently
                                        removed. This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="mb-6 relative">
                            <InputLabel htmlFor="password" value="Enter your password to confirm" required={true} />
                            <div className="relative mt-1">
                                <TextInput
                                    id="password"
                                    type="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    isFocused
                                    placeholder="Password"
                                    className="focus:border-red-300 focus:ring-red-200"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <i className="ri-lock-line text-gray-400"></i>
                                </div>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg border-t border-gray-100">
                        <SecondaryButton onClick={closeModal} className="transition-all duration-200 hover:bg-gray-200">
                            <i className="ri-close-line mr-1"></i> Cancel
                        </SecondaryButton>

                        <DangerButton
                            className="transition-all duration-300 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
