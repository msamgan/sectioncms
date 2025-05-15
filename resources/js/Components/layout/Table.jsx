import Loading from '@/Components/Loading.jsx'
import DisplayMessage from '@/Components/DisplayMessage.jsx'
import { parseQueryString, toTitleCase } from '@/Utils/methods.js'
import { useState } from 'react'
import { useEffect } from 'react'

const TableContainer = ({ columns, data, tdClassName }) => {
    const [query, setQuery] = useState('')

    useEffect(() => setQuery(parseQueryString()), [])

    return (
        <div className="card mt">
            <div className="table-responsive text-nowrap">
                <div className={'flex justify-between'}>
                    <form className={'w-1/3'}>
                        <div className="form-floating form-floating-outline ml-2 mt-3">
                            <input
                                type="search"
                                className="form-control rounded"
                                id="search"
                                value={query?.q}
                                placeholder="Search Query..."
                                aria-describedby="search-help"
                                name={'q'}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <label htmlFor="search">Search</label>
                        </div>
                    </form>
                    <h5 className="card-header text-end text-lg font-light">
                        Total Records:
                        <span className="badge rounded-pill ms-4 bg-primary">{data.length}</span>
                    </h5>
                </div>
                <table className="table-sm table">
                    <thead className={'table-dark'}>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{toTitleCase(column)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {data.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((cell, index) => (
                                    <td
                                        key={index}
                                        className={
                                            tdClassName.filter((item) => item.column === columns[index])[0]?.className
                                        }
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

export default function Table({ data, tdClassName = [], loading, permission }) {
    const columns = data.length > 0 ? Object.keys(data[0]).map(toTitleCase) : []

    return permission ? (
        loading ? (
            <Loading />
        ) : data.length > 0 ? (
            <TableContainer columns={columns} data={data} tdClassName={tdClassName} />
        ) : (
            <DisplayMessage text={'No data available.'} />
        )
    ) : (
        <DisplayMessage text={'You do not have permission to view this content...'} />
    )
}
