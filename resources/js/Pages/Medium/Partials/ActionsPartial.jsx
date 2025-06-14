import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import Actions from '@/Components/helpers/Actions.jsx'
import { destroy } from '@actions/MediumController.js'

export default function ActionsPartial({ setNotification, medium, getMedia }) {
    return (
        <Actions>
            <div
                className={
                    'bg-blue-500 text-white rounded py-1 hover:bg-blue-600 transition-all duration-200 flex items-center'
                }
            >
                <button
                    className={'flex items-center px-4 py-1 rounded text-white transition-all duration-200'}
                    onClick={() => {
                        navigator.clipboard.writeText(medium.url)
                        setNotification('File URL has been copied to clipboard')
                        setTimeout(() => {
                            setNotification(null)
                        }, 2000)
                    }}
                >
                    <i className="ri-clipboard-line mr-1 ml-2"></i> Copy
                </button>
            </div>
            <DeleteActionButton module={'medium'} route={destroy.route({ medium: medium.id })} refresh={getMedia} />
        </Actions>
    )
}
