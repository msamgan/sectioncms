import ApplicationLogo from '@/Components/ApplicationLogo'
import LanguageDropdown from '@/Components/LanguageDropdown'
import DarkModeToggle from '@/Components/DarkModeToggle'

export default function PublicHeader() {
    return (
        <div className="flex items-center lg:col-start-2 lg:justify-center">
            <div className="absolute left-6">
                <LanguageDropdown />
            </div>
            <div className="absolute right-6">
                <DarkModeToggle />
            </div>
            <ApplicationLogo className="h-32 w-auto" />
        </div>
    )
}
