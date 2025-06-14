import { toggleAutoTranslation } from '@actions/BusinessController.js'
import { Switch } from '@headlessui/react'
import { useState } from 'react'

export default function TranslationContent({ business }) {
    const [translationSettings, setTranslationSettings] = useState([
        {
            slug: 'auto-translate',
            name: 'Auto Translate',
            description: 'Automatically translate content using AI when a new language is created.',
            value: business.auto_translation,
            type: 'boolean',
        },
    ])
    return (
        <>
            {translationSettings?.length > 0 ? (
                translationSettings.map((setting) => (
                    <div key={setting.slug} className={'flex items-center justify-between p-4 bg-white w-2/3'}>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">{setting.name}</h3>
                            <p className="text-gray-600">{setting.description}</p>
                        </div>
                        <span className="inline-flex items-center">
                            <Switch
                                checked={setting.value}
                                onChange={async (checked) => {
                                    if (setting.type === 'boolean') {
                                        await toggleAutoTranslation.call({}).then((response) => {
                                            setTranslationSettings((prevSettings) =>
                                                prevSettings.map((s) => {
                                                    if (s.slug === setting.slug) {
                                                        return { ...s, value: checked }
                                                    }

                                                    return s
                                                }),
                                            )
                                        })
                                    }
                                }}
                                className={`${
                                    setting.value ? 'bg-blue-600' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                            >
                                <span
                                    className={`${
                                        setting.value ? 'translate-x-5' : 'translate-x-0'
                                    } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                        </span>
                    </div>
                ))
            ) : (
                <div key={'one'} className="text-gray-500">
                    No translation settings available.
                </div>
            )}
        </>
    )
}
