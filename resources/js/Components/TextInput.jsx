import { forwardRef, useEffect, useRef } from 'react'

export default forwardRef(function TextInput({
    type = 'text',
    className = '',
    isFocused = false,
    icon = null,
    iconPosition = 'left',
    ...props
}, ref) {
    const input = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    // Determine icon class based on input type if no specific icon is provided
    const getIconClass = () => {
        if (icon) return icon;

        switch (type) {
            case 'email':
                return 'ri-mail-line';
            case 'password':
                return 'ri-lock-line';
            case 'number':
                return 'ri-number-1';
            case 'tel':
                return 'ri-phone-line';
            case 'url':
                return 'ri-link';
            case 'date':
            case 'datetime-local':
                return 'ri-calendar-line';
            case 'time':
                return 'ri-time-line';
            case 'search':
                return 'ri-search-line';
            case 'file':
                return 'ri-file-upload-line';
            default:
                return 'ri-text';
        }
    };

    const iconClass = getIconClass();
    const hasIcon = icon !== null || iconClass;

    // Adjust input padding based on icon position
    const inputClassName = hasIcon
        ? `w-full border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ${
            iconPosition === 'left' ? 'pl-10 pr-3' : 'pl-3 pr-10'
          } py-2 ${className}`
        : `w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ${className}`;

    return hasIcon ? (
        <div className="relative">
            <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`}>
                <i className={`${iconClass} text-gray-400`}></i>
            </div>
            <input
                {...props}
                type={type}
                className={inputClassName}
                ref={input}
            />
        </div>
    ) : (
        <input
            {...props}
            type={type}
            className={inputClassName}
            ref={input}
        />
    );
})
