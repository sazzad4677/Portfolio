"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scroller } from "react-scroll";
import Loader from "../components/Loader/Loader";
import About from "../components/About/About";
import Experience from "../components/Experience/Experience";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Email from "../components/Socials/Email";
import Socials from "../components/Socials/Socials";
import Works from "../components/Works/Works";
import Footer from "../components/Footer/Footer";
import Contact from "../components/Contact/Contact";
import Archive from "../components/Archive/Archive";
import Skills from "../components/Skills/Skills";
import Services from "../components/Services/Services";
import Education from "../components/Education/Education";
import Certifications from "../components/Certifications/Certifications";
import { ScrollParallaxLayers } from "../components/motion/ScrollParallaxLayers";
import { ViewportAtmosphere } from "../components/motion/ViewportAtmosphere";
import { CustomCursor } from "../components/motion/CustomCursor";
import { HeroParallax } from "../components/motion/HeroParallax";
import { HeroInteractiveBackground } from "../components/motion/HeroInteractiveBackground";
import ScrollToTop from "../components/Shared/ScrollToTop";

const HASH_SCROLL_TARGETS = new Set([
"home",
"about",
"skills",
"services",
"jobs",
"projects",
"archive",
"education",
"certifications",
"contact",
]);

const HASH_SCROLL_OFFSET = -108;

const Home: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    // Ensure hydration is handled correctly for theme and state
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (loading) return;
        const raw = window.location.hash.replace(/^#/, "");
        if (!raw || !HASH_SCROLL_TARGETS.has(raw)) return;
        const timer = window.setTimeout(() => {
            scroller.scrollTo(raw, {
                smooth: true,
                duration: 500,
                offset: HASH_SCROLL_OFFSET,
            });
        }, 200);
        return () => clearTimeout(timer);
    }, [loading]);

    if (!mounted) return null;

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <Loader key="loader" setLoading={setLoading} />
            ) : (
                <motion.div
                    key="main-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
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
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Home;
