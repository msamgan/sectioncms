import { useState } from 'react'
import CtaButton from '@/Components/CtaButton'

export default function SimpleFormWrapper({
    title,
    description,
    fields,
    submitText = 'Submit',
    successMessage = 'Form submitted successfully!',
    onSubmit,
    className = '',
}) {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const validateForm = () => {
        const newErrors = {}
        let isValid = true

        fields.forEach((field) => {
            // Skip validation if field is not required and value is empty
            if (!field.required && (!formData[field.name] || formData[field.name].trim() === '')) {
                return
            }

            // Required field validation
            if (field.required && (!formData[field.name] || formData[field.name].trim() === '')) {
                newErrors[field.name] = `${field.label} is required`
                isValid = false
                return
            }

            // Email validation
            if (field.type === 'email' && formData[field.name]) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(formData[field.name])) {
                    newErrors[field.name] = 'Please enter a valid email address'
                    isValid = false
                }
            }

            // Password validation
            if (field.type === 'password' && formData[field.name]) {
                if (formData[field.name].length < 8) {
                    newErrors[field.name] = 'Password must be at least 8 characters long'
                    isValid = false
                }
            }

            // Custom validation
            if (field.validate && formData[field.name]) {
                const customError = field.validate(formData[field.name])
                if (customError) {
                    newErrors[field.name] = customError
                    isValid = false
                }
            }
        })

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            if (onSubmit) {
                await onSubmit(formData)
            }

            setIsSubmitted(true)
            // Reset form after successful submission
            setFormData({})
        } catch (error) {
            console.error('Form submission error:', error)

            // Handle API validation errors
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors)
            } else {
                setErrors({ form: 'An error occurred. Please try again.' })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={`overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800 ${className}`}>
            {/* Form header */}
            {(title || description) && (
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                    {title && <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
                    {description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                </div>
            )}

            {/* Form body */}
            <div className="px-6 py-4">
                {isSubmitted ? (
                    <div className="py-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <svg
                                className="h-8 w-8 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">Thank You!</h3>
                        <p className="text-gray-600 dark:text-gray-400">{successMessage}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Form fields */}
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label
                                    htmlFor={field.name}
                                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>

                                {field.type === 'textarea' ? (
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        rows={field.rows || 4}
                                        className={`w-full border px-3 py-2 ${errors[field.name] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                                        placeholder={field.placeholder || ''}
                                        required={field.required}
                                    />
                                ) : field.type === 'select' ? (
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        className={`w-full border px-3 py-2 ${errors[field.name] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                                        required={field.required}
                                    >
                                        <option value="">{field.placeholder || 'Select an option'}</option>
                                        {field.options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type || 'text'}
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        className={`w-full border px-3 py-2 ${errors[field.name] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                                        placeholder={field.placeholder || ''}
                                        required={field.required}
                                    />
                                )}

                                {errors[field.name] && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[field.name]}</p>
                                )}

                                {field.helpText && !errors[field.name] && (
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{field.helpText}</p>
                                )}
                            </div>
                        ))}

                        {/* Form-level error */}
                        {errors.form && (
                            <div className="bg-red-50 rounded-md border border-red-200 p-3 dark:border-red-800 dark:bg-red-900/20">
                                <p className="text-sm text-red-600 dark:text-red-400">{errors.form}</p>
                            </div>
                        )}

                        {/* Submit button */}
                        <div className="mt-6">
                            <CtaButton type="submit" primary={true} className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : submitText}
                            </CtaButton>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
