import AccessToken from '@/Pages/Settings/Partials/AccessToken.jsx'
import GeneralInfo from '@/Pages/Settings/Partials/GeneralInfo.jsx'

export default function BusinessContent({ activeBusinessTab, business }) {
    return (
        <>
            <div className={activeBusinessTab === 'general' ? 'block' : 'hidden'}>
                <GeneralInfo business={business} />
            </div>
            <div className={activeBusinessTab === 'token' ? 'block' : 'hidden'}>
                <AccessToken business={business} />
            </div>
        </>
    )
}
