import { forwardRef, useEffect, useRef } from 'react'

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full px-3 py-2 border border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ' +
                className
            }
            ref={input}
        />
    )
})
