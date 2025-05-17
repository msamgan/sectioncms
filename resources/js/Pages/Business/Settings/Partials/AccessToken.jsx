import ClickToCopy from '@/Components/helpers/ClickToCopy.jsx'
import { useState } from 'react'
import SecondaryButton from '@/Components/SecondaryButton.jsx'
import Modal from '@/Components/Modal.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { regenerateToken as _regenerateToken } from '@actions/BusinessController.js'

export default function AccessToken({ business }) {
    const [confirming, setConfirming] = useState(false)
    const [token, setToken] = useState(business.token)

    const closeModal = () => {
        setConfirming(false)
    }

    const regenerateToken = () => {
        _regenerateToken.call({}).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setToken(data.token)
                    closeModal()
                })
            }
        })
    }

    return (
        <div>
            <div className="card mb-6">
                <div className="card-header">
                    <h5 className="card-title m-0">Access Token</h5>
                </div>
                <div className="card-body">
                    <div className="row g-5">
                        <div className="col-12 col-md-12">
                            <ClickToCopy text={token} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end gap-4">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setConfirming(true)
                    }}
                >
                    Regenerate Token
                </button>
            </div>

            <Modal show={confirming} onClose={closeModal}>
                <div className={'p-6'}>
                    <h2 className="text-lg font-medium text-gray-900">Are you sure you want to Regenerate?</h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once this is regenerated, The old token will no longer be valid and API calls will fail.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton
                            onClick={(e) => {
                                e.preventDefault()
                                regenerateToken()
                            }}
                            className="ms-3">Regenerate Token</PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
