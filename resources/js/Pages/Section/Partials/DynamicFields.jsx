import { makeLanguageObject } from '@/Pages/Section/helper.js'
import DynamicFieldKeys from '@/Pages/Section/Partials/DynamicFieldKeys.jsx'
import { useEffect, useState } from 'react'

function DynamicFields({ dataFields, setData, languages, callDynamicFieldsReset }) {
    const [fields, setFields] = useState([{ id: 1, key: '', value: makeLanguageObject(languages) }])
    const [nextId, setNextId] = useState(1)
    const [locked, setLocked] = useState(false)
    const [error, setError] = useState(null)

    const resetFields = () => {
        setFields([{ id: 1, key: '', value: makeLanguageObject(languages) }])
        setNextId(2)
        setLocked(false)
        setError(null)
    }

    const handleAddField = () => {
        setFields([...fields, { id: nextId, key: '', value: makeLanguageObject(languages) }])
        setNextId(nextId + 1)
    }

    const onKeyChange = (id, value) => {
        setLocked(false)
        setFields(fields.map((field) => (field.id === id ? { ...field, key: value } : field)))
    }

    const onValueChange = (id, value, lang) => {
        setLocked(false)
        setFields(
            fields.map((field) => (field.id === id ? { ...field, value: { ...field.value, [lang]: value } } : field)),
        )
    }

    const handleRemoveField = (id) => {
        if (fields.length <= 1) {
            setError('At least one key is required.')
            setTimeout(() => setError(null), 3000)
            return
        }

        setLocked(false)
        setFields(fields.filter((field) => field.id !== id))
    }

    useEffect(() => {
        if (locked) {
            return
        }

        setData('fields', fields)
    }, [fields])

    useEffect(() => {
        if (callDynamicFieldsReset) {
            resetFields()
        }
    }, [callDynamicFieldsReset])

    useEffect(() => {
        setLocked(true)
        setFields(dataFields)
        setNextId(dataFields.length + 1)
    }, [dataFields])

    return (
        <div>
            {fields.map((field) => (
                <DynamicFieldKeys
                    setError={setError}
                    setFields={setFields}
                    fields={fields}
                    key={field.id}
                    field={field}
                    onKeyChange={onKeyChange}
                    onValueChange={onValueChange}
                    handleRemoveField={handleRemoveField}
                />
            ))}

            <button
                type="button"
                onClick={handleAddField}
                className="bg-primary hover:bg-blue-700 text-white flex items-center shadow-md transition-all duration-300 hover:shadow-xl px-4 py-2 rounded-lg font-medium text-sm mt-8"
            >
                <i className="ri-add-line mr-1"></i> Add Key
            </button>

            <div className="text-red-500 mb-4 float-end">{error && <span className="text-sm">{error}</span>}</div>
        </div>
    )
}

export default DynamicFields
