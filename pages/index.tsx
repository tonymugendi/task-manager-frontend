import Hero from "@/components/landing/hero";
import Features from "@/components/landing/Features";
import TechStack from "@/components/landing/TechStack";
import DeveloperJourney from "@/components/landing/DeveloperJourney";
import PerformanceMetrics from "@/components/landing/PerformanceMetrics";
import HowItWorks from "@/components/landing/HowItWorks";
import DemoSection from "@/components/landing/DemoSection";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Hero />
      <Features />
      <TechStack />
      <DeveloperJourney />
      <PerformanceMetrics />
      <HowItWorks />
      <DemoSection />
      <Footer />
    </main>
  );
}

LandingPage.noLayout = true;

export default LandingPage;
