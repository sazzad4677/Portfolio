"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const INTERACTIVE_SELECTOR = "a, button, [data-cursor-hover], input, textarea, select, [role='button']";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(pointer: coarse)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setEnabled(true);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        document.body.classList.add("custom-cursor-on");

        gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

        const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
        const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
        const xRing = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
        const yRing = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });

        const onMove = (e: MouseEvent) => {
            xDot(e.clientX);
            yDot(e.clientY);
            xRing(e.clientX);
            yRing(e.clientY);
        };

        const setHover = (hovering: boolean) => {
            gsap.to(dot, {
                scale: hovering ? 2 : 1,
                duration: 0.3,
                ease: "power3.out",
            });
            gsap.to(ring, {
                scale: hovering ? 2.8 : 1,
                opacity: hovering ? 0.9 : 0.65,
                borderWidth: hovering ? "1.5px" : "2px",
                backgroundColor: hovering ? "hsla(var(--primary-hsl) / 0.05)" : "transparent",
                duration: 0.4,
                ease: "power3.out",
            });
        };

        const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null;
            if (t?.closest(INTERACTIVE_SELECTOR)) setHover(true);
        };

        const onOut = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null;
            const related = e.relatedTarget as HTMLElement | null;
            if (t?.closest(INTERACTIVE_SELECTOR) && !related?.closest(INTERACTIVE_SELECTOR)) {
                setHover(false);
            }
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
            document.body.classList.remove("custom-cursor-on");
            gsap.killTweensOf([dot, ring]);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div
                ref={ringRef}
                className="pointer-events-none fixed left-0 top-0 z-[10000] h-10 w-10 rounded-full border-2 border-primary/50 bg-transparent opacity-[0.65]"
                aria-hidden
            />
            <div
                ref={dotRef}
                className="pointer-events-none fixed left-0 top-0 z-[10001] h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden
            />
        </>
    );
}
