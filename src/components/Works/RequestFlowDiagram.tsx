"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import {
    User,
    Server,
    Database,
    Brain,
    ArrowDown,
    RotateCcw,
    Play,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Animated sequence diagram of the AI chat request flow.
 *
 *  Visitor → Chat route → Cache hit/miss → Provider 1 → (fallback) → Provider 2 → Stream back
 *
 * Steps highlight in sequence when scrolled into view, and can be re-run
 * by clicking the play / replay button. A self-contained diagram — no
 * external SVG or chart lib needed.
 */

type StepKind = "actor" | "decision" | "provider" | "fallback" | "stream";

interface Step {
    /** Stable id, used as the React key. */
    id: string;
    /** Short label shown next to the icon. */
    label: string;
    /** Optional second line of context. */
    detail?: string;
    /** Icon to render inside the node. */
    icon: React.ReactNode;
    /** Where the node sits in the column lane. */
    kind: StepKind;
    /** Color the node picks up when active. */
    color: string;
    /** Tailwind class for the active glow. */
    glow: string;
    /** Tailwind class for the icon background when active. */
    iconBg: string;
}

const STEPS: Step[] = [
    {
        id: "visitor",
        label: "Visitor sends prompt",
        detail: "useChat POST → /api/chat",
        icon: <User size={16} />,
        kind: "actor",
        color: "text-foreground",
        glow: "shadow-[0_0_24px_-2px_rgba(56,189,248,0.55)]",
        iconBg: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    },
    {
        id: "route",
        label: "Chat route handles request",
        detail: "Edge runtime · Next.js 16",
        icon: <Server size={16} />,
        kind: "actor",
        color: "text-foreground",
        glow: "shadow-[0_0_24px_-2px_rgba(56,189,248,0.55)]",
        iconBg: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    },
    {
        id: "cache",
        label: "LRU cache lookup",
        detail: "30s TTL · in-memory",
        icon: <Database size={16} />,
        kind: "decision",
        color: "text-foreground",
        glow: "shadow-[0_0_24px_-2px_rgba(250,204,21,0.55)]",
        iconBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    },
    {
        id: "provider1",
        label: "Vercel AI Gateway",
        detail: "Primary · cost-ordered",
        icon: <Brain size={16} />,
        kind: "provider",
        color: "text-foreground",
        glow: "shadow-[0_0_24px_-2px_rgba(99,102,241,0.6)]",
        iconBg: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    },
    {
        id: "fallback",
        label: "On 429 / 5xx / 402",
        detail: "Silent fall-through",
        icon: <Zap size={16} />,
        kind: "fallback",
        color: "text-foreground",
        glow: "shadow-[0_0_24px_-2px_rgba(244,114,182,0.55)]",
        iconBg: "bg-pink-500/15 text-pink-300 border-pink-500/30",
    },
    {
        id: "provider2",
        label: "OpenRouter",
        detail: "Fallback · openai/gpt-oss-120b:free",
        icon: <Brain size={16} />,
        kind: "provider",
        color: "text-foreground",
        glow: "shadow-[0_0_24px_-2px_rgba(34,197,94,0.55)]",
        iconBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    },
    {
        id: "stream",
        label: "Stream response back",
        detail: "Vercel AI SDK · first token < 500ms",
        icon: <ArrowDown size={16} />,
        kind: "stream",
        color: "text-foreground",
        glow: "shadow-[0_0_24px_-2px_rgba(56,189,248,0.6)]",
        iconBg: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    },
];

const STEP_DURATION_MS = 850;

