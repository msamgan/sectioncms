import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import { makeLanguageObject } from '@/Pages/Section/helper.js'
import { slugify } from '@/Utils/methods.js'
import { useEffect, useState } from 'react'

function DynamicFields({ dataFields, setData, languages }) {
    const [fields, setFields] = useState([{ id: 1, key: '', value: makeLanguageObject(languages) }])
    const [nextId, setNextId] = useState(1)
    const [locked, setLocked] = useState(false)

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
        setFields(fields.filter((field) => field.id !== id))
    }

    useEffect(() => {
        if (locked) {
            return
        }

        setData('fields', fields)
    }, [fields])

    useEffect(() => {
        setLocked(true)
        setFields(dataFields)
        setNextId(dataFields.length + 1)
    }, [dataFields])

    return (
        <div>
            {fields.map((field) => (
                <div key={field.id}>
                    <div className={'form-floating form-floating-outline mt-16'}>
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
                        />
                        <InputLabel htmlFor={'key-' + field.id} required={true}>
                            Key
                        </InputLabel>
                    </div>

                    {Object.keys(field.value).map((lang) => (
                        <div className="input-group input-group-merge mt-4" key={lang}>
                            <span className="input-group-text">{lang}</span>
                            <div className="form-floating form-floating-outline">
                                <TextInput
                                    type="text"
                                    value={field.value[lang]}
                                    id={'value-' + field.id}
                                    placeholder={'Key Value - ' + lang}
                                    aria-label="Value"
                                    aria-describedby={'value-' + field.id}
                                    required={true}
                                    onChange={(e) => {
                                        onValueChange(field.id, e.target.value, lang)
                                    }}
                                />
                                <label htmlFor={'value-' + field.id}>Value - {lang}</label>
                            </div>
                        </div>
                    ))}

                    <button type="button" onClick={() => handleRemoveField(field.id)} className={'float-end mt-1'}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddField} className={'btn btn-primary mt-16'}>
                Add Key
            </button>
        </div>
    )
}

export default DynamicFields
