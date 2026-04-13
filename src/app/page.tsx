import AppContent from '@/components/Shared/AppContent';
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Services from "@/components/Services/Services";
import Experience from "@/components/Experience/Experience";
import Works from "@/components/Works/Works";
import Archive from "@/components/Archive/Archive";
import Education from "@/components/Education/Education";
import Certifications from "@/components/Certifications/Certifications";
import Contact from "@/components/Contact/Contact";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Socials from "@/components/Socials/Socials";
import Email from "@/components/Socials/Email";
import { HeroInteractiveBackground } from "@/components/motion/HeroInteractiveBackground";
import { ScrollParallaxLayers } from "@/components/motion/ScrollParallaxLayers";
import { ViewportAtmosphere } from "@/components/motion/ViewportAtmosphere";
import { CustomCursor } from "@/components/motion/CustomCursor";
import ScrollToTop from "@/components/Shared/ScrollToTop";
import { HeroParallax } from "@/components/motion/HeroParallax";

export default function Page() {
    return (
        <AppContent>
            <HeroInteractiveBackground />
            <ScrollParallaxLayers />
            <ViewportAtmosphere />
            <CustomCursor />
            <ScrollToTop />
            <Header />
            <div className="relative z-10 flex flex-col gap-12 sm:gap-16 md:gap-20 pb-10 overflow-x-hidden">
                <Hero />
                <HeroParallax />
                <div className="w-full space-y-16 md:space-y-20">
                    <About />
                    <Skills />
                    <Services />
                    <Experience />
                    <Works />
                    <Archive />
                    <Education />
                    <Certifications />
                    <Contact />
                </div>
            </div>
            <Socials />
            <Email />
            <Footer />
        </AppContent>
    );
}
