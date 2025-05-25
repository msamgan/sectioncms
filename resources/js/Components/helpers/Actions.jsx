import { useEffect, useRef, useState } from 'react'

export default function Actions({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
    const dropdownRef = useRef(null)
    const buttonRef = useRef(null)

    // Calculate dropdown position when it's opened
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            setDropdownPosition({
                top: rect.bottom + 8,
                left: rect.left,
            })
        }
    }, [isOpen])

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
        <div className="relative inline-block text-left overflow-visible" ref={dropdownRef}>
            <button
                ref={buttonRef}
                type="button"
                className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className="ri-more-2-line text-gray-500"></i>
            </button>

            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        zIndex: 999,
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        width: '12rem',
                    }}
                    className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                    <div className="py-1">{children}</div>
                </div>
            )}
        </div>
    )
}
