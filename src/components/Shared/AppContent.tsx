"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scroller } from "react-scroll";
import Loader from "../Loader/Loader";

const HASH_SCROLL_TARGETS = new Set([
    "home", "about", "skills", "services", "jobs", "projects", "archive", "education", "certifications", "contact",
]);

const HASH_SCROLL_OFFSET = -108;

export default function AppContent({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

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
        }, 300);
        return () => clearTimeout(timer);
    }, [loading]);

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && (
                    <Loader setLoading={setLoading} />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
                style={{ 
                    // SEO Tip: Keep content in DOM but hidden from view until ready.
                    // Pointer events disabled while loading to prevent interactions through the loader.
                    pointerEvents: loading ? 'none' : 'auto',
                    visibility: loading ? 'hidden' : 'visible'
                }}
            >
                {children}
            </motion.div>
        </>
    );
}
