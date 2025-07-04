import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import FormCard from '@/Components/layout/FormCard.jsx'
import SaveButton from '@/Components/layout/SaveButton.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import { dataObject } from '@/Pages/Section/helper.js'
import DynamicFields from '@/Pages/Section/Partials/DynamicFields.jsx'
import { moduleConstants } from '@/Utils/constants.js'
import { permissions } from '@/Utils/permissions/index.js'
import { store, update } from '@actions/SectionController.js'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Form({ getSections, section = null, languages }) {
    const { can } = usePermissions()

    const [action, setAction] = useState(store.route())
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm(dataObject(null, languages))
    const [showSaveButton, setShowSaveButton] = useState(false)
    const [callDynamicFieldsReset, setCallDynamicFieldsReset] = useState(false)

    useEffect(() => {
        setAction(section ? update.route({ section: section.id }) : store.route())
        setData(dataObject(section, languages))
        setShowSaveButton(section ? can(permissions.section.update) : can(permissions.section.create))
    }, [section])

    const submit = (e) => {
        e.preventDefault()
        post(action, {
            onSuccess: (r) => {
                if (!section) {
                    reset('name')
                    setCallDynamicFieldsReset(true)
                }

                getSections()
            },
            onError: () => {},
        })
    }

    return (
        <form onSubmit={submit}>
            <FormCard
                icon={moduleConstants.section.icon}
                title="Section Details"
            >
                <div className="w-full">
                    <div className="relative mb-4">
                        <InputLabel
                            htmlFor="user-name"
                            required={true}
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Name
                        </InputLabel>
                        <TextInput
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            id="user-name"
                            placeholder="Home Page - Hero"
                            required={true}
                            isFocused={true}
                            icon="ri-edit-line"
                            className="transition-all duration-300"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                </div>
                <div className="w-full">
                    <DynamicFields
                        dataFields={data.fields}
                        setData={setData}
                        languages={languages}
                        callDynamicFieldsReset={callDynamicFieldsReset}
                    />
                </div>
            </FormCard>

            {showSaveButton && (
                <SaveButton
                    processing={processing}
                    recentlySuccessful={recentlySuccessful}
                    className="flex justify-end w-full md:w-2/3 gap-4"
                />
            )}
        </form>
    )
}
