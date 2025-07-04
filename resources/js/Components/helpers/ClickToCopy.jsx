import { useEffect, useState } from 'react'

export default function ClickToCopy({ text }) {
    const [copied, setCopied] = useState(false)
    const [showNotification, setShowNotification] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
            setShowNotification(true)
            setTimeout(() => setCopied(false), 2000)
            setTimeout(() => setShowNotification(false), 2000)
        })
    }

    // Clean up notification on unmount
    useEffect(() => {
        return () => {
            if (showNotification) {
                setShowNotification(false)
            }
        }
    }, [showNotification])

    return (
        <>
            {showNotification && (
                <div className="fixed top-4 right-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded shadow-md dark:shadow-gray-900/20 z-50 flex items-center transition-colors duration-250">
                    <i className="ri-checkbox-circle-line text-lg mr-2"></i>
                    <span>Copied to clipboard!</span>
                </div>
            )}
            <button
                type="button"
                className="flex items-center justify-between w-full text-left font-mono text-sm text-gray-700 dark:text-gray-300 group transition-all duration-200"
                onClick={handleCopy}
                title="Click to copy"
            >
                <span className="truncate">{text?.length > 50 ? text.substring(0, 50) + '...' : text}</span>
                <span
                    className={`ml-2 flex items-center ${copied ? 'text-green-500 dark:text-green-400' : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'} transition-colors duration-250`}
                >
                    {copied ? (
                        <i className="ri-checkbox-circle-line text-lg"></i>
                    ) : (
                        <i className="ri-file-copy-line text-lg"></i>
                    )}
                </span>
            </button>
        </>
    )
}