export default function RequestFlowDiagram() {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: false, amount: 0.35 });
    const prefersReducedMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const [running, setRunning] = useState(false);

    /** Play the sequence from step 0 to the end. */
    const play = React.useCallback(() => {
        if (prefersReducedMotion) {
            // Reduced motion: jump straight to the final state, no timer.
            setActive(STEPS.length - 1);
            setRunning(false);
            return;
        }
        setActive(0);
        setRunning(true);
    }, [prefersReducedMotion]);

    /** When the diagram scrolls into view, auto-play once. */
    useEffect(() => {
        if (inView && !running && active === 0) {
            play();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    /**
     * Reduced motion: if the user has the OS-level setting on, snap
     * straight to the final step as soon as the diagram is in view.
     * No timers, no per-step scale animation, no spinning replay icon.
     */
    useEffect(() => {
        if (prefersReducedMotion && inView) {
            setActive(STEPS.length - 1);
            setRunning(false);
        }
    }, [prefersReducedMotion, inView]);

    /** Step the animation forward on a timer. */
    useEffect(() => {
        if (!running) return;
        if (active >= STEPS.length - 1) {
            setRunning(false);
            return;
        }
        const t = setTimeout(() => setActive((a) => a + 1), STEP_DURATION_MS);
        return () => clearTimeout(t);
    }, [active, running]);

    return (
        <section>
            <div className="mb-3 flex items-end justify-between gap-3">
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground">
                    Request flow
                </h2>
                {prefersReducedMotion ? (
                    // Under reduced motion the diagram is already at its
                    // final state, so there's nothing to replay.
                    <span className="font-mono text-[10px] uppercase tracking-wider text-secondary-foreground/50">
                        Static view
                    </span>
                ) : (
                    <button
                        type="button"
                        onClick={play}
                        className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/[0.08] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary transition-all hover:border-primary/60 hover:bg-primary/15"
                        aria-label="Replay the request flow"
                    >
                        {running ? (
                            <>
                                <RotateCcw size={11} className="animate-spin" aria-hidden="true" />
                                Replaying
                            </>
                        ) : active === STEPS.length - 1 ? (
                            <>
                                <RotateCcw size={11} aria-hidden="true" />
                                Replay
                            </>
                        ) : (
                            <>
                                <Play size={11} aria-hidden="true" />
                                Play
                            </>
                        )}
                    </button>
                )}
            </div>

            <p className="mb-5 text-sm leading-relaxed text-secondary-foreground/80">
                From the visitor&apos;s first keystroke to the streaming token, here&apos;s what
                each request does on the wire.
            </p>

            <div
                ref={containerRef}
                className="relative overflow-hidden rounded-2xl border border-border/40 bg-surface/20 p-4 sm:p-6"
            >
                {/* Faint grid backdrop */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                />

                {/* Steps */}
                <ol className="relative space-y-2 sm:space-y-3">
                    {STEPS.map((s, i) => {
                        const isActive = i <= active;
                        const isCurrent = i === active && running;
                        return (
                            <li key={s.id} className="relative">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        opacity: isActive ? 1 : 0.32,
                                        scale: isCurrent ? 1.015 : 1,
                                    }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className={cn(
                                        "relative flex items-center gap-3 rounded-xl border border-transparent bg-background/40 p-3 sm:p-3.5",
                                        isCurrent && "border-primary/30",
                                        isCurrent && s.glow
                                    )}
                                >
                                    {/* Index column */}
                                    <div className="flex w-7 shrink-0 flex-col items-center">
                                        <span
                                            className={cn(
                                                "font-mono text-[10px] font-bold tracking-wider",
                                                isActive ? "text-primary" : "text-secondary-foreground/40"
                                            )}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <motion.div
                                        animate={{
                                            backgroundColor: isActive
                                                ? "rgba(255,255,255,0.04)"
                                                : "rgba(255,255,255,0.01)",
                                        }}
                                        className={cn(
                                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                                            isActive ? s.iconBg : "border-border/40 text-secondary-foreground/50"
                                        )}
                                    >
                                        {s.icon}
                                    </motion.div>

                                    {/* Labels */}
                                    <div className="min-w-0 flex-1">
                                        <div
                                            className={cn(
                                                "font-mono text-[11px] font-bold uppercase tracking-wider sm:text-xs",
                                                isActive ? s.color : "text-secondary-foreground/50"
                                            )}
                                        >
                                            {s.label}
                                        </div>
                                        {s.detail && (
                                            <div
                                                className={cn(
                                                    "mt-0.5 truncate text-[11px] sm:text-xs",
                                                    isActive
                                                        ? "text-secondary-foreground/70"
                                                        : "text-secondary-foreground/40"
                                                )}
                                            >
                                                {s.detail}
                                            </div>
                                        )}
                                    </div>

                                    {/* Pulse on the current step */}
                                    <AnimatePresence>
                                        {isCurrent && (
                                            <motion.span
                                                key="pulse"
                                                initial={{ opacity: 0, scale: 0.6 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.6 }}
                                                transition={{ duration: 0.4 }}
                                                className="ml-auto h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
                                                aria-hidden="true"
                                            >
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Connector line */}
                                {i < STEPS.length - 1 && (
                                    <div
                                        aria-hidden="true"
                                        className="absolute left-[2.2rem] top-full h-2 sm:h-3 w-px"
                                    >
                                        <div
                                            className={cn(
                                                "h-full w-full transition-colors duration-300",
                                                i < active ? "bg-primary/60" : "bg-border/40"
                                            )}
                                        />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ol>

                {/* Caption */}
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/30 pt-3 font-mono text-[10px] uppercase tracking-wider text-secondary-foreground/50">
                    <span>
                        Step {Math.min(active + 1, STEPS.length)} / {STEPS.length}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Edge runtime</span>
                    <span aria-hidden="true">·</span>
                    <span>Streaming first token &lt; 500ms</span>
                </div>
            </div>
        </section>
    );
}
