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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8 transition-all duration-300 hover:shadow-lg">
                <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-6 py-5">
                    <div className="flex items-center">
                        <Avatar size="sm" bgColor="bg-cyan-500" icon="ri-key-line" />
                        <h5 className="ml-3 text-lg font-semibold text-gray-800 dark:text-gray-200">Access Token</h5>
                    </div>
                </div>
                <div className="p-6 dark:text-gray-300">
                    <div className="space-y-5">
                        <div className="space-y-3">
                            <p className="text-gray-600 dark:text-gray-400 mb-3 font-medium">Your API access token:</p>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-500">
                                <div className="flex items-center">
                                    <div className="flex-grow overflow-hidden">
                                        <ClickToCopy text={token} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <i className="ri-information-line text-blue-500 dark:text-blue-400 mr-3"></i>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    This token is used to authenticate API requests. Keep it secure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center gap-5">
                <button
                    className="inline-flex items-center px-5 py-3 bg-primary dark:bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-secondary dark:hover:bg-blue-700 focus:bg-primary-dark dark:focus:bg-blue-800 active:bg-primary-dark dark:active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 shadow-sm hover:shadow-md"
                    onClick={() => {
                        setConfirming(true)
                    }}
                >
                    <i className="ri-refresh-line mr-3"></i>
                    Regenerate Token
                </button>
                <Transition
                    show={regenerated}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <div className="flex items-center">
                        <Avatar size="xs" bgColor="bg-green-500" icon="ri-check-line" />
                        <p className="ml-3 text-green-600 dark:text-green-400 font-medium text-sm">Token regenerated successfully!</p>
                    </div>
                </Transition>
            </div>

            <Modal show={confirming} onClose={closeModal} maxWidth="md">
                <div className="p-0 dark:bg-gray-800">
                    {/* Enhanced Header Section */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-t-lg border-b border-amber-100 dark:border-amber-800/50">
                        <div className="flex items-center justify-center mb-5">
                            <div className="p-4 bg-amber-100 dark:bg-amber-800/30 rounded-full transform transition-transform duration-300 hover:scale-110">
                                <Avatar size="xl" bgColor="bg-yellow-500" icon="ri-refresh-line" className="mx-auto" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-amber-700 dark:text-amber-400 mb-2">Regenerate Access Token</h2>
                        <p className="text-center text-gray-600 dark:text-gray-400">This action will create a new API token</p>
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
                                        Once this token is regenerated, the old token will no longer be valid and any
                                        API calls using it will fail. Make sure to update all your applications with the
                                        new token.
                                    </p>
                                </div>
                            </div>
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
                        <PrimaryButton
                            onClick={(e) => {
                                e.preventDefault()
                                regenerateToken()
                            }}
                            className="px-5 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-300 focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 focus:ring-opacity-50 shadow-sm hover:shadow-md"
                        >
                            <i className="ri-refresh-line mr-3"></i>
                            Regenerate Token
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
