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

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-4">
                    <div className="flex items-center justify-center mb-3">
                        <div className="text-red-600 text-2xl">
                            <i className="ri-delete-bin-7-line"></i>
                        </div>
                    </div>
                    <h2 className="text-base font-medium text-gray-900 text-center mb-2">Are you sure you want to delete your account?</h2>

                    <p className="mt-1 text-xs text-gray-600 text-center">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-4">
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
                                className="text-sm focus:border-red-300 focus:ring-red-200"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <i className="ri-lock-line text-gray-400"></i>
                            </div>
                        </div>
                        <InputLabel htmlFor="password" value="Password" required={true} className="sr-only" />
                        <InputError message={errors.password} className="mt-2 text-xs" />
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                        <SecondaryButton onClick={closeModal} className="text-sm">
                            <i className="ri-close-line mr-1"></i> Cancel
                        </SecondaryButton>

                        <DangerButton className="text-sm" disabled={processing}>
                            <i className="ri-delete-bin-7-line mr-1"></i>
                            {processing ? 'Deleting...' : 'Delete Account'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    )
}
