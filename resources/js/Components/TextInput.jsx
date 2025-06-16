import { forwardRef, useEffect, useRef, useState } from 'react'

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        icon = null,
        iconPosition = 'left',
        showClearButton = false,
        onClear = null,
        ...props
    },
    ref,
) {
    const input = ref ? ref : useRef()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [currentType, setCurrentType] = useState(type)
    const isPassword = type === 'password'

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    useEffect(() => {
        // Update the input type when password visibility changes
        if (isPassword) {
            setCurrentType(passwordVisible ? 'text' : 'password')
        }
    }, [passwordVisible, isPassword])

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    // Handle clear button click
    const handleClear = () => {
        if (input.current) {
            input.current.value = ''

            // Trigger change event to update React state
            const event = new Event('input', { bubbles: true })
            input.current.dispatchEvent(event)

            // Focus the input after clearing
            input.current.focus()

            // Call the onClear callback if provided
            if (onClear && typeof onClear === 'function') {
                onClear()
            }
        }
    }

    // Determine icon class based on input type if no specific icon is provided
    const getIconClass = () => {
        if (icon) return icon

        switch (type) {
            case 'email':
                return 'ri-mail-line'
            case 'password':
                return 'ri-lock-line'
            case 'number':
                return 'ri-number-1'
            case 'tel':
                return 'ri-phone-line'
            case 'url':
                return 'ri-link'
            case 'date':
            case 'datetime-local':
                return 'ri-calendar-line'
            case 'time':
                return 'ri-time-line'
            case 'search':
                return 'ri-search-line'
            case 'file':
                return 'ri-file-upload-line'
            default:
                return 'ri-text'
        }
    }

    const iconClass = getIconClass()
    const hasIcon = icon !== null || iconClass
    const hasValue = props.value && props.value.length > 0
    const showActionButton = isPassword || (showClearButton && hasValue)

    // Adjust input padding based on icon position and action buttons
    const getInputClassName = () => {
        let baseClasses = `
            w-full h-input-height text-sm border border-gray-200 rounded-lg bg-white shadow-sm
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-1
            hover:border-gray-300 transition-all duration-300
            py-input-padding-y ${className}
        `

        // Add left padding if there's a left icon
        if (hasIcon && iconPosition === 'left') {
            baseClasses += ' pl-10'
        } else {
            baseClasses += ' pl-input-padding-x'
        }

        // Add right padding if there's a right icon or action button
        if ((hasIcon && iconPosition === 'right') || showActionButton) {
            baseClasses += ' pr-10'
        } else {
            baseClasses += ' pr-input-padding-x'
        }

        return baseClasses
    }

    const inputClassName = getInputClassName()

    return (
        <div className="relative group">
            {/* Left Icon */}
            {hasIcon && iconPosition === 'left' && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300">
                    <i
                        className={`${iconClass} text-gray-400 text-base group-focus-within:text-primary transition-all duration-300`}
                    ></i>
                </div>
            )}

            {/* Input */}
            <input {...props} type={currentType} className={inputClassName} ref={input} />

            {/* Right Icon */}
            {hasIcon && iconPosition === 'right' && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none transition-colors duration-300">
                    <i
                        className={`${iconClass} text-gray-400 text-base group-focus-within:text-primary transition-all duration-300`}
                    ></i>
                </div>
            )}

            {/* Password Toggle or Clear Button */}
            {showActionButton && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                        type="button"
                        className="text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full p-1 transition-colors duration-200"
                        onClick={isPassword ? togglePasswordVisibility : handleClear}
                        aria-label={isPassword ? (passwordVisible ? 'Hide password' : 'Show password') : 'Clear input'}
                    >
                        {isPassword ? (
                            <i className={`${passwordVisible ? 'ri-eye-off-line' : 'ri-eye-line'} text-base`}></i>
                        ) : (
                            <i className="ri-close-circle-line text-base"></i>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
})
