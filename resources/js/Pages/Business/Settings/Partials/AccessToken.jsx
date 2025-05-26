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
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex items-center">
                        <Avatar size="sm" bgColor="bg-cyan-500" icon="ri-key-line" />
                        <h5 className="text-lg font-semibold text-gray-800">Access Token</h5>
                    </div>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-gray-600 mb-2 font-medium">Your API access token:</p>
                            <div className="bg-gray-50 rounded-md border border-gray-200 p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300">
                                <div className="flex items-center">
                                    <div className="flex-grow overflow-hidden">
                                        <ClickToCopy text={token} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-2">
                                <i className="ri-information-line text-blue-500 mr-1"></i>
                                <p className="text-sm text-gray-500">
                                    This token is used to authenticate API requests. Keep it secure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center gap-4">
                <button
                    className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-secondary focus:bg-primary-dark active:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 shadow-sm hover:shadow-md"
                    onClick={() => {
                        setConfirming(true)
                    }}
                >
                    <i className="ri-refresh-line mr-2"></i>
                    Regenerate Token
                </button>
                <Transition
                    show={regenerated}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <div className="flex items-center mt-2">
                        <Avatar size="xs" bgColor="bg-green-500" icon="ri-check-line" />
                        <p className="text-green-600 font-medium text-sm">Token regenerated successfully!</p>
                    </div>
                </Transition>
            </div>

            <Modal show={confirming} onClose={closeModal} maxWidth="md">
                <div className="p-0">
                    {/* Enhanced Header Section */}
                    <div className="bg-amber-50 p-6 rounded-t-lg border-b border-amber-100">
                        <div className="flex items-center justify-center mb-4">
                            <div className="p-3 bg-amber-100 rounded-full transform transition-transform duration-300 hover:scale-110">
                                <Avatar size="xl" bgColor="bg-yellow-500" icon="ri-refresh-line" className="mx-auto" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-amber-700 mb-1">Regenerate Access Token</h2>
                        <p className="text-center text-gray-600">This action will create a new API token</p>
                    </div>

                    {/* Warning Message */}
                    <div className="px-6 pt-6">
                        <div className="bg-yellow-50 border border-yellow-200 p-4 mb-5 rounded-lg shadow-sm">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <i className="ri-alert-line text-xl text-yellow-600"></i>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">Important Warning</h3>
                                    <p className="mt-1 text-sm text-yellow-700">
                                        Once this token is regenerated, the old token will no longer be valid and any
                                        API calls using it will fail. Make sure to update all your applications with the
                                        new token.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg border-t border-gray-100">
                        <SecondaryButton
                            onClick={closeModal}
                            className="px-4 py-2 transition-all duration-200 hover:bg-gray-200"
                        >
                            <i className="ri-close-line mr-2"></i> Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            onClick={(e) => {
                                e.preventDefault()
                                regenerateToken()
                            }}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 shadow-sm hover:shadow-md"
                        >
                            <i className="ri-refresh-line mr-2"></i>
                            Regenerate Token
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
