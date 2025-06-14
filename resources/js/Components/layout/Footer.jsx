import usePermissions from '@/Hooks/usePermissions'
import { permissions } from '@/Utils/permissions/index.js'

export default function Footer() {
    const { can } = usePermissions()

    return (
        <footer className="w-full py-4 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between py-4">
                    <div className="text-gray-700 mb-2 md:mb-0">
                        ©{new Date().getFullYear()} made with
                        <span className="text-primary ml-1 mr-2">
                            <i className="inline-block ri-heart-line"></i>
                        </span>
                        by
                        <a
                            href="https://msamgan.com"
                            target="_blank"
                            className="text-primary hover:text-gray-700 ml-1"
                        >
                            msamgan
                        </a>
                    </div>
                    <div className="hidden lg:inline-block">
                        {can(permissions.api_doc.view) && (
                            <a href="/docs/api" target="_blank" className="text-primary hover:text-gray-700 mr-4">
                                API Documentation
                            </a>
                        )}
                        <a href={route('terms')} className="text-primary hover:text-gray-700 mr-4">
                            Terms & Conditions
                        </a>
                        <a href={route('privacy')} className="text-primary hover:text-gray-700 mr-4">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
