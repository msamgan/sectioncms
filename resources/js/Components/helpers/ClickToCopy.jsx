import { useState } from 'react'

export default function ClickToCopy({ text }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <button
            type="button"
            className="flex items-center justify-between w-full text-left font-mono text-sm text-gray-700 group transition-all duration-200"
            onClick={handleCopy}
            title="Click to copy"
        >
            <span className="truncate">
                {text.length > 50 ? text.substring(0, 50) + '...' : text}
            </span>
            <span className={`ml-2 flex items-center ${copied ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {copied ? (
                    <i className="ri-checkbox-circle-line text-lg"></i>
                ) : (
                    <i className="ri-file-copy-line text-lg"></i>
                )}
            </span>
        </button>
    )
}
