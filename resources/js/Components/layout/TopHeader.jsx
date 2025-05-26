import ApplicationLogo from '@/Components/ApplicationLogo.jsx'
import TopHeaderRight from '@/Components/layout/TopHeaderRight.jsx'

export default function TopHeader({ user }) {
    return (
        <nav className="flex items-center bg-white shadow-sm" id="layout-navbar">
            <div className="container mx-auto px-4 flex justify-between py-3">
                <div className="flex items-center">
                    <div className="hidden xl:flex items-center py-0">
                        <a href="/" className="flex items-center gap-3">
                            <span className="block">
                                <span className="text-primary">
                                    <ApplicationLogo className="fill-current block h-10 w-auto text-gray-800" />
                                </span>
                            </span>
                            <div className="flex flex-col space-y-1">
                                <span className="font-medium ml-4 text-gray-800">
                                    Welcome, {user.name} <span className="text-primary">({user.role.display_name})</span>
                                </span>
                                <span className="font-medium ml-4 text-sm text-gray-600">{user.business?.name}</span>
                            </div>
                        </a>

                        <a href="#" className="xl:hidden ml-auto text-xl">
                            <i className="ri-close-fill align-middle"></i>
                        </a>
                    </div>

                    <div className="xl:hidden flex items-center">
                        <a className="px-0 mr-6" href="#">
                            <i className="ri-menu-fill text-2xl"></i>
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
