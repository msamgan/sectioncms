import TextInput from '@/Components/TextInput.jsx'
import InputLabel from '@/Components/InputLabel.jsx'
import { useForm } from '@inertiajs/react'
import { timeZones } from '@/Utils/constants.js'
import InputError from '@/Components/InputError.jsx'
import { Transition } from '@headlessui/react'
import { update } from '@actions/BusinessController.js'

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
        <form onSubmit={submit}>
            <div className="card mb-6">
                <div className="card-header">
                    <h5 className="card-title m-0">General information</h5>
                </div>
                <div className="card-body">
                    <div className="row g-5">
                        <div className="col-12 col-md-6">
                            <div className="form-floating form-floating-outline">
                                <TextInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    id="business-name"
                                    placeholder="Business name"
                                />
                                <InputLabel htmlFor="business-name" required={true}>
                                    Legal business name
                                </InputLabel>
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-floating form-floating-outline">
                                <select
                                    id="country_region"
                                    className="select2 form-select"
                                    data-placeholder="United States"
                                    defaultValue={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                >
                                    <option value="US">United States</option>
                                </select>
                                <InputLabel htmlFor="country_region" required={true}>
                                    Country/region
                                </InputLabel>
                                <InputError className="mt-2" message={errors.country} />
                            </div>
                        </div>
                        <div className="col-12 col-md-12">
                            <div className="form-floating form-floating-outline">
                                <TextInput
                                    type="text"
                                    id="bill_address"
                                    placeholder="Address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                <InputLabel htmlFor="bill_address">Address</InputLabel>
                                <InputError className="mt-2" message={errors.address} />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-floating form-floating-outline">
                                <TextInput
                                    type="text"
                                    id="bill_city"
                                    placeholder="City"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                />
                                <InputLabel htmlFor="bill_city">City</InputLabel>
                                <InputError className="mt-2" message={errors.city} />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-floating form-floating-outline">
                                <TextInput
                                    type="text"
                                    id="bill_state"
                                    value={data.state}
                                    onChange={(e) => setData('state', e.target.value)}
                                    placeholder="State"
                                />
                                <InputLabel htmlFor="bill_state">State</InputLabel>
                                <InputError className="mt-2" message={errors.state} />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-floating form-floating-outline">
                                <TextInput
                                    type="number"
                                    id="bill_pincode"
                                    className="form-control"
                                    placeholder="PIN Code"
                                    min="0"
                                    max="999999"
                                    value={data.zip}
                                    onChange={(e) => setData('zip', e.target.value)}
                                />
                                <InputLabel htmlFor="bill_pincode">PIN Code</InputLabel>
                                <InputError className="mt-2" message={errors.zip} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-6">
                <div className="card-header">
                    <div className="card-title mb-0">
                        <h5 className="mb-0">Time zone and units of measurement</h5>
                        <p className="card-subtitle mt-0">
                            Used to calculate product prices, shipping weighs, and order times.
                        </p>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row g-5">
                        <div className="col-12">
                            <div className="form-floating form-floating-outline">
                                <select
                                    id="timeZones"
                                    className="select2 form-select"
                                    data-placeholder="(GMT-12:00) International Date Line West"
                                    defaultValue={data.timezone}
                                    onChange={(e) => setData('timezone', e.target.value)}
                                >
                                    {timeZones.map((zone, index) => (
                                        <option key={index} value={zone.value}>
                                            {zone.label}
                                        </option>
                                    ))}
                                </select>
                                <InputLabel htmlFor="timeZones" required={true}>
                                    Time Zone
                                </InputLabel>
                                <InputError className="mt-2" message={errors.timezone} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end gap-4">
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
        </form>
    )
}
