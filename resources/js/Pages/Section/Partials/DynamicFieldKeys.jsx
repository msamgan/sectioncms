import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import { slugify } from '@/Utils/methods.js'
import { translate } from '@actions/TranslationController.js'
import { useState } from 'react'

export default function DynamicFieldKeys({
    setError,
    setFields,
    fields,
    field,
    onKeyChange,
    onValueChange,
    handleRemoveField,
}) {
    const [translating, setTranslating] = useState(false)

    const handleTranslateWithAI = (id) => {
        let valueToTranslate = Object.values(field.value).filter((value) => value.trim() !== '')
        let lagToSkip = Object.keys(field.value).find((lang) => field.value[lang].trim() !== '')

        if (valueToTranslate.length === 0) {
            setError('Please fill in at least one value before translating.')
            setTimeout(() => setError(null), 3000)
            return
        }

        setTranslating(true)
        translate
            .call({
                data: {
                    language: lagToSkip,
                    value: valueToTranslate[0], // Assuming we want to translate the first non-empty value
                },
            })
            .then((r) => r.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                    setTimeout(() => setError(null), 3000)
                    return
                }

                let field = fields.find((field) => field.id === id)
                Object.keys(field.value).forEach((lang) => {
                    if (lang !== lagToSkip) {
                        field.value[lang] = data.payload[lang] || ''
                    }
                })

                setFields(fields.map((f) => (f.id === id ? field : f)))
            })
            .finally(() => {
                setTranslating(false)
            })
    }

    return (
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
            <button
                type="button"
                onClick={() => handleTranslateWithAI(field.id)}
                className="float-right mt-2 text-blue-500 hover:text-blue-700 flex items-center text-sm font-medium mr-4"
                disabled={translating}
            >
                <i className="ri-translate mr-1"></i>
                {translating ? ' Translating...' : 'Translate with AI'}
            </button>
        </div>
    )
}
