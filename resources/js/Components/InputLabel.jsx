export default function InputLabel({ value, className = '', children, required = false, ...props }) {
    return (
        <label {...props} className={`mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}>
            {value ? value : children} {required && <span className="text-red-500 dark:text-red-400">*</span>}
        </label>
    )
}
