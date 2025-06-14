import TabButton from '@/Components/TabButton.jsx'

export default function ProfileTabs({ activeProfileTab, setActiveProfileTab, isVisible }) {
    return (
        <ul className={`flex flex-wrap -mb-px ${isVisible ? 'block' : 'hidden'}`} role="tablist">
            <li className="mr-6">
                <TabButton
                    type="button"
                    active={activeProfileTab === 'profile'}
                    role="tab"
                    onClick={() => setActiveProfileTab('profile')}
                    aria-selected={activeProfileTab === 'profile'}
                >
                    <i className="ri-user-line mr-3"></i>
                    Profile Information
                </TabButton>
            </li>
            <li className="mr-6">
                <TabButton
                    type="button"
                    active={activeProfileTab === 'password'}
                    role="tab"
                    onClick={() => setActiveProfileTab('password')}
                    aria-selected={activeProfileTab === 'password'}
                >
                    <i className="ri-lock-line mr-3"></i>
                    Password
                </TabButton>
            </li>
        </ul>
    )
}
