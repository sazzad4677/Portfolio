"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Sparkles, X } from "lucide-react";
import AIChatBox from "./AIChatBox";
import { cn } from "@/lib/utils";
import { OPEN_AI_CHAT_EVENT, type OpenChatDetail } from "@/lib/aiChatEvents";

const GREETING_TIPS: { text: string; prompt: string }[] = [
    { text: "Try: How does Sazzad use Cursor & Claude daily?", prompt: "How does Sazzad use Cursor & Claude in his daily workflow?" },
    { text: "Try: What's the WebRTC video engine?", prompt: "Tell me about the WebRTC video consultation engine" },
    { text: "Try: How does MediaPipe posture tracking work?", prompt: "How does the MediaPipe physical assessment work?" },
    { text: "Try: Is Sazzad open for full-time roles?", prompt: "Is Sazzad open for full-time roles?" },
    { text: "Try: How did the .NET ERP refactor go?", prompt: "How did Sazzad refactor the legacy .NET ERP?" },
    { text: "Try: What's the Smart Inventory & BI stack?", prompt: "What is the Smart Inventory & BI System?" },
];

function pickTip(): { text: string; prompt: string } {
    return GREETING_TIPS[Math.floor(Math.random() * GREETING_TIPS.length)];
}

export default function AIChatBubble() {
    const [isOpen, setIsOpen] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const [tip, setTip] = useState<{ text: string; prompt: string } | null>(null);
    const [pendingDetail, setPendingDetail] = useState<OpenChatDetail | null>(null);

    useEffect(() => {
        setTip(pickTip());
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowGreeting(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    // External entry points (hero "Ask the AI", project "Ask AI about this", etc.)
    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent<OpenChatDetail>).detail;
            setPendingDetail(detail);
            setIsOpen(true);
            setShowGreeting(false);
        };
        window.addEventListener(OPEN_AI_CHAT_EVENT, handler);
        return () => window.removeEventListener(OPEN_AI_CHAT_EVENT, handler);
    }, []);

    return (
        <>
            {/* Bubble: tucks in tighter on phones so it doesn't crowd the viewport edge */}
            <div className="fixed bottom-8 right-4 sm:right-6 lg:right-12 z-[100] flex flex-col items-end gap-3">

                {/* ── Greeting Toast ── */}
                <AnimatePresence>
                    {showGreeting && !isOpen && tip && (
                        <motion.div
                            initial={{ opacity: 0, x: 16, scale: 0.92 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 16, scale: 0.92 }}
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    openAIChatDirectly(tip.prompt);
                                }
                            }}
                            className="relative mb-2 bg-background border border-border/50 rounded-2xl py-3 px-4 shadow-lg max-w-[260px] cursor-pointer"
                            onClick={() => openAIChatDirectly(tip.prompt)}
                        >
                            {/* Dismiss button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowGreeting(false);
                                }}
                                aria-label="Dismiss greeting"
                                className="absolute -top-3 -right-3 h-9 w-9 bg-background border border-border/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all shadow-md active:scale-90"
                            >
                                <X size={14} />
                            </button>

                            <div className="flex items-center gap-2.5">
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
                                <p className="text-xs text-foreground leading-relaxed">
                                    {tip.text}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Main Bubble ── */}
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setShowGreeting(false);
                    }}
                    aria-label={isOpen ? "Close AI assistant" : "Ask the AI about Sazzad"}
                    className={cn(
                        "relative h-14 w-14 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300",
                        isOpen
                            ? "bg-background border-2 border-primary text-primary"
                            : "bg-primary text-primary-foreground"
                    )}
                >
                    {/* Pulse ring — only when closed */}
                    {!isOpen && (
                        <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping" />
                    )}

                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                            >
                                <X size={22} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                                className="relative"
                            >
                                <MessageSquareText size={22} />
                                {/* Badge */}
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-400 border-2 border-background flex items-center justify-center">
                                    <Sparkles size={8} className="text-amber-900" fill="currentColor" />
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            <AIChatBox
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                pendingDetail={pendingDetail}
                onPendingConsumed={() => setPendingDetail(null)}
            />
        </>
    );

    // Helper: forward a pre-seeded prompt to the chat box when the greeting toast is clicked.
    function openAIChatDirectly(prompt: string) {
        setPendingDetail({ prompt });
        setIsOpen(true);
        setShowGreeting(false);
    }
}
