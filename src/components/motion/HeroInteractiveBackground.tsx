"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

/**
 * Hero-only decorative shapes. Full-viewport wash + grid live in ViewportAtmosphere
 * so the page doesn’t read as a bright “middle column” with empty sides.
 */
export function HeroInteractiveBackground() {
    const layerRef = useRef<HTMLDivElement>(null);
    const floaterInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            if (typeof window === "undefined") return;
            const layer = layerRef.current;
            if (!layer) return;

            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            const floaters = floaterInnerRefs.current.filter(Boolean) as HTMLDivElement[];
            const parallaxStrength = floaters.map((_, i) => 10 + i * 7);

            // Pre-allocate quickTo functions for each floater for peak performance
            const xTos = floaters.map(f => gsap.quickTo(f, "x", { duration: 0.55, ease: "power3.out" }));
            const yTos = floaters.map(f => gsap.quickTo(f, "y", { duration: 0.55, ease: "power3.out" }));

            const onMove = (e: MouseEvent) => {
                const cx = window.innerWidth / 2;
                const cy = window.innerHeight / 2;
                const nx = (e.clientX - cx) / (window.innerWidth / 2);
                const ny = (e.clientY - cy) / (window.innerHeight / 2);

                xTos.forEach((xTo, i) => xTo(nx * parallaxStrength[i]));
                yTos.forEach((yTo, i) => yTo(ny * parallaxStrength[i]));
            };

            const outers = layer.querySelectorAll<HTMLElement>("[data-hero-float-outer]");
            const rotationCtx = reduce
                ? null
                : gsap.context(() => {
                      outers.forEach((outer, i) => {
                          gsap.to(outer, {
                              rotation: i % 2 === 0 ? 360 : -360,
                              duration: 90 + i * 20,
                              repeat: -1,
                              ease: "none",
                          });
                      });
                  }, layer);

            if (!reduce) {
                window.addEventListener("mousemove", onMove, { passive: true });
            }

            return () => {
                rotationCtx?.revert();
                if (!reduce) {
                    window.removeEventListener("mousemove", onMove);
                }
            };
        },
        { scope: layerRef }
    );

    const setInnerRef = (i: number) => (el: HTMLDivElement | null) => {
        floaterInnerRefs.current[i] = el;
    };

    return (
        <div
            ref={layerRef}
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            aria-hidden
        >
            <div
                data-hero-float-outer
                className="absolute left-[4%] top-[16%] will-change-transform max-md:left-[2%]"
            >
                <div
                    ref={setInnerRef(0)}
                    className="h-32 w-32 rounded-full border border-primary/20 md:h-36 md:w-36"
                />
            </div>

            <div
                data-hero-float-outer
                className="absolute right-[6%] top-[22%] will-change-transform max-md:right-[4%]"
            >
                <div
                    ref={setInnerRef(1)}
                    className="h-24 w-24 rounded-full border-2 border-dashed border-primary/15 md:h-28 md:w-28"
                />
            </div>

            <div
                data-hero-float-outer
                className="absolute bottom-[18%] right-[4%] padding-bottom-[20vh] will-change-transform max-md:bottom-[14%]"
            >
                <div
                    ref={setInnerRef(2)}
                    className="h-44 w-44 rounded-full border border-primary/12 bg-primary/[0.025] md:h-52 md:w-52"
                />
            </div>

            <div
                data-hero-float-outer
                className="absolute bottom-[26%] left-[2%] will-change-transform"
            >
                <div ref={setInnerRef(3)} className="h-20 w-20 rounded-full bg-primary/8 blur-md md:h-24 md:w-24" />
            </div>

            <div
                data-hero-float-outer
                className="absolute right-[10%] top-[42%] text-primary/20 will-change-transform max-md:hidden"
            >
                <div ref={setInnerRef(4)} className="flex items-center justify-center">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden>
                        <path
                            d="M 50,8 L 88,28 L 88,72 L 50,92 L 12,72 L 12,28 Z"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeOpacity="0.4"
                        />
                        <path
                            d="M 50,22 L 76,36 L 76,64 L 50,78 L 24,64 L 24,36 Z"
                            stroke="currentColor"
                            strokeWidth="0.8"
                            strokeOpacity="0.25"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
