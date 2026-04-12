"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroParallax() {
    useGSAP(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {
            const orbs = gsap.utils.toArray<HTMLElement>("[data-parallax-orb]");
            if (!orbs.length) return;

            orbs.forEach((el, i) => {
                gsap.to(el, {
                    y: i === 0 ? -72 : 56,
                    x: i === 0 ? 32 : -24,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "#home",
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.05,
                    },
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return null;
}
