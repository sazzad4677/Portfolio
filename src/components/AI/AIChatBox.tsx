import React, { useRef, useEffect, useCallback, useState, useMemo } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, User, AlertCircle, RotateCw, Square, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { OpenChatDetail } from "@/lib/aiChatEvents";

/**
 * Sentinel returned by the server when a streaming response aborts before any
 * usable content. The chat client detects this and silently re-POSTs the
 * same history to the next (provider, model) candidate. Capped at
 * `MAX_RETRY_COUNT` to bound latency.
 */
const RETRY_SENTINEL = "__retry__";
const MAX_RETRY_COUNT = 2;

interface AIChatBoxProps {
    isOpen: boolean;
    onClose: () => void;
    pendingDetail?: OpenChatDetail | null;
    onPendingConsumed?: () => void;
}

const PRESET_QUESTION_POOL = [
    "How does Sazzad use Cursor & Claude?",
    "Is Sazzad open for full-time roles?",
    "Tell me about the WebRTC video engine",
    "How does MediaPipe posture tracking work?",
    "How did he refactor the legacy .NET ERP?",
    "What is the Smart Inventory System?",
    "What awards did Sazzad win at Buyonia?",
    "What ongoing courses is Sazzad taking?",
    "What is Sazzad's preferred tech stack?",
];

function getRandomPresetQuestions(count = 4): string[] {
    const shuffled = [...PRESET_QUESTION_POOL].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function getFollowUpSuggestions(lastAssistantText: string, lastUserText: string): string[] {
    const text = (lastAssistantText + " " + lastUserText).toLowerCase();

    if (text.includes("webrtc") || text.includes("mymedicalhub") || text.includes("video")) {
        return [
            "Tell me about MediaPipe AI pose tracking",
            "What tech stack was used at MMHI?",
            "Is Sazzad available for new roles?",
        ];
    }
    if (text.includes("mediapipe") || text.includes("pose") || text.includes("assessment")) {
        return [
            "How does the WebRTC video system work?",
            "Tell me about Sazzad's AI projects",
            "What awards has Sazzad won?",
        ];
    }
    if (text.includes("erp") || text.includes("buyonia") || text.includes(".net")) {
        return [
            "Tell me about the Figma component library",
            "What awards did he win at Buyonia?",
            "What is Sazzad's preferred stack?",
        ];
    }
    if (text.includes("inventory") || text.includes("smart inventory")) {
        return [
            "How does Sazzad use LLMs & OpenRouter?",
            "Tell me about his professional experience",
            "What are his core skills?",
        ];
    }
    if (text.includes("available") || text.includes("hire") || text.includes("contact") || text.includes("work")) {
        return [
            "What are Sazzad's flagship projects?",
            "How does he use AI in daily workflows?",
            "What certifications does he hold?",
        ];
    }

    return [
        "Tell me about his WebRTC & MediaPipe work",
        "How did he modernize the legacy .NET ERP?",
        "Is Sazzad available for full-time roles?",
    ];
}

const FANCY_THINKING_LINES = [
    "Thinking...",
    "Just a sec...",
    "Connecting to Sazzad's brain...",
    "Analyzing your question...",
    "Searching portfolio knowledge...",
    "Synthesizing answer...",
    "Formulating response...",
];

function TypingDots() {
    const [lineIndex, setLineIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setLineIndex((prev) => (prev + 1) % FANCY_THINKING_LINES.length);
        }, 2200);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-end gap-2">
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-0.5 animate-pulse">
                <Sparkles size={13} className="text-primary" />
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-muted border border-border/40 shadow-sm">
                <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-primary/70 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={lineIndex}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-muted-foreground font-mono font-medium pl-1"
                    >
                        {FANCY_THINKING_LINES[lineIndex]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
}

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

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            type="button"
            aria-label="Copy response"
            title="Copy response"
            onClick={async () => {
                try {
                    await navigator.clipboard.writeText(text);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                } catch {
                    /* no-op */
                }
            }}
            className="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground"
        >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? "Copied" : "Copy"}
        </button>
    );
}

