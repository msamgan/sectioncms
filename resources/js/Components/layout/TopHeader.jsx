import ApplicationLogo from '@/Components/ApplicationLogo.jsx'
import TopHeaderRight from '@/Components/layout/TopHeaderRight.jsx'

export default function TopHeader({ user }) {
    return (
        <nav className="flex items-center bg-white w-full" id="layout-navbar">
            <div className="w-full flex justify-between py-3">
                <div className="flex items-center">
                    <div className="hidden xl:flex items-center">
                        <a href="/" className="flex items-center gap-3">
                            <span className="block">
                                <span className="text-primary">
                                    <ApplicationLogo className="fill-current block h-10 w-auto text-gray-800" />
                                </span>
                            </span>
                            <div className="flex flex-col space-y-1">
                                <span className="font-medium ml-4 text-gray-800">
                                    Welcome, {user.name}{' '}
                                    <span className="text-primary">({user.role.display_name})</span>
                                </span>
                                <span className="font-medium ml-4 text-sm text-gray-600">{user.business?.name}</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div>
                    <TopHeaderRight user={user} />
                </div>
            </div>
        </nav>
    )
}
