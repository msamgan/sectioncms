import { useState, useRef, useEffect } from 'react'

export default function Actions({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className="ri-more-2-line text-gray-500"></i>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">{children}</div>
                </div>
            )}
        </div>
    )
}
