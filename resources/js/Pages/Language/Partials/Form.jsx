import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import InputError from '@/Components/InputError.jsx'
import { Transition } from '@headlessui/react'
import { dataObject } from '@/Pages/Language/helper.js'
import { useEffect, useState } from 'react'
import { store, update } from '@actions/LanguageController.js'
import usePermissions from '@/Hooks/usePermissions.js'
import { permissions } from '@/Utils/permissions/index.js'

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
                }

                getLanguages()
            },
            onError: () => {},
        })
    }

    return (
        <form onSubmit={submit}>
            <div className="card mb-6 w-2/3">
                <div className="card-header">
                    <h5 className="card-title m-0 text-lg">Language Details</h5>
                </div>
                <div className="card-body">
                    <div className="row g-5">
                        <div className="col-12 col-md-12">
                            <div className="form-floating form-floating-outline">
                                <TextInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    id="user-name"
                                    placeholder="Name"
                                    required={true}
                                    isFocused={true}
                                />
                                <InputLabel htmlFor="user-name" required={true}>
                                    Name
                                </InputLabel>
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                        </div>
                        <div className="col-12 col-md-12">
                            <div className="form-floating form-floating-outline">
                                <TextInput
                                    type="text"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    id="user-code"
                                    placeholder="Code (e.g. en)"
                                    required={true}
                                    maxlength={2}
                                    minlength={2}
                                />
                                <InputLabel htmlFor="user-code" required={true}>
                                    Code (2 characters)
                                </InputLabel>
                                <InputError className="mt-2" message={errors.code} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showSaveButton && (
                <div className="d-flex justify-content-end w-2/3 gap-4">
                    <button disabled={processing} className="btn btn-primary">
                        Save Changes
                    </button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="mt-3 text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            )}
        </form>
    )
}
