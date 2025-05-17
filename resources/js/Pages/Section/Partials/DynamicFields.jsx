import { useEffect, useState } from 'react'
import TextInput from '@/Components/TextInput.jsx'
import InputLabel from '@/Components/InputLabel.jsx'

function DynamicFields({ setData }) {
    const [fields, setFields] = useState([])
    const [nextId, setNextId] = useState(1)

    const handleAddField = () => {
        setFields([...fields, { id: nextId }])
        setNextId(nextId + 1)
    }

    const onKeyChange = (id, value) => {
        setFields(fields.map((field) => (field.id === id ? { ...field, key: value } : field)))
    }

    const onValueChange = (id, value) => {
        setFields(fields.map((field) => (field.id === id ? { ...field, value: value } : field)))
    }

    const handleRemoveField = (id) => {
        setFields(fields.filter((field) => field.id !== id))
    }

    useEffect(() => {
        setData('fields', fields)
    }, [fields])

    return (
        <div>
            <div className={'form-floating form-floating-outline'}>
                <TextInput
                    type="text"
                    onChange={(e) => {
                        onKeyChange(0, e.target.value)
                    }}
                    id={'key-0'}
                    placeholder="Title"
                    required={true}
                />
                <InputLabel htmlFor={'key-0'} required={true}>
                    Key
                </InputLabel>
            </div>
            <div className="input-group input-group-merge mt-2">
                <span className="input-group-text">en</span>
                <div className="form-floating form-floating-outline">
                    <TextInput
                        type="text"
                        id={'value-0'}
                        placeholder="Key Value - en"
                        required={true}
                        onChange={(e) => {
                            onValueChange(0, e.target.value)
                        }}
                    />
                    <label htmlFor={'value-0'}>Value</label>
                </div>
            </div>

            {fields.map((field) => (
                <div key={field.id}>
                    <div className={'form-floating form-floating-outline mt-16'}>
                        <TextInput
                            type="text"
                            onChange={(e) => {
                                onKeyChange(field.id, e.target.value)
                            }}
                            id={'key-' + field.id}
                            placeholder="Title"
                            required={true}
                        />
                        <InputLabel htmlFor={'key-' + field.id} required={true}>
                            Key
                        </InputLabel>
                    </div>
                    <div className="input-group input-group-merge mt-2">
                        <span className="input-group-text">en</span>
                        <div className="form-floating form-floating-outline">
                            <TextInput
                                type="text"
                                id={'value-' + field.id}
                                placeholder="Key Value - en"
                                aria-label="Value"
                                aria-describedby={'value-' + field.id}
                                required={true}
                                onChange={(e) => {
                                    onValueChange(field.id, e.target.value)
                                }}
                            />
                            <label htmlFor={'value-' + field.id}>Value</label>
                        </div>
                    </div>
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
