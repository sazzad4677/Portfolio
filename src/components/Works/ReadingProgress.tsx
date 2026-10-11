"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Top-of-page reading progress bar. Fixed at the top of the viewport,
 * tracks `window.scrollY` smoothly via a spring so it animates instead
 * of jumping on touchpad wheel events. Sits at z-[60] so it floats
 * above the page contents but below any future overlay.
 */
export default function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 110,
        damping: 24,
        mass: 0.2,
    });

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX, transformOrigin: "0% 50%" }}
            className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40"
        />
    );
}