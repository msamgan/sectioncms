import ApplicationLogo from '@/Components/ApplicationLogo'

export default function PublicHeader() {
    return (
        <div className="flex lg:col-start-2 lg:justify-center">
            <ApplicationLogo className="h-32 w-auto" />
        </div>
    )
}
