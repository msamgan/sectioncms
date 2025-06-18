import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import Actions from '@/Components/helpers/Actions.jsx'
import { destroy } from '@actions/MediumController.js'
import { useState } from 'react'

export default function ActionsPartial({ medium, getMedia }) {
    const [isCopied, setIsCopied] = useState(false)
    const toCopyClass = 'text-white rounded py-1 transition-all duration-200 flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 h-input-height'
    const copiedClass = 'text-white rounded py-1 transition-all duration-200 flex items-center bg-gradient-to-r from-green-500 to-green-700 h-input-height'

    return (
        <Actions>
            <div
                className={isCopied ? copiedClass : toCopyClass}
            >
                <button
                    className={'flex items-center px-4 py-1 rounded text-white transition-all duration-200'}
                    onClick={() => {
                        navigator.clipboard.writeText(medium.url)
                        setIsCopied(true)
                        setTimeout(() => {
                            setIsCopied(false)
                        }, 2000)
                    }}
                >
                    {isCopied ? (
                        <><i className="ri-check-line mr-1 ml-2"></i> Done</>
                    ) : (
                         <><i className="ri-clipboard-line mr-1 ml-2"></i> Copy</>
                    )}

                </button>
            </div>
            <DeleteActionButton module={'medium'} route={destroy.route({ medium: medium.id })} refresh={getMedia} />
        </Actions>
    )
}
