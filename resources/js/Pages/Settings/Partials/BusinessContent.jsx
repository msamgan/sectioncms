import AccessToken from '@/Pages/Settings/Partials/AccessToken.jsx'
import GeneralInfo from '@/Pages/Settings/Partials/GeneralInfo.jsx'
import TranslationContent from '@/Pages/Settings/Partials/TranslationContent.jsx'

export default function BusinessContent({ activeBusinessTab, business, translationSettings, getSettings }) {
    return (
        <>
            <div className={activeBusinessTab === 'general' ? 'block' : 'hidden'}>
                <GeneralInfo business={business} />
            </div>
            <div className={activeBusinessTab === 'token' ? 'block' : 'hidden'}>
                <AccessToken business={business} />
            </div>
            <div className={activeBusinessTab === 'translation' ? 'block' : 'hidden'}>
                <TranslationContent translationSettings={translationSettings} getSettings={getSettings} />
            </div>
        </>
    )
}
