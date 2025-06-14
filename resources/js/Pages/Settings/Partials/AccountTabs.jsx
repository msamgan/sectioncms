import TabButton from '@/Components/TabButton.jsx'

export default function AccountTabs({ activeSettingsTab, setActiveSettingsTab, isVisible }) {
    return (
        <ul className={`flex flex-wrap -mb-px ${isVisible ? 'block' : 'hidden'}`} role="tablist">
            <li className="mr-6">
                <TabButton
                    type="button"
                    active={activeSettingsTab === 'notifications'}
                    role="tab"
                    onClick={() => setActiveSettingsTab('notifications')}
                    aria-selected={activeSettingsTab === 'notifications'}
                >
                    <i className="ri-notification-3-line mr-3"></i>
                    Notifications
                </TabButton>
            </li>
            <li className="mr-6">
                <TabButton
                    type="button"
                    active={activeSettingsTab === 'translation'}
                    role="tab"
                    onClick={() => setActiveSettingsTab('translation')}
                    aria-selected={activeSettingsTab === 'translation'}
                >
                    <i className="ri-translate-2 mr-3"></i>
                    Translation
                </TabButton>
            </li>
        </ul>
    )
}
