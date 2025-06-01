import InputError from '@/Components/InputError.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import TextInput from '@/Components/TextInput.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import { timeZones } from '@/Utils/constants.js'
import { update } from '@actions/BusinessController.js'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'

export default function GeneralInfo({ business }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: business.name,
        country: business.country,
        address: business.address,
        city: business.city,
        state: business.state,
        zip: business.zip,
        timezone: business.timezone,
    })

    const submit = (e) => {
        e.preventDefault()

        post(update.route({ business: business.id }))
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex items-center">
                        <Avatar size="sm" bgColor="bg-blue-500" icon="ri-building-line" />
                        <h5 className="ml-3 text-lg font-semibold text-gray-800">General information</h5>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <InputLabel htmlFor="business-name" required={true}>
                                Legal business name
                            </InputLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-building-line text-gray-500"></i>
                                </div>
                                <TextInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    id="business-name"
                                    placeholder="Business name"
                                    className="w-full pl-10"
                                />
                            </div>
                            <InputError className="mt-1" message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="country_region" required={true}>
                                Country/region
                            </InputLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-global-line text-gray-500"></i>
                                </div>
                                <select
                                    id="country_region"
                                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
                                    defaultValue={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                >
                                    <option value="US">United States</option>
                                </select>
                            </div>
                            <InputError className="mt-1" message={errors.country} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <InputLabel htmlFor="bill_address">Address</InputLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-map-pin-line text-gray-500"></i>
                                </div>
                                <TextInput
                                    type="text"
                                    id="bill_address"
                                    placeholder="Address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full pl-10"
                                />
                            </div>
                            <InputError className="mt-1" message={errors.address} />
                        </div>
                        <div className="space-y-2 md:col-span-2 lg:col-span-1">
                            <InputLabel htmlFor="bill_city">City</InputLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-building-2-line text-gray-500"></i>
                                </div>
                                <TextInput
                                    type="text"
                                    id="bill_city"
                                    placeholder="City"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    className="w-full pl-10"
                                />
                            </div>
                            <InputError className="mt-1" message={errors.city} />
                        </div>
                        <div className="space-y-2 md:col-span-2 lg:col-span-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="bill_state">State</InputLabel>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="ri-map-2-line text-gray-500"></i>
                                        </div>
                                        <TextInput
                                            type="text"
                                            id="bill_state"
                                            value={data.state}
                                            onChange={(e) => setData('state', e.target.value)}
                                            placeholder="State"
                                            className="w-full pl-10"
                                        />
                                    </div>
                                    <InputError className="mt-1" message={errors.state} />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel htmlFor="bill_pincode">PIN Code</InputLabel>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="ri-hashtag text-gray-500"></i>
                                        </div>
                                        <TextInput
                                            type="number"
                                            id="bill_pincode"
                                            placeholder="PIN Code"
                                            min="0"
                                            max="999999"
                                            value={data.zip}
                                            onChange={(e) => setData('zip', e.target.value)}
                                            className="w-full pl-10"
                                        />
                                    </div>
                                    <InputError className="mt-1" message={errors.zip} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex items-center">
                        <Avatar size="sm" bgColor="bg-purple-500" icon="ri-time-line" />
                        <div className="ml-3">
                            <h5 className="text-lg font-semibold text-gray-800">Time zone</h5>
                            <p className="text-sm text-gray-600 mt-1">
                                Used to calculate stuff like due dates, reminders, and other time-sensitive operations.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <InputLabel htmlFor="timeZones" required={true}>
                                Time Zone
                            </InputLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-time-line text-gray-500"></i>
                                </div>
                                <select
                                    id="timeZones"
                                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
                                    defaultValue={data.timezone}
                                    onChange={(e) => setData('timezone', e.target.value)}
                                >
                                    {timeZones.map((zone, index) => (
                                        <option key={index} value={zone.value}>
                                            {zone.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <InputError className="mt-1" message={errors.timezone} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center gap-5">
                <button
                    disabled={processing}
                    className="inline-flex items-center px-5 py-3 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-secondary focus:bg-primary-dark active:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 shadow-sm hover:shadow-md disabled:opacity-25"
                >
                    <i className="ri-save-line mr-3"></i>
                    Save Changes
                </button>
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-green-600 font-medium">Saved successfully!</p>
                </Transition>
            </div>
        </form>
    )
}
