export default function PageHeader({ title, subtitle, action = null }) {
    return (
        <div className="col-12 mb-8 mt-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary">
                <div className={'flex flex-col md:flex-row md:items-center md:justify-between gap-4'}>
                    <div className="flex-1">
                        <h4 className="text-2xl font-semibold text-gray-800 flex items-center">{title}</h4>
                        <p className="text-gray-600 mt-2 max-w-3xl">{subtitle}</p>
                    </div>
                    <div className="flex-shrink-0">{action ? action : null}</div>
                </div>
            </div>
        </div>
    )
}
