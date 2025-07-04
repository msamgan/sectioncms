import { useEffect, useState } from 'react'

export default function OffCanvas({ id, title, w = 'w-3/4', children }) {
    const [isOpen, setIsOpen] = useState(false)

    // Function to handle close button click
    const handleClose = () => {
        setIsOpen(false)
    }

    // Function to handle open
    const handleOpen = () => {
        setIsOpen(true)
    }

    // Listen for custom events to open the offcanvas
    useEffect(() => {
        // Create a custom event listener for showing the offcanvas
        document.addEventListener(`show.${id}`, handleOpen)

        // Clean up event listener
        return () => {
            document.removeEventListener(`show.${id}`, handleOpen)
        }
    }, [id])

    // Add event listener for Bootstrap compatibility
    useEffect(() => {
        const setupButtonListeners = () => {
            const buttons = document.querySelectorAll(`[data-bs-target="#${id}"]`)

            const clickHandler = (e) => {
                e.preventDefault()
                handleOpen()
            }

            buttons.forEach((button) => {
                // Remove any existing listener first to prevent duplicates
                button.removeEventListener('click', clickHandler)
                button.addEventListener('click', clickHandler)
            })

            return () => {
                buttons.forEach((button) => {
                    button.removeEventListener('click', clickHandler)
                })
            }
        }

        // Initial setup
        const cleanup = setupButtonListeners()

        // Setup a mutation observer to detect when new buttons might be added to the DOM
        const observer = new MutationObserver(() => {
            cleanup && cleanup()
            setupButtonListeners()
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })

        return () => {
            cleanup && cleanup()
            observer.disconnect()
        }
    }, [id])

    return (
        <>
            {/* Backdrop overlay when offcanvas is open */}
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-30" onClick={handleClose}></div>}

            <div
                className={`fixed top-0 right-0 z-40 h-screen ${w} bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl dark:shadow-gray-900/20 transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out rounded-l-xl`}
                tabIndex="-1"
                id={id}
                aria-labelledby={id + 'Label'}
            >
                <div className="flex items-center justify-between p-5 border-b dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700">
                    <h5 id={id + 'Label'} className="text-xl font-semibold text-white flex items-center">
                        <span className="bg-white/20 dark:bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg mr-3 shadow-md dark:shadow-gray-900/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                            </svg>
                        </span>
                        {title}
                    </h5>
                    <button
                        type="button"
                        className="p-2 text-white/80 rounded-full hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 backdrop-blur-sm"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-250">{children}</div>
            </div>
        </>
    )
}
