import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import { makeLanguageObject } from '@/Pages/Section/helper.js'
import { slugify } from '@/Utils/methods.js'
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
                <div key={field.id}>
                    <div className={'relative mt-8'}>
                        <InputLabel
                            htmlFor={'key-' + field.id}
                            required={true}
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Key
                        </InputLabel>
                        <TextInput
                            type="text"
                            value={field.key}
                            onChange={(e) => {
                                onKeyChange(field.id, e.target.value)
                            }}
                            onBlur={(e) => {
                                onKeyChange(field.id, slugify(e.target.value))
                            }}
                            id={'key-' + field.id}
                            placeholder="Title"
                            required={true}
                            className="shadow-sm transition-all duration-200 focus:shadow-md focus:border-primary rounded-md hover:border-primary"
                        />
                    </div>

                    {Object.keys(field.value).map((lang) => (
                        <div className="flex items-center mt-4" key={lang}>
                            <span className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 text-gray-700 font-medium">
                                {lang}
                            </span>
                            <div className="flex-grow relative">
                                <TextInput
                                    type="text"
                                    value={field.value[lang]}
                                    id={'value-' + field.id + '-' + lang}
                                    placeholder={'Enter value for ' + lang}
                                    aria-label="Value"
                                    aria-describedby={'value-' + field.id}
                                    required={true}
                                    onChange={(e) => {
                                        onValueChange(field.id, e.target.value, lang)
                                    }}
                                    className="rounded-l-none shadow-sm transition-all duration-200 focus:shadow-md focus:border-primary hover:border-primary"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => handleRemoveField(field.id)}
                        className="float-right mt-2 text-red-500 hover:text-red-700 flex items-center text-sm font-medium"
                    >
                        <i className="ri-delete-bin-line mr-1"></i> Remove
                    </button>
                </div>
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
