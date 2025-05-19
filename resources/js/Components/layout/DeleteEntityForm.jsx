import { useRef, useState } from 'react'
import DangerButton from '@/Components/DangerButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import Avatar from '@/Components/helpers/Avatar.jsx'

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
        <section className={`bg-danger space-y-6 text-white ${className}`}>
            <button
                className="d-inline-flex align-items-center hover:text-danger-600 ml-5 cursor-pointer transition-all duration-200"
                onClick={confirmUserDeletion}
            >
                <i className="ri-delete-bin-7-line me-2"></i> Delete
            </button>

            <Modal show={confirmingEntityDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <div className="mb-4 text-center">
                        <div className="mb-3">
                            <Avatar
                                size="lg"
                                bgColor="bg-danger"
                                icon="ri-delete-bin-7-line ri-lg"
                                className="mx-auto"
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Confirm Deletion</h2>
                    </div>

                    <div className="alert alert-warning mb-4">
                        <div className="d-flex align-items-start">
                            <i className="ri-alert-line me-2 mt-1"></i>
                            <div>
                                <p className="mb-0">
                                    Once this item is deleted, all of its resources and data will be permanently
                                    removed. This action cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="form-floating form-floating-outline mb-4">
                        <TextInput
                            id="password"
                            type="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            isFocused
                            placeholder="Password"
                            className="shadow-sm"
                        />
                        <InputLabel htmlFor="password" value="Enter your password to confirm" required={true} />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <SecondaryButton
                            onClick={closeModal}
                            className="shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                            <i className="ri-close-line me-1"></i> Cancel
                        </SecondaryButton>

                        <DangerButton
                            className="shadow-sm transition-all duration-200 hover:shadow-md"
                            disabled={processing}
                        >
                            <i className="ri-delete-bin-7-line me-1"></i> Delete Item
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    )
}
