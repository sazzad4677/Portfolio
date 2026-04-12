"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const Home: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    // Ensure hydration is handled correctly for theme and state
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

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
                >
                    <Header />
                    <div className="flex flex-col gap-24 sm:gap-32 md:gap-40 lg:gap-48 pb-24">
                        <Hero />
                        <div className="container mx-auto px-6 md:px-12 lg:px-24 space-y-32 md:space-y-48">
                            <About />
                            <Experience />
                            <Works />
                            <Archive />
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
