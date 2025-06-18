import Avatar from '@/Components/helpers/Avatar.jsx'
import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import FormCard from '@/Components/layout/FormCard.jsx'
import SaveButton from '@/Components/layout/SaveButton.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import { dataObject } from '@/Pages/Language/helper.js'
import { moduleConstants } from '@/Utils/constants.js'
import { permissions } from '@/Utils/permissions/index.js'
import { store, update } from '@actions/LanguageController.js'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Form({ getLanguages, language = null }) {
    const { can } = usePermissions()

    const [action, setAction] = useState(store.route())
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm(dataObject(null))
    const [showSaveButton, setShowSaveButton] = useState(false)

    useEffect(() => {
        setAction(language ? update.route({ language: language.id }) : store.route())
        setData(dataObject(language))
        setShowSaveButton(language ? can(permissions.language.update) : can(permissions.language.create))
    }, [language])

    const submit = (e) => {
        e.preventDefault()

        post(action, {
            onSuccess: (r) => {
                if (!language) {
                    reset('name')
                    reset('code')
                }

                getLanguages()
            },
            onError: () => {},
        })
    }

    return (
        <form onSubmit={submit}>
            <FormCard
                icon={moduleConstants.language.icon}
                title="Language Details"
            >
                <div className="w-full">
                    <div className="relative mb-4">
                        <InputLabel
                            htmlFor="user-name"
                            required={true}
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Name
                        </InputLabel>
                        <TextInput
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            id="user-name"
                            placeholder="Enter language name"
                            required={true}
                            isFocused={true}
                            className="transition-all duration-200 focus:border-primary rounded-md hover:border-primary"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                </div>
                <div className="w-full">
                    <div className="relative">
                        <InputLabel
                            htmlFor="user-code"
                            required={true}
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Code (2 characters)
                        </InputLabel>
                        <TextInput
                            type="text"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            id="user-code"
                            placeholder="e.g. en, fr, es, ms-Arab, scn, zh-TW | ISO language code"
                            required={true}
                            maxLength={8}
                            minLength={2}
                            className="transition-all duration-200 focus:border-primary rounded-md hover:border-primary"
                        />
                        <p className="text-xs text-gray-500 mt-1"></p>
                        <p className="text-md text-yellow-500 mt-1">
                            Make sure the code is correct, all the system will use this code to identify the
                            language.
                        </p>
                        <InputError className="mt-2" message={errors.code} />
                    </div>
                </div>
            </FormCard>

            {showSaveButton && (
                <SaveButton
                    processing={processing}
                    recentlySuccessful={recentlySuccessful}
                />
            )}
        </form>
    )
}
