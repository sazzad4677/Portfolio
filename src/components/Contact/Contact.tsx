"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Element } from "react-scroll";
import { Mail, User, MessageSquare, Send, Copy, Check } from "lucide-react";
import contentManager from "@/lib/contentManager";

const Contact: React.FC = () => {
    const content = contentManager.getContact();

    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });

    const copyToClipboard = () => {
        navigator.clipboard.writeText(content.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setStatus("sending");
        const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                setStatus("success");
                setFormState({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const revealVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <Element name="contact" className="scroll-anchor">
            <motion.section
                id="contact"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={revealVariants}
                className="relative pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-28 md:pb-32 overflow-hidden"
            >
                {/* Atmospheric Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />

                <div className="site-container relative z-10 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-[960px]">

                        {/* Header */}
                        <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
                            <span className="mb-4 flex items-center justify-center font-mono text-xs tracking-widest text-primary uppercase">
                                <span className="mr-3 h-px w-6 bg-primary/30" />
                                08. {content.preHeading}
                                <span className="ml-3 h-px w-6 bg-primary/30" />
                            </span>
                            <h2 className="mb-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground text-balance">
                                {status === "success" ? "Message Received!" : content.heading}
                            </h2>
                            <p className="mx-auto max-w-[560px] text-sm sm:text-base leading-relaxed text-secondary-foreground/70">
                                {status === "success"
                                    ? "Thank you for reaching out! I've received your message and will get back to you as soon as possible."
                                    : (content.description || "I'd like to work for any company that believes my skills will be helpful. Please let me know — I'll do my best to respond!")}
                            </p>
                        </motion.div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

                            {/* Form */}
                            <motion.div variants={itemVariants} className="lg:col-span-3">
                                <AnimatePresence mode="wait">
                                    {status === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"
                                        >
                                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <Check size={32} />
                                            </div>
                                            <h3 className="mb-3 text-xl font-bold text-foreground">Talk to you soon!</h3>
                                            <button
                                                onClick={() => setStatus("idle")}
                                                className="font-mono text-xs text-primary hover:underline"
                                            >
                                                Send another message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-6 sm:space-y-8"
                                        >
                                            {/* Honeypot */}
                                            <input type="text" name="_gotcha" className="hidden" />

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-primary/80 uppercase">
                                                        <User size={12} /> Name
                                                    </label>
                                                    <input
                                                        required
                                                        name="name"
                                                        type="text"
                                                        value={formState.name}
                                                        onChange={handleInput}
                                                        placeholder="Your Name"
                                                        className="w-full bg-surface/20 border border-border/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-secondary-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-primary/80 uppercase">
                                                        <Mail size={12} /> Email
                                                    </label>
                                                    <input
                                                        required
                                                        name="email"
                                                        type="email"
                                                        value={formState.email}
                                                        onChange={handleInput}
                                                        placeholder="your@email.com"
                                                        className="w-full bg-surface/20 border border-border/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-secondary-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-primary/80 uppercase">
                                                    <MessageSquare size={12} /> Message
                                                </label>
                                                <textarea
                                                    required
                                                    name="message"
                                                    rows={5}
                                                    value={formState.message}
                                                    onChange={handleInput}
                                                    placeholder="Hello! I'm reaching out because..."
                                                    className="w-full bg-surface/20 border border-border/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-secondary-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                disabled={status === "sending"}
                                                whileHover={{ scale: 1.01, y: -1 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-primary/20 bg-primary/5 px-6 py-3.5 font-mono text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span>
                                                    {status === "sending" ? "Sending..." : "Send Message"}
                                                </span>
                                                <Send
                                                    size={15}
                                                    className={`transition-transform ${status === "sending"
                                                        ? "animate-pulse"
                                                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                        }`}
                                                />
                                            </motion.button>

                                            {status === "error" && (
                                                <p className="text-xs text-red-400 font-mono text-center">
                                                    Oops! Something went wrong. Please try again or use the direct email.
                                                </p>
                                            )}
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Sidebar */}
                            <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-6">
                                <div className="rounded-2xl border border-border/40 bg-surface/20 p-5">
                                    <h4 className="mb-2 font-sans text-base font-bold text-foreground">
                                        Let&apos;s talk directly
                                    </h4>
                                    <p className="mb-5 text-xs leading-relaxed text-secondary-foreground/60">
                                        Prefer to use your own email client? Use the direct address below. I typically respond within 24 hours.
                                    </p>

                                    <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-primary/5 p-3 mb-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <Mail size={16} />
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="text-[9px] uppercase tracking-widest text-primary/60 font-mono">Email me at</span>
                                            <span className="text-xs sm:text-sm font-medium text-foreground truncate">{content.email}</span>
                                        </div>
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg hover:bg-primary/10 text-primary transition-colors"
                                            title="Copy to clipboard"
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                    </div>

                                    <a
                                        href={`mailto:${content.email}`}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-xs font-bold text-primary-foreground transition-all hover:opacity-90"
                                    >
                                        Open Mail Client
                                    </a>
                                </div>

                                <div className="flex items-center gap-3 px-1">
                                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/40 shrink-0">
                                        Availability
                                    </p>
                                    <div className="h-px flex-1 bg-border/20" />
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                        </span>
                                        <span className="text-xs text-secondary-foreground/70 whitespace-nowrap">
                                            Available for full-time / freelance (GMT+6)
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </motion.section>
        </Element>
    );
};

export default Contact;