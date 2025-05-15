export default function Preview({ medium }) {
    return (
        <a href={medium.url} target="_blank" className="text-blue-500 hover:text-blue-700" rel="noopener noreferrer">
            <img className={'h-10 w-10 rounded-full'} src={medium.preview} alt={medium.name} />
        </a>
    )
}
