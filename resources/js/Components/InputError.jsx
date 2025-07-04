export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm font-semibold text-red-600 dark:text-red-400 ' + className}>
            {message}
        </p>
    ) : null
}
