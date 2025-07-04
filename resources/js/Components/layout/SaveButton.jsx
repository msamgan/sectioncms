import { Transition } from '@headlessui/react'

export default function SaveButton({
    processing,
    recentlySuccessful,
    label = "Save Changes",
    icon = "ri-save-line",
    className = "flex justify-end w-2/3 gap-2"
}) {
    return (
        <div className={className}>
            <button
                disabled={processing}
                className="bg-primary hover:bg-primary/90 text-white flex items-center transition-all duration-300 px-4 py-2 rounded-md font-medium text-sm"
            >
                <i className={`${icon} mr-2`}></i>
                {label}
            </button>
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0 transform scale-95"
                enterTo="opacity-100 transform scale-100"
                leave="transition ease-in-out duration-300"
                leaveFrom="opacity-100 transform scale-100"
                leaveTo="opacity-0 transform scale-95"
            >
                <div className="flex items-center mt-2 px-4 py-2">
                    <div className="text-green-500 dark:text-green-400 mr-2">
                        <i className="ri-check-line"></i>
                    </div>
                    <p className="text-green-600 dark:text-green-400 m-0 text-sm">Saved successfully!</p>
                </div>
            </Transition>
        </div>
    )
}
