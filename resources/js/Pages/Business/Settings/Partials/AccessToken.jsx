import Avatar from '@/Components/helpers/Avatar.jsx'
import ClickToCopy from '@/Components/helpers/ClickToCopy.jsx'
import Modal from '@/Components/Modal.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import SecondaryButton from '@/Components/SecondaryButton.jsx'
import { regenerateToken as _regenerateToken } from '@actions/BusinessController.js'
import { Transition } from '@headlessui/react'
import { useState } from 'react'

export default function AccessToken({ business }) {
    const [confirming, setConfirming] = useState(false)
    const [token, setToken] = useState(business.token)
    const [regenerated, setRegenerated] = useState(false)

    const closeModal = () => {
        setConfirming(false)
    }

    const regenerateToken = () => {
        _regenerateToken.call({}).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setToken(data.token)
                    closeModal()
                    setRegenerated(true)
                    setTimeout(() => setRegenerated(false), 3000)
                })
            }
        })
    }

    return (
        <div>
            <div className="card mb-6 shadow-sm transition-all duration-200 hover:shadow-lg">
                <div className="card-header border-bottom bg-light-subtle">
                    <div className="d-flex align-items-center">
                        <Avatar size="sm" bgColor="bg-info" icon="ri-key-line" />
                        <h5 className="card-title m-0 text-lg font-semibold">Access Token</h5>
                    </div>
                </div>
                <div className="card-body mt-4">
                    <div className="row g-5">
                        <div className="col-12 col-md-12">
                            <div className="form-floating form-floating-outline">
                                <p className="text-muted mb-2">Your API access token:</p>
                                <div className="bg-light-subtle rounded border p-3 shadow-sm transition-all duration-200 hover:shadow-md">
                                    <ClickToCopy text={token} />
                                </div>
                                <small className="text-muted d-block mt-2">
                                    This token is used to authenticate API requests. Keep it secure.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end gap-4">
                <button
                    className="btn btn-primary d-inline-flex align-items-center shadow-sm transition-all duration-200 hover:shadow-md"
                    onClick={() => {
                        setConfirming(true)
                    }}
                >
                    <i className="ri-refresh-line me-2"></i>
                    Regenerate Token
                </button>
                <Transition
                    show={regenerated}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <div className="d-flex align-items-center mt-2">
                        <Avatar size="xs" bgColor="bg-success" icon="ri-check-line" />
                        <p className="text-success mb-0">Token regenerated successfully!</p>
                    </div>
                </Transition>
            </div>

            <Modal show={confirming} onClose={closeModal}>
                <div className="p-6">
                    <div className="d-flex align-items-center mb-4">
                        <Avatar size="sm" bgColor="bg-warning" icon="ri-alert-line" />
                        <h2 className="ms-2 mt-4 text-lg font-medium text-gray-900">
                            Are you sure you want to regenerate?
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-gray-600">
                        Once this token is regenerated, the old token will no longer be valid and any API calls using it
                        will fail. Make sure to update all your applications with the new token.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton
                            onClick={closeModal}
                            className="shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                            <i className="ri-close-line me-2"></i>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            onClick={(e) => {
                                e.preventDefault()
                                regenerateToken()
                            }}
                            className="ms-3 shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                            <i className="ri-refresh-line me-2"></i>
                            Regenerate Token
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
