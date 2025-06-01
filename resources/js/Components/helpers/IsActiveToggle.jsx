import { parseQueryString } from '@/Utils/methods.js'
import Avatar from '@/Components/helpers/Avatar.jsx'
import SecondaryButton from '@/Components/SecondaryButton.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import Modal from '@/Components/Modal.jsx'
import { useState } from 'react'

export default function IsActiveToggle({ isActive, toggleIsActive, toggleIsActiveParams, refresher }) {
    const [confirming, setConfirming] = useState(false)

    const closeModal = () => {
        setConfirming(false)
    }

    return (
        <div>
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isActive}
                    onChange={(e) => {
                        e.preventDefault()
                        setConfirming(true)
                    }}
                />
                <div className="w-6 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-300 transition-all duration-200"></div>
                <span className="ml-2 text-gray-700">Active</span>
            </label>

            <Modal show={confirming} onClose={closeModal} maxWidth="md">
                <div className="p-0">
                    {/* Enhanced Header Section */}
                    <div className="bg-amber-50 p-8 rounded-t-lg border-b border-amber-100">
                        <div className="flex items-center justify-center mb-5">
                            <div className="p-4 bg-amber-100 rounded-full transform transition-transform duration-300 hover:scale-110">
                                <Avatar size="xl" bgColor="bg-yellow-500" icon="ri-file-warning-line" className="mx-auto" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-amber-700 mb-2">Are you sure?</h2>
                        <p className="text-center text-gray-600">This action will change the status of the Entity.</p>
                    </div>

                    {/* Warning Message */}
                    <div className="px-8 pt-8">
                        <div className="bg-yellow-50 border border-yellow-200 p-5 mb-6 rounded-lg shadow-sm">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <i className="ri-alert-line text-xl text-yellow-600"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-yellow-800">Important Warning</h3>
                                    <p className="mt-2 text-sm text-yellow-700">
                                        Once you change the status, it will affect the visibility and accessibility of this
                                        entity across the application. Make sure to review all implications before proceeding.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 px-8 py-5 flex justify-end space-x-4 rounded-b-lg border-t border-gray-100">
                        <SecondaryButton
                            onClick={closeModal}
                            className="px-5 py-3 transition-all duration-200 hover:bg-gray-200"
                        >
                            <i className="ri-close-line mr-3"></i> Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            onClick={(e) => {
                                e.preventDefault()
                                toggleIsActive
                                    .call({
                                        params: toggleIsActiveParams,
                                    })
                                    .then(() => {
                                        refresher(parseQueryString()).then(() => {})
                                        closeModal()
                                    })
                            }}
                            className="px-5 py-3 bg-amber-600 hover:bg-amber-700 transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 shadow-sm hover:shadow-md"
                        >
                            <i className="ri-refresh-line mr-3"></i>
                            Change Status
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
