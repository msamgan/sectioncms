import Public from '@/Layouts/Public.jsx'
import HeroSection from '@/Components/Welcome/HeroSection'
import TrustBadges from '@/Components/Welcome/TrustBadges'
import FeaturesSection from '@/Components/Welcome/FeaturesSection'
import HowItWorksSection from '@/Components/Welcome/HowItWorksSection'
import TestimonialsSection from '@/Components/Welcome/TestimonialsSection'
import FAQSection from '@/Components/Welcome/FAQSection'
import PricingSection from '@/Components/Welcome/PricingSection'
import CallToActionSection from '@/Components/Welcome/CallToActionSection'
import SectionNavigation from '@/Components/layout/SectionNavigation'

export default function Welcome({ auth }) {
    return (
        <Public auth={auth}>
            <div id="hero">
                <HeroSection />
            </div>
            <div id="trust">
                <TrustBadges />
            </div>
            <div id="features">
                <FeaturesSection />
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