export default function AIChatBox({
    isOpen,
    onClose,
    pendingDetail,
    onPendingConsumed,
}: AIChatBoxProps) {
    // Pass the projectSlug to the chat route on every request — including append().
    const chatBody = useMemo(
        () => (pendingDetail?.projectSlug ? { projectSlug: pendingDetail.projectSlug } : undefined),
        [pendingDetail?.projectSlug]
    );

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        error,
        append,
        stop,
        setMessages,
    } = useChat({
        api: "/api/chat",
        body: chatBody,
        onError: (err) => console.error("[AIChatBox]", err),
        onFinish: (message) => {
            // Server closed the stream with the retry sentinel — strip the
            // empty assistant turn and silently re-POST the same user prompt
            // so the route can try the next (provider, model) candidate.
            if (
                message.role === "assistant" &&
                message.content === RETRY_SENTINEL &&
                retryCountRef.current < MAX_RETRY_COUNT
            ) {
                retryCountRef.current += 1;
                // Find the most recent user message to re-send.
                const lastUser = [...messages].reverse().find((m) => m.role === "user");
                if (!lastUser) return;
                // Drop the empty assistant turn so the timeline stays clean.
                setMessages((prev) => prev.filter((m) => !(m.role === "assistant" && m.content === RETRY_SENTINEL)));
                // Re-append the same prompt. useChat will POST again.
                append({ role: "user", content: lastUser.content });
            }
        },
    });

    // Reset the retry counter whenever a real new user message lands.
    // We detect this by watching the last user message id change.
    const lastUserIdRef = useRef<string | null>(null);
    const retryCountRef = useRef(0);
    useEffect(() => {
        const lastUser = [...messages].reverse().find((m) => m.role === "user");
        const id = lastUser?.id ?? null;
        if (id && id !== lastUserIdRef.current) {
            lastUserIdRef.current = id;
            retryCountRef.current = 0;
        }
    }, [messages]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [presetQuestions, setPresetQuestions] = useState<string[]>([]);
    const [hasConsumedPending, setHasConsumedPending] = useState(false);

    const refreshPresetQuestions = useCallback(() => {
        setPresetQuestions(getRandomPresetQuestions(4));
    }, []);

    useEffect(() => {
        refreshPresetQuestions();
    }, [refreshPresetQuestions]);

    // Reset consumption flag when pendingDetail changes so a new seeded prompt can fire.
    useEffect(() => {
        setHasConsumedPending(false);
    }, [pendingDetail]);

    // Consume pendingDetail by appending the prompt once the chat is open.
    useEffect(() => {
        if (!isOpen || !pendingDetail || hasConsumedPending || isLoading) return;
        append({ role: "user", content: pendingDetail.prompt });
        setHasConsumedPending(true);
        onPendingConsumed?.();
    }, [isOpen, pendingDetail, hasConsumedPending, isLoading, append, onPendingConsumed]);

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

    const handleChipClick = useCallback(
        (text: string) => {
            if (isLoading) return;
            append({ role: "user", content: text });
        },
        [isLoading, append]
    );

    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 16 }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    onClick={(e) => e.stopPropagation()}
                    className="fixed bottom-28 right-4 left-4 lg:left-auto lg:right-[calc(8rem+1rem)] z-[100] w-auto lg:w-[min(380px,calc(100vw-2rem))] h-[min(520px,calc(100dvh-9rem))] max-h-[70vh] rounded-2xl border border-border/50 bg-background shadow-2xl flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-background shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Sparkles size={16} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground leading-none mb-1">
                                    {pendingDetail?.projectSlug ? "Project Q&A" : "Sazzad's Assistant"}
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">
                                        Online
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {messages.length > 0 && (
                                <button
                                    onClick={() => {
                                        setMessages([]);
                                        setPresetQuestions(getRandomPresetQuestions(4));
                                    }}
                                    aria-label="Reset conversation"
                                    title="Reset conversation"
                                    className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                >
                                    <RotateCw size={14} />
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                aria-label="Close chat"
                                className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        data-lenis-prevent
                        role="log"
                        aria-label="Chat messages"
                        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-border/80"
                    >
                        {messages.length === 0 && !error && (
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-center pb-2">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Sparkles size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Sazzad's Assistant
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1 max-w-[220px]">
                                        Ask me about his skills, projects, AI workflow, or availability.
                                    </p>
                                </div>

                                <div className="w-full max-w-[320px] space-y-2 mt-1">
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-[10px] font-mono text-muted-foreground/80 uppercase tracking-wider">
                                            Preset Questions
                                        </span>
                                        <button
                                            onClick={refreshPresetQuestions}
                                            className="flex items-center gap-1 text-[10px] font-mono text-primary/80 hover:text-primary transition-colors py-0.5 px-1.5 rounded hover:bg-primary/10"
                                            title="Shuffle preset questions"
                                            type="button"
                                        >
                                            <RotateCw size={10} className="shrink-0" />
                                            <span>Shuffle</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 justify-center">
                                        {presetQuestions.map((chip) => (
                                            <button
                                                key={chip}
                                                onClick={() => handleChipClick(chip)}
                                                disabled={isLoading}
                                                className="px-3 py-1.5 rounded-xl text-xs border border-border/60 bg-muted/40 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-left"
                                            >
                                                {chip}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {messages?.map((m) => {
                            // Hide the retry sentinel from the user — it
                            // would otherwise show as a literal "__retry__"
                            // bubble while the silent re-POST is in flight.
                            if (m.role === "assistant" && m.content === RETRY_SENTINEL) {
                                return null;
                            }
                            return (
                            <div
                                key={m.id}
                                className={cn(
                                    "flex items-end gap-2",
                                    m.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}
                            >
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
                                        <Sparkles size={13} className="text-primary" />
                                    )}
                                </div>

                                <div className="flex flex-col gap-1 max-w-[78%]">
                                    <div
                                        className={cn(
                                            "px-3.5 py-2.5 text-sm leading-relaxed break-words",
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
                                    {m.role === "assistant" && m === lastAssistant && (
                                        <div className="px-1 self-start">
                                            <CopyButton text={m.content} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                            })}

                        {isLoading && <TypingDots />}

                        {!isLoading && messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
                            <div className="pl-9 pr-2 pt-1 pb-2 space-y-2">
                                <p className="text-[11px] font-mono text-primary/90 flex items-center gap-1 font-semibold">
                                    <Sparkles size={11} className="text-primary" /> Suggested follow-ups:
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {getFollowUpSuggestions(
                                        messages[messages.length - 1].content,
                                        messages.length > 1 ? messages[messages.length - 2].content : ""
                                    ).map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleChipClick(suggestion)}
                                            className="text-left px-3 py-1.5 rounded-xl text-xs border border-primary/25 bg-primary/5 text-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 active:scale-95 transition-all shadow-sm"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

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

                    {/* Input */}
                    <form
                        onSubmit={onSubmit}
                        className="px-3 py-3 border-t border-border/40 bg-background shrink-0"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={handleInputChange}
                                maxLength={4000}
                                placeholder={
                                    isLoading
                                        ? "AI is responding... (type anytime)"
                                        : pendingDetail?.projectSlug
                                        ? "Ask anything about this project..."
                                        : "Ask about skills, projects, AI workflow..."
                                }
                                aria-label="Chat message input"
                                className="flex-1 h-10 bg-muted border border-border/40 rounded-xl px-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                            />
                            {isLoading ? (
                                <button
                                    type="button"
                                    onClick={stop}
                                    aria-label="Stop AI generation"
                                    title="Stop AI generation"
                                    className="h-10 w-10 rounded-xl bg-destructive text-destructive-foreground flex items-center justify-center shrink-0 hover:bg-destructive/90 active:scale-95 transition-all shadow-sm"
                                >
                                    <Square size={13} className="fill-current" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    aria-label="Send message"
                                    className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95 transition-all"
                                >
                                    <Send size={15} />
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
