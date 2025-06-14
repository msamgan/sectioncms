import DisplayMessage from '@/Components/DisplayMessage.jsx'
import Loading from '@/Components/Loading.jsx'
import { parseQueryString, toTitleCase } from '@/Utils/methods.js'
import { useEffect, useState } from 'react'

const TableContainer = ({ columns, data, tdClassName, setLoading, refresher }) => {
    return (
        <div className="bg-white rounded-md mt-6 border border-gray-200 overflow-hidden transition-all duration-300">
            <div className="overflow-x-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
                    <SearchForm setLoading={setLoading} refresher={refresher} />
                    <div className="py-4 px-6 text-end">
                        <h5 className="text-sm font-medium text-gray-700 flex items-center">
                            Total Records:
                            <span className="ml-2 text-[#3B82F6] text-xs font-medium px-2">
                                {data.length}
                            </span>
                        </h5>
                    </div>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="text-xs">
                        <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            {columns.map((column, index) => (
                                <th key={index} className="px-6 py-3 font-medium tracking-wider">
                                    {toTitleCase(column)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="bg-white transition-colors duration-200 ease-in-out hover:bg-gray-50"
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
        <form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-6 py-4" onSubmit={searchSubmission}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="ri-search-line text-gray-400 group-focus-within:text-[#3B82F6] transition-colors duration-200"></i>
                </div>
                <input
                    type="search"
                    className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 ease-in-out"
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
                    className="absolute -top-2 left-2 inline-block bg-white px-1.5 text-xs font-medium text-gray-600 transition-all duration-200 group-focus-within:text-[#3B82F6]"
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
            <div className="bg-white rounded-md mt-6 border border-gray-200 p-6 flex justify-center items-center min-h-[200px]">
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
            <div className="bg-white rounded-md mt-6 border border-gray-200 overflow-hidden transition-all duration-300">
                <div className="border-b border-gray-200">
                    <SearchForm setLoading={setLoading} refresher={refresher} />
                </div>
                <div className="p-6 flex justify-center items-center">
                    <DisplayMessage text="No data available." type="info" />
                </div>
            </div>
        )
    ) : (
        <div className="bg-white rounded-md mt-6 border border-gray-200 overflow-hidden transition-all duration-300 p-6 flex justify-center items-center min-h-[200px]">
            <DisplayMessage text="You do not have permission to view this content..." type="error" />
        </div>
    )
}
