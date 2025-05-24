import Avatar from '@/Components/helpers/Avatar.jsx'
import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import usePermissions from '@/Hooks/usePermissions.js'
import { dataObject } from '@/Pages/Section/helper.js'
import DynamicFields from '@/Pages/Section/Partials/DynamicFields.jsx'
import { moduleConstants } from '@/Utils/constants.js'
import { permissions } from '@/Utils/permissions/index.js'
import { store, update } from '@actions/SectionController.js'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Form({ getSections, section = null, languages }) {
    const { can } = usePermissions()

    const [action, setAction] = useState(store.route())
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm(dataObject(null, languages))
    const [showSaveButton, setShowSaveButton] = useState(false)

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
                }

                getSections()
            },
            onError: () => {},
        })
    }

    return (
        <form onSubmit={submit}>
            <div className="card mb-6 w-2/3 shadow-sm transition-all duration-200 hover:shadow-lg">
                <div className="card-header border-bottom bg-light-subtle">
                    <div className="d-flex align-items-center">
                        <Avatar
                            size="sm"
                            bgColor={moduleConstants.section.bgColor}
                            icon={moduleConstants.section.icon}
                        />
                        <h5 className="card-title m-0 text-lg font-semibold">Section Details</h5>
                    </div>
                </div>
                <div className="card-body mt-4">
                    <div className="row g-5">
                        <div className="col-12 col-md-12">
                            <div className="form-floating form-floating-outline">
                                <TextInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    id="user-name"
                                    placeholder="Home Page - Hero"
                                    required={true}
                                    isFocused={true}
                                    className="shadow-sm transition-all duration-200 focus:shadow-md"
                                />
                                <InputLabel htmlFor="user-name" required={true}>
                                    Name
                                </InputLabel>
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                        </div>
                        <div className="col-12 col-md-12">
                            <DynamicFields dataFields={data.fields} setData={setData} languages={languages} />
                        </div>
                    </div>
                </div>
            </div>

            {showSaveButton && (
                <div className="d-flex justify-content-end w-2/3 gap-4">
                    <button
                        disabled={processing}
                        className="btn btn-primary d-inline-flex align-items-center shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        <i className="ri-save-line me-2"></i>
                        Save Changes
                    </button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <div className="d-flex align-items-center mt-2">
                            <Avatar
                                size="xs"
                                bgColor={moduleConstants.submit.bgColor}
                                icon={moduleConstants.submit.icon}
                            />
                            <p className="text-success mb-0">Saved successfully!</p>
                        </div>
                    </Transition>
                </div>
            )}
        </form>
    )
}
