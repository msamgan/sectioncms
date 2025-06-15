import ApplicationLogo from '@/Components/ApplicationLogo'
import LanguageDropdown from '@/Components/LanguageDropdown'

export default function PublicHeader() {
    return (
        <div className="flex items-center lg:col-start-2 lg:justify-center">
            <div className="absolute left-6">
                <LanguageDropdown />
            </div>
            <ApplicationLogo className="h-32 w-auto" />
        </div>
    )
}
