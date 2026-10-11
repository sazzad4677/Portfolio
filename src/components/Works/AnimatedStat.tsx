"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

interface Props {
    value: string;
}

/**
 * Count-up animation for stat-card values.
 * - If `value` starts with a number (optionally followed by `+`, `%`, `x`),
 *   it counts from 0 → that number once on enter. The trailing symbol
 *   (e.g. `+`, `%`, `x`) is preserved.
 * - Otherwise the raw string is rendered as-is (so "OpenRouter", "P2P",
 *   "Single", "Real-time" pass through unchanged).
 * - Respects `prefers-reduced-motion`: skips the animation, shows final
 *   value immediately.
 */
export default function AnimatedStat({ value }: Props) {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    const target = match ? parseFloat(match[1]) : null;
    const suffix = match ? match[2] : "";
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });
    const [display, setDisplay] = useState(target === null ? value : "0");
    const mv = useMotionValue(0);

    useEffect(() => {
        if (target === null) return;
        if (!inView) return;
        if (typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            setDisplay(`${target}${suffix}`);
            return;
        }
        const controls = animate(mv, target, {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1], // expo-out, matches the rest of the site
            onUpdate: (v) => {
                const isInt = Number.isInteger(target);
                setDisplay(`${isInt ? Math.round(v) : v.toFixed(1)}${suffix}`);
            },
        });
        return () => controls.stop();
    }, [inView, target, suffix, mv]);

    return (
        <div ref={ref} className="font-sans text-2xl sm:text-3xl font-bold leading-none text-primary tabular-nums">
            {display}
        </div>
    );
}
