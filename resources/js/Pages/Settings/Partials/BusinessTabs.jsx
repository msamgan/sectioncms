import TabButton from '@/Components/TabButton.jsx'

export default function BusinessTabs({ activeBusinessTab, setActiveBusinessTab, isVisible }) {
    return (
        <ul className={`flex flex-wrap -mb-px ${isVisible ? 'block' : 'hidden'}`} role="tablist">
            <li className="mr-6">
                <TabButton
                    type="button"
                    active={activeBusinessTab === 'general'}
                    role="tab"
                    onClick={() => setActiveBusinessTab('general')}
                    aria-selected={activeBusinessTab === 'general'}
                >
                    <i className="ri-settings-4-line mr-3"></i>
                    Business Information
                </TabButton>
            </li>
            <li className="mr-6">
                <TabButton
                    type="button"
                    active={activeBusinessTab === 'token'}
                    role="tab"
                    onClick={() => setActiveBusinessTab('token')}
                    aria-selected={activeBusinessTab === 'token'}
                >
                    <i className="ri-key-line mr-3"></i>
                    Access Token
                </TabButton>
            </li>
        </ul>
    )
}
