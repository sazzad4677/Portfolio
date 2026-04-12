"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollParallaxLayers() {
    const wrap = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (typeof window === "undefined") return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            const root = wrap.current;
            if (!root) return;

            const ctx = gsap.context(() => {
                const glows = root.querySelectorAll("[data-scroll-glow]");
                if (!glows.length) return;

                gsap.fromTo(
                    glows,
                    { y: 0, opacity: 0.22 },
                    {
                        y: -120,
                        opacity: 0.38,
                        ease: "none",
                        scrollTrigger: {
                            trigger: document.documentElement,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 1.35,
                        },
                    }
                );
            }, root);

            return () => ctx.revert();
        },
        { scope: wrap }
    );

    return (
        <div
            ref={wrap}
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            aria-hidden
        >
            <div
                data-scroll-glow
                className="absolute -left-[25%] top-[12%] h-[min(58vw,480px)] w-[min(58vw,480px)] rounded-full bg-primary/[0.045] blur-[120px] will-change-transform"
            />
            <div
                data-scroll-glow
                className="absolute -right-[20%] top-[38%] h-[min(52vw,440px)] w-[min(52vw,440px)] rounded-full bg-secondary/[0.04] blur-[110px] will-change-transform"
            />
            <div
                data-scroll-glow
                className="absolute left-1/2 top-[22%] h-[min(70vh,520px)] w-[min(90vw,900px)] -translate-x-1/2 rounded-full bg-primary/[0.03] blur-[130px] will-change-transform"
            />
        </div>
    );
}
