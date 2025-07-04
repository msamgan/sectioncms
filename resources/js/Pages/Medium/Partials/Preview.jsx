export default function Preview({ medium }) {
    return (
        <a href={medium.url} target="_blank" className="text-blue-500 hover:text-blue-700" rel="noopener noreferrer">
            {medium.type.startsWith('image/') ? (
                <img className={'h-10 w-10 rounded-full'} src={medium.url} alt={medium.name} />
            ) : (
                <div className={'h-10 w-10 rounded-full flex items-center justify-center bg-gray-200'}>
                    <i className="ri-file-text-line text-gray-500"></i>
                </div>
            )}
        </a>
    )
}
