import CallToActionSection from '@/Components/Welcome/CallToActionSection'
import FAQSection from '@/Components/Welcome/FAQSection'
import FeaturesSection from '@/Components/Welcome/FeaturesSection'
import HeroSection from '@/Components/Welcome/HeroSection'
import HowItWorksSection from '@/Components/Welcome/HowItWorksSection'
import PricingSection from '@/Components/Welcome/PricingSection'
import TestimonialsSection from '@/Components/Welcome/TestimonialsSection'
import TranslationSection from '@/Components/Welcome/TranslationSection'
import TrustBadges from '@/Components/Welcome/TrustBadges'
import SectionNavigation from '@/Components/layout/SectionNavigation'
import Public from '@/Layouts/Public.jsx'
import { Head } from '@inertiajs/react'

export default function Welcome({ auth }) {
    return (
        <Public auth={auth}>
            <Head>
                <title>Section CMS - Dynamic Content Management System</title>
                <meta
                    name="description"
                    content="Section CMS is a powerful and flexible content management system designed for dynamic content creation and management."
                />
                <meta
                    name="keywords"
                    content="CMS, content management system, dynamic content, section cms, web content"
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Section CMS - Dynamic Content Management System" />
                <meta
                    property="og:description"
                    content="Section CMS is a powerful and flexible content management system designed for dynamic content creation and management."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sectioncms.com" />
                <meta property="og:image" content="https://sectioncms.com/images/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Section CMS - Dynamic Content Management System" />
                <meta
                    name="twitter:description"
                    content="Section CMS is a powerful and flexible content management system designed for dynamic content creation and management."
                />
                <link rel="canonical" href="https://sectioncms.com" />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Section CMS",
                        "description": "A powerful and flexible content management system designed for dynamic content creation and management.",
                        "url": "https://sectioncms.com",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://sectioncms.com/search?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    }
                `}
                </script>
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Section CMS",
                        "applicationCategory": "WebApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    }
                `}
                </script>
            </Head>
            <div id="hero">
                <HeroSection />
            </div>
            <div id="trust">
                <TrustBadges />
            </div>
            <div id="features">
                <FeaturesSection />
            </div>
            <div id="translation">
                <TranslationSection />
            </div>
            <div id="how-it-works">
                <HowItWorksSection />
            </div>
            <div id="testimonials">
                <TestimonialsSection />
            </div>
            <div id="faq">
                <FAQSection />
            </div>
            <div id="pricing">
                <PricingSection />
            </div>
            <div id="cta">
                <CallToActionSection auth={auth} />
            </div>
            <SectionNavigation />
        </Public>
    )
}
