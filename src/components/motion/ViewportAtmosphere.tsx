"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function ViewportAtmosphere() {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (typeof window === "undefined") return;
            const el = rootRef.current;
            if (!el) return;

            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            el.style.setProperty("--atmosphere-x", `${window.innerWidth / 2}px`);
            el.style.setProperty("--atmosphere-y", `${window.innerHeight * 0.36}px`);

            // Use quickTo for high-performance property updates (60fps+)
            const xTo = gsap.quickTo(el, "--atmosphere-x", { duration: 1, ease: "power3.out" });
            const yTo = gsap.quickTo(el, "--atmosphere-y", { duration: 1, ease: "power3.out" });

            const onMove = (e: MouseEvent) => {
                (xTo as any)(`${e.clientX}px`);
                (yTo as any)(`${e.clientY}px`);
            };

            if (!reduce) {
                window.addEventListener("mousemove", onMove, { passive: true });
            }

            return () => {
                if (!reduce) {
                    window.removeEventListener("mousemove", onMove);
                }
            };
        },
        { scope: rootRef }
    );

    return (
        <div
            ref={rootRef}
            className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
            aria-hidden
        >
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_95vw_55vh_at_50%_8%,hsl(var(--primary-hsl)/0.05)_0%,transparent_50%)]" />

            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(
            ellipse min(110vw, 1600px) min(85vh, 900px) at var(--atmosphere-x, 50vw) var(--atmosphere-y, 36vh),
            hsl(var(--primary-hsl) / 0.07) 0%,
            hsl(var(--primary-hsl) / 0.025) 48%,
            transparent 72%
          )`,
                }}
            />

            <div
                className="absolute inset-0 opacity-[0.18] dark:opacity-[0.11]"
                style={{
                    backgroundImage: `linear-gradient(hsl(var(--foreground-hsl) / 0.05) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground-hsl) / 0.05) 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                }}
            />

            <div
                className="absolute inset-0 opacity-[0.028] mix-blend-overlay dark:opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
