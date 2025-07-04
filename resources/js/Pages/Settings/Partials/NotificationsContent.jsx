import { toggleSetting } from '@actions/SettingsController.js'
import { Switch } from '@headlessui/react'

export default function NotificationsContent({ notificationSettings, getSettings }) {
    return (
        <>
            {notificationSettings?.length > 0 ? (
                notificationSettings.map((setting) => (
                    <div key={setting.slug} className={'flex items-center justify-between p-4 bg-white dark:bg-gray-800 w-full rounded-lg mb-3 transition-colors duration-200'}>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">{setting.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{setting.description}</p>
                        </div>
                        <span className="inline-flex items-center">
                            <Switch
                                checked={setting.value}
                                onChange={async (checked) => {
                                    if (setting.type === 'boolean') {
                                        await toggleSetting
                                            .call({
                                                params: { setting: setting.slug },
                                            })
                                            .then((response) => {
                                                getSettings().then()
                                            })
                                    }
                                }}
                                className={`${
                                    setting.value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
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
                <div key={'one'} className="text-gray-500 dark:text-gray-400 p-4 rounded-lg transition-colors duration-200">
                    No notification settings available.
                </div>
            )}
        </>
    )
}
