"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Sparkles, X } from "lucide-react";
import AIChatBox from "./AIChatBox";
import { cn } from "@/lib/utils";

export default function AIChatBubble() {
    const [isOpen, setIsOpen] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowGreeting(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    return (
        <>
            <div className="fixed bottom-8 right-6 lg:right-18 z-[100] flex flex-col items-end gap-3">

                {/* ── Greeting Toast ── */}
                <AnimatePresence>
                    {showGreeting && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 16, scale: 0.92 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 16, scale: 0.92 }}
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            className="relative mb-2 bg-background border border-border/50 rounded-2xl py-3 px-4 shadow-lg max-w-[220px] cursor-pointer"
                            onClick={() => {
                                setIsOpen(true);
                                setShowGreeting(false);
                            }}
                        >
                            {/* Dismiss button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowGreeting(false);
                                }}
                                aria-label="Dismiss greeting"
                                className="absolute -top-2 -right-2 h-5 w-5 bg-background border border-border/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm"
                            >
                                <X size={10} />
                            </button>

                            <div className="flex items-center gap-2.5">
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
                                <p className="text-xs text-foreground leading-relaxed">
                                    Hi! Ask me anything about Sazzad's work.
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
                    aria-label={isOpen ? "Close assistant" : "Open assistant"}
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
            />
        </>
    );
}