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
                    <div className="py-4 px-6 text-end">
                        <h5 className="text-sm font-medium text-gray-700 flex items-center">
                            <i className="ri-database-2-line mr-2 text-primary"></i>
                            Total Records:
                            <span className="ml-2 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                                {data.length}
                            </span>
                        </h5>
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs sticky top-0 z-10">
                            <tr className="bg-white text-gray-700 border-b border-gray-200 shadow-sm">
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                                        onClick={() => handleSort(index)}
                                    >
                                        <div className="flex items-center">
                                            {toTitleCase(column)}
                                            {sortColumn === index && (
                                                <i
                                                    className={`ml-1 text-primary ${sortDirection === 'asc' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}
                                                ></i>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sortedData.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`transition-all duration-150 ease-in-out ${
                                        hoveredRow === rowIndex ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                                    }`}
                                    onMouseEnter={() => setHoveredRow(rowIndex)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    {Object.values(row).map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className={`px-6 py-4 max-w-xs truncate ${
                                                tdClassName.filter((item) => item.column === columns[cellIndex])[0]
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
            <div className={`relative group transition-all duration-200 ${isFocused ? 'scale-[1.02]' : ''}`}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i
                        className={`ri-search-line ${isFocused ? 'text-primary' : 'text-gray-400'} transition-colors duration-200`}
                    ></i>
                </div>
                <input
                    type="search"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ease-in-out"
                    id="search"
                    value={query}
                    placeholder="Search Query..."
                    aria-describedby="search-help"
                    name="q"
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <label
                    htmlFor="search"
                    className={`absolute -top-2 left-2 inline-block bg-white px-1.5 text-xs font-medium ${
                        isFocused ? 'text-primary' : 'text-gray-600'
                    } transition-all duration-200`}
                >
                    Search
                </label>
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm">
                    <span
                        className={`px-2 py-1 rounded-md ${isFocused ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'} transition-all duration-200`}
                    >
                        <i className="ri-arrow-right-line"></i>
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
            <div className="bg-white rounded-xl shadow-sm mt-6 p-8 flex justify-center items-center min-h-[300px]">
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
            <div className="bg-white rounded-xl shadow-sm mt-6 overflow-hidden transition-all duration-250">
                <div className="border-b border-gray-200 bg-gray-50">
                    <SearchForm setLoading={setLoading} refresher={refresher} />
                </div>
                <div className="p-8 flex justify-center items-center min-h-[250px]">
                    <DisplayMessage
                        title="No Data Available"
                        text="Try adjusting your search criteria or adding new records."
                        type="empty"
                        icon="ri-inbox-line"
                        className="max-w-lg"
                        action="Add New Record"
                        onAction={() => {
                            // Trigger the create button if available
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
        <div className="bg-white rounded-xl shadow-sm mt-6 overflow-hidden transition-all duration-250 p-8 flex justify-center items-center min-h-[250px]">
            <DisplayMessage
                title="Access Restricted"
                text="You do not have permission to view this content. Please contact your administrator for access."
                type="error"
                icon="ri-lock-line"
                className="max-w-lg"
            />
        </div>
    )
}
