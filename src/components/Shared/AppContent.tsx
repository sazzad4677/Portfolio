"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scroller } from "react-scroll";
import Loader from "../Loader/Loader";
import ShimmerLoader from "../Loader/ShimmerLoader";

const HASH_SCROLL_TARGETS = new Set([
    "home", "about", "skills", "services", "jobs", "projects", "archive", "education", "certifications", "contact",
]);

const HASH_SCROLL_OFFSET = -108;

export default function AppContent({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        if (!loading) {
            setShowSkeleton(true);
            const timer = setTimeout(() => setShowSkeleton(false), 200);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    useEffect(() => {
        if (loading || showSkeleton) return;
        
        const raw = window.location.hash.replace(/^#/, "");
        if (!raw || !HASH_SCROLL_TARGETS.has(raw)) return;
        
        const timer = window.setTimeout(() => {
            scroller.scrollTo(raw, {
                offset: HASH_SCROLL_OFFSET,
            });
        }, 300);
        return () => clearTimeout(timer);
    }, [loading, showSkeleton]);

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && (
                    <Loader key="loader" setLoading={setLoading} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSkeleton && (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[997]"
                    >
                        <ShimmerLoader />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: (loading || showSkeleton) ? 0 : 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
                style={{ 
                    pointerEvents: (loading || showSkeleton) ? 'none' : 'auto',
                    visibility: (loading || showSkeleton) ? 'hidden' : 'visible'
                }}
            >
                {children}
            </motion.div>
        </>
    );
}
