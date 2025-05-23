import { Head } from '@inertiajs/react'
import Public from '@/Layouts/Public'

export default function PrivacyPolicy({ auth }) {
    return (
        <Public auth={auth}>
            <Head title="Privacy Policy" />
            <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800">
                <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>

                <div className="prose prose-blue dark:prose-invert max-w-none">
                    <p className="mb-4">
                        Welcome to SectionCMS. This Privacy Policy explains how we collect, use, disclose, and safeguard
                        your information when you use our service.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">1. Information We Collect</h2>
                    <p>
                        We may collect personal information that you voluntarily provide to us when you register with
                        us, express an interest in obtaining information about us or our products and services, or
                        otherwise contact us.
                    </p>
                    <p>
                        The personal information that we collect depends on the context of your interactions with us and
                        the choices you make, including your privacy settings, and may include:
                    </p>
                    <ul className="mb-4 list-disc pl-6">
                        <li>Personal identifiers (such as name and email address)</li>
                        <li>Website usage data</li>
                        <li>Other information you choose to provide</li>
                    </ul>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">2. How We Use Your Information</h2>
                    <p>We use the information we collect in various ways, including to:</p>
                    <ul className="mb-4 list-disc pl-6">
                        <li>Provide, operate, and maintain our service</li>
                        <li>Improve, personalize, and expand our service</li>
                        <li>Understand and analyze how you use our service</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>Communicate with you, including for customer service and providing updates and notices</li>
                        <li>Send you emails</li>
                        <li>Find and prevent fraud</li>
                    </ul>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">3. Disclosure of Your Information</h2>
                    <p>
                        We may share information we have collected about you in certain situations. Your information may
                        be disclosed as follows:
                    </p>
                    <ul className="mb-4 list-disc pl-6">
                        <li>
                            By Law or to Protect Rights: If we believe the release of information is necessary to comply
                            with the law, enforce our site policies, or protect ours or others' rights, property, or
                            safety.
                        </li>
                        <li>
                            Third-Party Service Providers: We may share your information with third parties that perform
                            services for us or on our behalf, including payment processing, data analysis, email
                            delivery, hosting services, customer service, and marketing assistance.
                        </li>
                        <li>
                            Marketing Communications: With your consent, or with an opportunity for you to withdraw
                            consent, we may share your information with third parties for marketing purposes.
                        </li>
                    </ul>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">4. Security of Your Information</h2>
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal
                        information. While we have taken reasonable steps to secure the personal information you provide
                        to us, please be aware that despite our efforts, no security measures are perfect or
                        impenetrable, and no method of data transmission can be guaranteed against any interception or
                        other type of misuse.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">5. Your Privacy Rights</h2>
                    <p>
                        Depending on your location, you may have certain rights regarding your personal information,
                        such as the right to request access to your personal information, correct or delete it, or
                        request restrictions on our processing of it.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">6. Changes to This Privacy Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                        the new Privacy Policy on this page and updating the "Last updated" date.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">7. Contact Us</h2>
                    <p>If you have questions or comments about this Privacy Policy, please contact us.</p>

                    <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </Public>
    )
}
