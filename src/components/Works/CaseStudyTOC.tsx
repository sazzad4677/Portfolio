"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TocItem {
    id: string;
    label: string;
    number: string;
}

interface Props {
    items: TocItem[];
}

/**
 * In-page table of contents. Sticky on `lg+`, tracks the active
 * section based on scroll position.
 *
 * Why scroll-position instead of IntersectionObserver:
 *  - Short sections (Problem, Lessons) never reach the 40% visibility
 *    threshold needed by IO, so they never get marked active.
 *  - With Lenis smooth-scroll, IO firing can lag one frame and miss
 *    the entry. A scroll listener runs every frame, so it never lags.
 *
 * The active rail indicator is a single absolutely-positioned bar
 * that slides between items via `transform: translateY(...)` —
 * smoother than per-item color transitions, and the bar stays
 * exactly aligned with the active row.
 */
export default function CaseStudyTOC({ items }: Props) {
    const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
    const listRef = useRef<HTMLOListElement>(null);
    const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
    const [railY, setRailY] = useState(0);
    const [railHeight, setRailHeight] = useState(0);

    /** Measure where the rail should sit, relative to the `<ol>`. */
    const measureRail = () => {
        const list = listRef.current;
        const activeEl = activeId ? itemRefs.current[activeId] : null;
        if (!list || !activeEl) return;
        const listRect = list.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();
        setRailY(itemRect.top - listRect.top + itemRect.height / 2 - 8); // 8 = half of rail height
        setRailHeight(16);
    };

    useLayoutEffect(() => {
        measureRail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId]);

    /** Scroll-position spy. Picks the last section whose top has crossed
     *  the activation line (~30% from the top of the viewport). */
    useEffect(() => {
        if (typeof window === "undefined") return;

        const compute = () =>
            items
                .map((i) => {
                    const el = document.getElementById(i.id);
                    if (!el) return null;
                    const rect = el.getBoundingClientRect();
                    return {
                        id: i.id,
                        top: rect.top + window.scrollY,
                    };
                })
                .filter((x): x is { id: string; top: number } => !!x);

        let sections = compute();

        const ACTIVATION_OFFSET_PX = () =>
            Math.max(120, window.innerHeight * 0.3);

        const pickActive = () => {
            if (sections.length === 0) return;
            const trigger = window.scrollY + ACTIVATION_OFFSET_PX();
            let current = sections[0].id;
            for (const s of sections) {
                if (s.top <= trigger) {
                    current = s.id;
                } else {
                    break;
                }
            }
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 4;
            if (atBottom) current = sections[sections.length - 1].id;
            setActiveId((prev) => (prev === current ? prev : current));
        };

        const recompute = () => {
            sections = compute();
            pickActive();
            measureRail();
        };

        pickActive();
        window.addEventListener("scroll", pickActive, { passive: true });
        window.addEventListener("resize", recompute);
        const t1 = window.setTimeout(recompute, 200);
        const t2 = window.setTimeout(recompute, 800);

        return () => {
            window.removeEventListener("scroll", pickActive);
            window.removeEventListener("resize", recompute);
            window.clearTimeout(t1);
            window.clearTimeout(t2);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    return (
        <nav aria-label="On this page" className="sticky top-28">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">
                <span>On this page</span>
                {/* C: section count badge */}
                <span className="rounded-full border border-border/40 bg-surface/30 px-2 py-0.5 font-mono text-[9px] tabular-nums text-secondary-foreground/60">
                    {items.length} {items.length === 1 ? "section" : "sections"}
                </span>
            </div>

            <ol ref={listRef} className="relative mt-4 space-y-1.5 pl-3">
                {/* Animated rail indicator — moves via transform */}
                <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                        y: railY,
                        opacity: railHeight > 0 ? 1 : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 32,
                        mass: 0.4,
                    }}
                    style={{ height: railHeight }}
                    className="absolute left-0 w-px bg-primary"
                />

                {items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <li
                            key={item.id}
                            ref={(el) => {
                                itemRefs.current[item.id] = el;
                            }}
                            className="relative"
                        >
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById(item.id);
                                    if (el) {
                                        el.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        });
                                        setActiveId(item.id);
                                    }
                                }}
                                className={cn(
                                    "group flex items-center gap-2 py-1 text-xs transition-colors duration-200",
                                    isActive
                                        ? "text-foreground"
                                        : "text-secondary-foreground/55 hover:text-foreground/80"
                                )}
                            >
                                <span
                                    className={cn(
                                        "font-mono text-[10px] tracking-wider transition-colors duration-200",
                                        isActive
                                            ? "text-primary"
                                            : "text-secondary-foreground/40"
                                    )}
                                >
                                    {item.number}
                                </span>
                                <span className="truncate">{item.label}</span>
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}