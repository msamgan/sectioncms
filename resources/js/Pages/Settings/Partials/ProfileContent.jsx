import UpdateProfileInformationForm from '@/Pages/Settings/Partials/UpdateProfileInformationForm.jsx'
import UpdatePasswordForm from '@/Pages/Settings/Partials/UpdatePasswordForm.jsx'

export default function ProfileContent({ activeProfileTab, mustVerifyEmail, status }) {
    return (
        <>
            <div className={activeProfileTab === 'profile' ? 'block' : 'hidden'}>
                <div className="">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-2xl"
                    />
                </div>
            </div>
            <div className={activeProfileTab === 'password' ? 'block' : 'hidden'}>
                <div className="">
                    <UpdatePasswordForm className="max-w-2xl" />
                </div>
            </div>
        </>
    )
}
