import Public from '@/Layouts/Public'
import { Head } from '@inertiajs/react'

export default function TermsAndConditions({ auth }) {
    return (
        <Public auth={auth}>
            <Head title="Terms and Conditions" />

            <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800">
                <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Terms and Conditions</h1>

                <div className="prose prose-blue dark:prose-invert max-w-none">
                    <p className="mb-4">
                        Welcome to SectionCMS. By accessing or using our service, you agree to be bound by these Terms
                        and Conditions.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using SectionCMS, you agree to be bound by these Terms and Conditions and all
                        applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
                        from using or accessing this site.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">2. Use License</h2>
                    <p>
                        Permission is granted to temporarily use SectionCMS for personal, non-commercial transitory
                        viewing only. This is the grant of a license, not a transfer of title, and under this license
                        you may not:
                    </p>
                    <ul className="mb-4 list-disc pl-6">
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose</li>
                        <li>Attempt to decompile or reverse engineer any software contained in SectionCMS</li>
                        <li>Remove any copyright or other proprietary notations from the materials</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    </ul>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">3. Disclaimer</h2>
                    <p>
                        The materials on SectionCMS are provided on an 'as is' basis. SectionCMS makes no warranties,
                        expressed or implied, and hereby disclaims and negates all other warranties including, without
                        limitation, implied warranties or conditions of merchantability, fitness for a particular
                        purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">4. Limitations</h2>
                    <p>
                        In no event shall SectionCMS or its suppliers be liable for any damages (including, without
                        limitation, damages for loss of data or profit, or due to business interruption) arising out of
                        the use or inability to use SectionCMS, even if SectionCMS or a SectionCMS authorized
                        representative has been notified orally or in writing of the possibility of such damage.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">5. Accuracy of Materials</h2>
                    <p>
                        The materials appearing on SectionCMS could include technical, typographical, or photographic
                        errors. SectionCMS does not warrant that any of the materials on its website are accurate,
                        complete or current. SectionCMS may make changes to the materials contained on its website at
                        any time without notice.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">6. Links</h2>
                    <p>
                        SectionCMS has not reviewed all of the sites linked to its website and is not responsible for
                        the contents of any such linked site. The inclusion of any link does not imply endorsement by
                        SectionCMS of the site. Use of any such linked website is at the user's own risk.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">7. Modifications</h2>
                    <p>
                        SectionCMS may revise these terms of service for its website at any time without notice. By
                        using this website you are agreeing to be bound by the then current version of these terms of
                        service.
                    </p>

                    <h2 className="mb-3 mt-6 text-xl font-semibold">8. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws and you
                        irrevocably submit to the exclusive jurisdiction of the courts in that location.
                    </p>

                    <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </Public>
    )
}
