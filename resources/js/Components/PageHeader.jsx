export default function PageHeader({ title, subtitle, action = null }) {
    return (
        <div className="col-12 mb-8 mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/10 p-6 transition-colors duration-250">
                <div className={'flex flex-col md:flex-row md:items-center md:justify-between gap-4'}>
                    <div className="flex-1">
                        <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center transition-colors duration-250">{title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-3xl transition-colors duration-250">{subtitle}</p>
                    </div>
                    <div className="flex-shrink-0">{action ? action : null}</div>
                </div>
            </div>
        </div>
    )
}
