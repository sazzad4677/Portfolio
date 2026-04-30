"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Lock, User, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface AIChatBoxProps {
    isOpen: boolean;
    onClose: () => void;
}

const QUICK_CHIPS = ["Tech stack", "Latest project", "Open to work?"];

// ── Bouncing typing indicator ──────────────────────────────────────────────────
function TypingDots() {
    return (
        <div className="flex items-end gap-2">
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-0.5">
                <Lock size={13} className="text-primary" />
            </div>
            <div className="flex items-center gap-1 px-3 py-3 rounded-2xl rounded-bl-sm bg-muted border border-border/40">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    />
                ))}
            </div>
        </div>
    );
}

// ── Error message parser ───────────────────────────────────────────────────────
function parseErrorMessage(error: Error): string {
    const msg = error.message ?? "";
    if (msg.includes("fetch") || msg.includes("NetworkError")) {
        return "Connection error. Please check your internet and try again.";
    }
    try {
        const jsonPart = msg.includes("Error: ") ? msg.split("Error: ")[1] : msg;
        const parsed = JSON.parse(jsonPart);
        if (parsed?.error) return parsed.error;
    } catch {
        // not JSON — fall through
    }
    return msg || "Something went wrong. Please try again.";
}

// ── Markdown link component ────────────────────────────────────────────────────
function MarkdownLink({
    href,
    children,
}: {
    href?: string;
    children?: React.ReactNode;
}) {
    const isMailto = href?.startsWith("mailto:");
    return (
        <a
            href={href}
            target={isMailto ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:opacity-75 transition-opacity break-all"
        >
            {children}
        </a>
    );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function AIChatBox({ isOpen, onClose }: AIChatBoxProps) {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        error,
        append,
    } = useChat({
        api: "/api/chat",
        onError: (err) => console.error("[AIChatBox]", err),
    });

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => inputRef.current?.focus(), 150);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    const onSubmit = useCallback(
        (e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!input.trim() || isLoading) return;
            handleSubmit(e);
        },
        [input, isLoading, handleSubmit]
    );

    // Chip click — directly appends and sends without needing to fill input first
    const handleChipClick = useCallback(
        (text: string) => {
            if (isLoading) return;
            append({ role: "user", content: text });
        },
        [isLoading, append]
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 16 }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    onClick={(e) => e.stopPropagation()}
                    className="fixed bottom-28 right-4 lg:right-[calc(8rem+1rem)] z-[100] w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] rounded-2xl border border-border/50 bg-background shadow-2xl flex flex-col overflow-hidden"
                >
                    {/* ── Header ─────────────────────────────────────────────── */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-background shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Lock size={16} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground leading-none mb-1">
                                    Sazzad's Assistant
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">
                                        Online
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            aria-label="Close chat"
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* ── Messages ───────────────────────────────────────────── */}
                    <div
                        ref={scrollRef}
                        data-lenis-prevent
                        role="log"
                        aria-label="Chat messages"
                        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-border/80"
                    >
                        {/* Empty state */}
                        {messages.length === 0 && !error && (
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-center pb-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Lock size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Sazzad's Assistant
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1 max-w-[180px]">
                                        Ask me about his skills, projects, or experience.
                                    </p>
                                </div>
                                {/* Quick prompt chips */}
                                <div className="flex flex-wrap gap-2 justify-center mt-1">
                                    {QUICK_CHIPS.map((chip) => (
                                        <button
                                            key={chip}
                                            onClick={() => handleChipClick(chip)}
                                            disabled={isLoading}
                                            className="px-3 py-1.5 rounded-full text-xs border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Message bubbles */}
                        {messages?.map((m) => (
                            <div
                                key={m.id}
                                className={cn(
                                    "flex items-end gap-2",
                                    m.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                {/* Avatar */}
                                <div
                                    aria-hidden="true"
                                    className={cn(
                                        "h-7 w-7 rounded-full flex items-center justify-center shrink-0 mb-0.5",
                                        m.role === "user" ? "bg-primary" : "bg-primary/10"
                                    )}
                                >
                                    {m.role === "user" ? (
                                        <User size={13} className="text-primary-foreground" />
                                    ) : (
                                        <Lock size={13} className="text-primary" />
                                    )}
                                </div>

                                {/* Bubble */}
                                <div
                                    className={cn(
                                        "max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed break-words",
                                        m.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
                                            : "bg-muted border border-border/40 text-foreground rounded-2xl rounded-bl-sm"
                                    )}
                                >
                                    {m.role === "assistant" ? (
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => (
                                                    <p className="mb-2 last:mb-0">{children}</p>
                                                ),
                                                strong: ({ children }) => (
                                                    <strong className="font-semibold text-foreground">
                                                        {children}
                                                    </strong>
                                                ),
                                                code: ({ children }) => (
                                                    <code className="px-1 py-0.5 rounded bg-background/60 font-mono text-xs text-primary border border-border/40">
                                                        {children}
                                                    </code>
                                                ),
                                                ul: ({ children }) => (
                                                    <ul className="list-disc list-inside space-y-0.5 mb-2 last:mb-0">
                                                        {children}
                                                    </ul>
                                                ),
                                                ol: ({ children }) => (
                                                    <ol className="list-decimal list-inside space-y-0.5 mb-2 last:mb-0">
                                                        {children}
                                                    </ol>
                                                ),
                                                // All links go through MarkdownLink —
                                                // mailto → _self (opens mail client)
                                                // https  → _blank (new tab)
                                                a: ({ href, children }) => (
                                                    <MarkdownLink href={href}>
                                                        {children}
                                                    </MarkdownLink>
                                                ),
                                            }}
                                        >
                                            {m.content}
                                        </ReactMarkdown>
                                    ) : (
                                        m.content
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isLoading && <TypingDots />}

                        {/* Error bubble */}
                        {error && (
                            <div className="flex items-end gap-2">
                                <div className="h-7 w-7 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mb-0.5">
                                    <AlertCircle size={13} className="text-destructive" />
                                </div>
                                <div className="max-w-[78%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                    {parseErrorMessage(error)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Input ──────────────────────────────────────────────── */}
                    <form
                        onSubmit={onSubmit}
                        className="px-3 py-3 border-t border-border/40 bg-background shrink-0"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                maxLength={4000}
                                placeholder={
                                    isLoading
                                        ? "Assistant is thinking..."
                                        : "Ask about skills, projects..."
                                }
                                aria-label="Chat message input"
                                className="flex-1 h-10 bg-muted border border-border/40 rounded-xl px-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                aria-label="Send message"
                                className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95 transition-all"
                            >
                                <Send size={15} />
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}