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
        <button type="button" className={''} onClick={handleCopy} title={text}>
            {text}
            {copied ? <i className="ri-checkbox-circle-line ml-1"></i> : <i className="ri-file-copy-line ml-1"></i>}
        </button>
    )
}
