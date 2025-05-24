import { useState } from 'react'
import Avatar from '@/Components/helpers/Avatar.jsx'
import SecondaryButton from '@/Components/SecondaryButton.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import Modal from '@/Components/Modal.jsx'
import { Link, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import InputError from '@/Components/InputError.jsx'
import { store } from '@actions/BusinessController.js'

export default function AddSite() {
    const [confirming, setConfirming] = useState(false)
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        name: '',
    })

    const closeModal = () => {
        setConfirming(false)
    }

    const submit = (e) => {
        e.preventDefault()
        post(store.route(), {
            onSuccess: () => {
                window.location.href = route('dashboard')
            },
        })
    }

    return (
        <>
            <PrimaryButton onClick={() => setConfirming(true)} className={'mr-8'}>
                <i className="ri-add-line me-2"></i> Add New
            </PrimaryButton>

            <Link href={route('business')} className="">
                <i className="ri-global-fill ri-22px me-6 cursor-pointer"></i>
            </Link>

            <Modal show={confirming} onClose={closeModal}>
                <form onSubmit={submit}>
                    <div className="p-6">
                        <div className="d-flex align-items-center mb-4">
                            <Avatar size="sm" bgColor="bg-warning" icon="ri-alert-line" />
                            <h2 className="ms-2 mt-4 text-lg font-medium text-gray-900">Add New Site</h2>
                        </div>

                        <p className="mt-1 text-sm text-gray-600">
                            This action will create a new site in your account. Please make sure to provide the correct
                            information before proceeding.
                        </p>

                        <div className="card mb-6 w-full shadow-sm transition-all duration-200 hover:shadow-lg">
                            <div className="row g-5">
                                <div className="col-12 col-md-12">
                                    <div className="form-floating form-floating-outline">
                                        <TextInput
                                            type="url"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            id="user-name"
                                            placeholder="URL"
                                            required={true}
                                            isFocused={true}
                                            className="shadow-sm transition-all duration-200 focus:shadow-md"
                                        />
                                        <InputLabel htmlFor="user-name" required={true}>
                                            URL
                                        </InputLabel>
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton
                                onClick={closeModal}
                                className="shadow-sm transition-all duration-200 hover:shadow-md"
                            >
                                <i className="ri-close-line me-2"></i>
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton className="ms-3 shadow-sm transition-all duration-200 hover:shadow-md">
                                <i className="ri-add-line me-2"></i>
                                Add Site
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
