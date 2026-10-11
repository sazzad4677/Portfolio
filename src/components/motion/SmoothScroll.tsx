"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

/**
 * Page-level smooth scroll powered by Lenis. Disabled on mobile
 * (<768px) where native scroll already feels right and adding Lenis
 * can interfere with pull-to-refresh.
 */
export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        if (window.innerWidth < 768) return;

        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.8,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};