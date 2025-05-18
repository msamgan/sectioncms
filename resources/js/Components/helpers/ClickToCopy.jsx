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
        <button type="button" className={'text-pretty'} onClick={handleCopy} title={text}>
            {text.length > 50 ? text.substring(0, 50) + '...' : text}
            {copied ? <i className="ri-checkbox-circle-line ml-1"></i> : <i className="ri-file-copy-line ml-1"></i>}
        </button>
    )
}
