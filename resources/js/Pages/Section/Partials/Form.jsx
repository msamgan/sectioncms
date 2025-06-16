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
            <div className="mb-6 w-full md:w-2/3 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 p-5">
                    <div className="flex items-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 shadow-md">
                            <Avatar
                                size="sm"
                                bgColor="transparent"
                                icon={moduleConstants.section.icon}
                                className="text-white"
                            />
                        </div>
                        <h5 className="text-lg font-medium text-white ml-3">Section Details</h5>
                    </div>
                </div>
                <div className="p-6 bg-gray-50">
                    <div className="space-y-6">
                        <div className="w-full bg-white p-5 rounded-lg shadow-sm">
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
                                    placeholder="Home Page - Hero"
                                    required={true}
                                    isFocused={true}
                                    icon="ri-edit-line"
                                    className="transition-all duration-300"
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                        </div>
                        <div className="w-full bg-white p-5 rounded-lg shadow-sm">
                            <DynamicFields
                                dataFields={data.fields}
                                setData={setData}
                                languages={languages}
                                callDynamicFieldsReset={callDynamicFieldsReset}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showSaveButton && (
                <div className="flex justify-end w-full md:w-2/3 gap-4">
                    <button
                        disabled={processing}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:translate-y-[-1px] text-white flex items-center transition-all duration-300 px-5 py-2.5 rounded-lg font-medium text-sm shadow-md"
                    >
                        <i className="ri-save-line mr-2"></i>
                        Save Changes
                    </button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 transform scale-95"
                        enterTo="opacity-100 transform scale-100"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100 transform scale-100"
                        leaveTo="opacity-0 transform scale-95"
                    >
                        <div className="flex items-center bg-green-50 px-4 py-2.5 rounded-lg border border-green-200 shadow-sm">
                            <div className="text-green-500 mr-2">
                                <i className="ri-check-line"></i>
                            </div>
                            <p className="text-green-600 m-0 text-sm">Saved successfully!</p>
                        </div>
                    </Transition>
                </div>
            )}
        </form>
    )
}
