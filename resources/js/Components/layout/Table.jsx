import DisplayMessage from '@/Components/DisplayMessage.jsx'
import Loading from '@/Components/Loading.jsx'
import { parseQueryString, toTitleCase } from '@/Utils/methods.js'
import { useEffect, useState } from 'react'

const TableContainer = ({ columns, data, tdClassName, setLoading, refresher }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg mt-6 border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="overflow-x-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-100">
                    <SearchForm setLoading={setLoading} refresher={refresher} />
                    <div className="py-5 px-6 text-end">
                        <h5 className="text-lg font-medium text-gray-700 flex items-center">
                            Total Records:
                            <span className="ml-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm transition-all duration-300 hover:shadow-md">
                                {data.length}
                            </span>
                        </h5>
                    </div>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase">
                        <tr className="bg-gray-800 text-white">
                            {columns.map((column, index) => (
                                <th key={index} className="px-6 py-4 font-medium tracking-wider">
                                    {toTitleCase(column)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="bg-white transition-colors duration-200 ease-in-out hover:bg-blue-50"
                            >
                                {Object.values(row).map((cell, index) => (
                                    <td
                                        key={index}
                                        className={`px-6 py-4 ${
                                            tdClassName.filter((item) => item.column === columns[index])[0]
                                                ?.className || ''
                                        }`}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const SearchForm = ({ setLoading, refresher }) => {
    const [query, setQuery] = useState('')

    useEffect(() => setQuery(parseQueryString()['q']), [])
    const searchSubmission = (e) => {
        e.preventDefault()

        if (typeof query === 'undefined') {
            return
        }

        window.history.pushState({}, '', `?${new URLSearchParams({ q: query })}`)
        setLoading(true)
        setTimeout(() => {
            refresher(parseQueryString())
                .then()
                .finally(() => {
                    setLoading(false)
                })
        }, 200)
    }

    return (
        <form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-6 py-5" onSubmit={searchSubmission}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="ri-search-line text-gray-400 group-focus-within:text-primary transition-colors duration-200"></i>
                </div>
                <input
                    type="search"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out"
                    id="search"
                    value={query}
                    placeholder="Search Query..."
                    aria-describedby="search-help"
                    name="q"
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus={true}
                />
                <label
                    htmlFor="search"
                    className="absolute -top-2 left-2 inline-block bg-white px-1.5 text-xs font-medium text-gray-600 transition-all duration-200 group-focus-within:text-primary"
                >
                    Search
                </label>
            </div>
        </form>
    )
}

export default function Table({ data, tdClassName = [], setLoading, loading, permission, refresher }) {
    const columns = data.length > 0 ? Object.keys(data[0]).map(toTitleCase) : []

    return permission ? (
        loading ? (
            <div className="bg-white rounded-xl shadow-lg mt-6 border border-gray-100 p-8 flex justify-center items-center min-h-[200px]">
                <Loading />
            </div>
        ) : data.length > 0 ? (
            <TableContainer
                columns={columns}
                data={data}
                tdClassName={tdClassName}
                setLoading={setLoading}
                refresher={refresher}
            />
        ) : (
            <div className="bg-white rounded-xl shadow-lg mt-6 border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="border-b border-gray-100">
                    <SearchForm setLoading={setLoading} refresher={refresher} />
                </div>
                <div className="p-8 flex justify-center items-center">
                    <DisplayMessage text="No data available." type="info" />
                </div>
            </div>
        )
    ) : (
        <div className="bg-white rounded-xl shadow-lg mt-6 border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl p-8 flex justify-center items-center min-h-[200px]">
            <DisplayMessage text="You do not have permission to view this content..." type="error" />
        </div>
    )
}
