import Public from '@/Layouts/Public.jsx'
import HeroSection from '@/Components/Welcome/HeroSection'
import FeaturesSection from '@/Components/Welcome/FeaturesSection'
import HowItWorksSection from '@/Components/Welcome/HowItWorksSection'
import PricingSection from '@/Components/Welcome/PricingSection'
import CallToActionSection from '@/Components/Welcome/CallToActionSection'

export default function Welcome({ auth }) {
    return (
        <Public auth={auth}>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <PricingSection />
            <CallToActionSection auth={auth} />
        </Public>
    )
}
