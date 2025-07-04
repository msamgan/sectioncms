import Avatar from '@/Components/helpers/Avatar.jsx'
import Modal from '@/Components/Modal.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import SecondaryButton from '@/Components/SecondaryButton.jsx'
import { parseQueryString } from '@/Utils/methods.js'
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
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-blue-500 dark:peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-700 transition-all duration-200"></div>
                <span className="ml-2 text-gray-700 dark:text-gray-300 transition-colors duration-250">{isActive ? 'Active' : 'Inactive'}</span>
            </label>

            <Modal show={confirming} onClose={closeModal} maxWidth="md">
                <div className="p-0">
                    {/* Enhanced Header Section */}
                    <div className="bg-amber-50 dark:bg-amber-900/30 p-8 rounded-t-lg border-b border-amber-100 dark:border-amber-800/50 transition-colors duration-250">
                        <div className="flex items-center justify-center mb-5">
                            <div className="p-4 bg-amber-100 dark:bg-amber-800/40 rounded-full transform transition-transform duration-300 hover:scale-110">
                                <Avatar
                                    size="xl"
                                    bgColor="bg-yellow-500"
                                    icon="ri-file-warning-line"
                                    className="mx-auto"
                                />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-amber-700 dark:text-amber-400 mb-2 transition-colors duration-250">Are you sure?</h2>
                        <p className="text-center text-gray-600 dark:text-gray-300 transition-colors duration-250">This action will change the status of the Entity.</p>
                    </div>

                    {/* Warning Message */}
                    <div className="px-8 pt-8">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/30 p-5 mb-6 rounded-lg shadow-sm dark:shadow-gray-900/10 transition-colors duration-250">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <i className="ri-alert-line text-xl text-yellow-600 dark:text-yellow-500"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400 transition-colors duration-250">Important Warning</h3>
                                    <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 transition-colors duration-250">
                                        Once you change the status, it will affect the visibility and accessibility of
                                        this entity across the application. Make sure to review all implications before
                                        proceeding.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 dark:bg-gray-800 px-8 py-5 flex justify-end space-x-4 rounded-b-lg border-t border-gray-100 dark:border-gray-700 transition-colors duration-250">
                        <SecondaryButton
                            onClick={closeModal}
                            className="px-5 py-3 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                            className="px-5 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 transition-all duration-300 focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 focus:ring-opacity-50 shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/30"
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
