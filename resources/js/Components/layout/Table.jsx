import DisplayMessage from '@/Components/DisplayMessage.jsx'
import LoadingIndicator from '@/Components/LoadingIndicator.jsx'
import { parseQueryString, toTitleCase } from '@/Utils/methods.js'
import { useEffect, useState } from 'react'

const TableContainer = ({ columns, data, tdClassName, setLoading, refresher }) => {
    const [sortColumn, setSortColumn] = useState(null)
    const [sortDirection, setSortDirection] = useState('asc')
    const [hoveredRow, setHoveredRow] = useState(null)

    const handleSort = (columnIndex) => {
        if (sortColumn === columnIndex) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(columnIndex)
            setSortDirection('asc')
        }
    }

    // Sort data if a column is selected
    const sortedData = [...data]
    if (sortColumn !== null) {
        const columnName = columns[sortColumn].toLowerCase()
        sortedData.sort((a, b) => {
            const valueA = a[columnName]
            const valueB = b[columnName]

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
            } else {
                return sortDirection === 'asc' ? valueA - valueB : valueB - valueA
            }
        })
    }

    return (
        <div className="bg-white rounded-xl shadow-sm mt-6 overflow-hidden transition-all duration-250">
            <div className="overflow-x-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 bg-gray-50">
                    <SearchForm setLoading={setLoading} refresher={refresher} />
                    <div className="py-4 px-6 flex items-center justify-between w-full sm:w-auto gap-3">
                        <h5 className="text-sm font-medium text-gray-700 flex items-center">
                            <i className="ri-database-2-line mr-2 text-primary"></i>
                            Total Records:
                            <span className="ml-2 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                                {data.length}
                            </span>
                        </h5>
                        <button
                            onClick={() => {
                                refresher(parseQueryString()).then()
                            }}
                            className="p-2 rounded-lg text-gray-600 hover:text-primary transition-colors"
                            title="Refresh list"
                        >
                            <i className="ri-refresh-line"></i>
                        </button>
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs sticky top-0 z-10">
                            <tr className="bg-gray-50 text-gray-800 border-b border-gray-200">
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="px-6 py-5 font-bold text-sm tracking-wide cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
                                        onClick={() => handleSort(index)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="group-hover:text-primary transition-colors duration-200">
                                                {toTitleCase(column)}
                                            </span>
                                            <div className="ml-2">
                                                {sortColumn === index ? (
                                                    <i
                                                        className={`text-primary ${sortDirection === 'asc' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}
                                                    ></i>
                                                ) : (
                                                    <i className="ri-arrow-up-down-line text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></i>
                                                )}
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sortedData.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`transition-all duration-200 ease-in-out group ${
                                        hoveredRow === rowIndex 
                                            ? 'bg-blue-50 shadow-sm border-l-4 border-l-primary' 
                                            : 'bg-white hover:bg-gray-50'
                                    }`}
                                    onMouseEnter={() => setHoveredRow(rowIndex)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    {Object.values(row).map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className={`px-6 py-4 text-gray-700 text-sm font-medium transition-colors duration-200 ${
                                                hoveredRow === rowIndex ? 'text-gray-900' : ''
                                            } ${
                                                tdClassName.filter((item) => item.column === columns[cellIndex])[0]
                                                    ?.className || ''
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <span className="truncate max-w-xs">
                                                    {cell}
                                                </span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const SearchForm = ({ setLoading, refresher }) => {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)

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
            <div
                className={`relative group transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}
            >
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isFocused ? 'bg-blue-100' : 'bg-gray-50'
                        }`}
                    >
                        <i
                            className={`ri-search-line ${isFocused ? 'text-primary' : 'text-gray-400'} transition-colors duration-300`}
                        ></i>
                    </div>
                </div>
                <input
                    type="search"
                    className={`w-full pl-12 pr-16 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                        isFocused ? 'shadow-md' : 'shadow-sm'
                    }`}
                    id="search"
                    value={query}
                    placeholder="Search records..."
                    aria-describedby="search-help"
                    name="q"
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm">
                    <span
                        className={`px-3 py-2 rounded-md transition-all duration-200 ${
                            isFocused
                                ? 'bg-primary text-white shadow-sm'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        <i className="ri-search-line"></i>
                    </span>
                </button>
            </div>
        </form>
    )
}

export default function Table({ data, tdClassName = [], setLoading, loading, permission, refresher }) {
    const columns = data.length > 0 ? Object.keys(data[0]).map(toTitleCase) : []

    return permission ? (
        loading ? (
            <div className="bg-white rounded-xl shadow-sm mt-6 p-8 flex justify-center items-center min-h-[300px] border border-gray-100">
                <LoadingIndicator type="wave" size="lg" text="Loading data" center={true} fullHeight={true} />
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
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md mt-6 overflow-hidden transition-all duration-300">
                <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                    <SearchForm setLoading={setLoading} refresher={refresher} />
                </div>
                <div className="p-8 flex justify-center items-center bg-gradient-to-b from-white to-gray-50">
                    <DisplayMessage
                        title="No Data Available"
                        text="Try adjusting your search criteria or adding new records."
                        type="empty"
                        icon="ri-inbox-line"
                        className="transform transition-all duration-300"
                        action="Add New Record"
                        onAction={() => {
                            // Trigger the creation button if available
                            const createButton = document.querySelector('[data-bs-toggle="offcanvas"]')
                            if (createButton) {
                                createButton.click()
                            }
                        }}
                    />
                </div>
            </div>
        )
    ) : (
        <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm hover:shadow-md mt-6 overflow-hidden transition-all duration-300 p-8 flex justify-center items-center min-h-[250px]">
            <DisplayMessage
                title="Access Restricted"
                text="You do not have permission to view this content. Please contact your administrator for access."
                type="error"
                icon="ri-lock-line"
                className="max-w-lg transform hover:scale-105 transition-all duration-300"
            />
        </div>
    )
}
