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
                className="inline-flex items-center text-red-600 hover:text-red-800 cursor-pointer transition-all duration-200 w-full"
                onClick={confirmUserDeletion}
            >
                <i className="ri-delete-bin-7-line mr-2"></i> Delete
            </button>

            <Modal show={confirmingEntityDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <div className="mb-4 text-center">
                        <div className="mb-3">
                            <Avatar
                                size="lg"
                                bgColor={moduleConstants.delete.bgColor}
                                icon={moduleConstants.delete.icon}
                                className="mx-auto"
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Confirm Deletion</h2>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
                        <div className="flex items-start">
                            <i className="ri-alert-line mr-2 mt-1 text-yellow-600"></i>
                            <div>
                                <p className="m-0 text-yellow-800">
                                    Once this item is deleted, all of its resources and data will be permanently
                                    removed. This action cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 relative">
                        <InputLabel htmlFor="password" value="Enter your password to confirm" required={true} className="mb-1" />
                        <TextInput
                            id="password"
                            type="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            isFocused
                            placeholder="Password"
                            className="shadow-sm w-full"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <SecondaryButton
                            onClick={closeModal}
                            className="shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                            <i className="ri-close-line mr-1"></i> Cancel
                        </SecondaryButton>

                        <DangerButton
                            className="shadow-sm transition-all duration-200 hover:shadow-md"
                            disabled={processing}
                        >
                            <i className="ri-delete-bin-7-line mr-1"></i> Delete Item
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    )
}
