import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Element } from "react-scroll";
import { Mail, User, MessageSquare, Send, Copy, Check } from "lucide-react";
import contentManager from "@/lib/contentManager";
import { ContactContent } from "@/lib/types";

const Contact: React.FC = () => {
    const [content, setContent] = useState<ContactContent>({
        preHeading: "What's Next?",
        heading: "Get In Touch",
        description: "",
        email: "sazzad4677@gmail.com",
        ctaText: "Say Hello"
    });

    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });

    useEffect(() => {
        const contactData = contentManager.getContact();
        if (contactData) setContent(contactData);
    }, []);

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
        } catch (error) {
            setStatus("error");
        }
    };

    const revealVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <Element name="contact" className="scroll-anchor">
            <motion.section
                id="contact"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealVariants}
                className="relative py-24 md:py-32 overflow-hidden"
            >
                {/* Atmospheric Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />

                <div className="site-container relative z-10">
                    <div className="mx-auto max-w-[1000px]">
                        <motion.div variants={itemVariants} className="text-center mb-16">
                            <span className="mb-4 flex items-center justify-center font-mono text-sm tracking-widest text-primary uppercase">
                                <span className="mr-3 h-px w-8 bg-primary/30" />
                                07. {content.preHeading}
                                <span className="ml-3 h-px w-8 bg-primary/30" />
                            </span>
                            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
                                {status === "success" ? "Message Received!" : content.heading}
                            </h2>
                            <p className="mx-auto max-w-[600px] text-base leading-relaxed text-secondary-foreground/70 md:text-lg">
                                {status === "success"
                                    ? "Thank you for reaching out! I've received your message and will get back to you as soon as possible."
                                    : (content.description || "I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll do my best to get back to you!")}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                            {/* Contact Form Container */}
                            <motion.div variants={itemVariants} className="lg:col-span-3">
                                <AnimatePresence mode="wait">
                                    {status === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center backdrop-blur-md"
                                        >
                                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <Check size={40} />
                                            </div>
                                            <h3 className="mb-4 text-2xl font-bold text-foreground">Talk to you soon!</h3>
                                            <button
                                                onClick={() => setStatus("idle")}
                                                className="font-mono text-sm text-primary hover:underline"
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
                                            className="space-y-6"
                                        >
                                            {/* Honeypot for Spam Protection */}
                                            <input type="text" name="_gotcha" className="hidden" />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 font-mono text-xs text-primary/80 ml-1">
                                                        <User size={14} /> Name
                                                    </label>
                                                    <input
                                                        required
                                                        name="name"
                                                        type="text"
                                                        value={formState.name}
                                                        onChange={handleInput}
                                                        placeholder="Your Name"
                                                        className="w-full bg-surface/20 border border-border/40 rounded-xl px-5 py-3.5 text-foreground placeholder:text-secondary-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all backdrop-blur-md"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 font-mono text-xs text-primary/80 ml-1">
                                                        <Mail size={14} /> Email
                                                    </label>
                                                    <input
                                                        required
                                                        name="email"
                                                        type="email"
                                                        value={formState.email}
                                                        onChange={handleInput}
                                                        placeholder="your@email.com"
                                                        className="w-full bg-surface/20 border border-border/40 rounded-xl px-5 py-3.5 text-foreground placeholder:text-secondary-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all backdrop-blur-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 font-mono text-xs text-primary/80 ml-1">
                                                    <MessageSquare size={14} /> Message
                                                </label>
                                                <textarea
                                                    required
                                                    name="message"
                                                    rows={5}
                                                    value={formState.message}
                                                    onChange={handleInput}
                                                    placeholder="Hello! I'm reaching out because..."
                                                    className="w-full bg-surface/20 border border-border/40 rounded-xl px-5 py-3.5 text-foreground placeholder:text-secondary-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all backdrop-blur-md resize-none"
                                                />
                                            </div>
                                            <motion.button
                                                type="submit"
                                                disabled={status === "sending"}
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-primary/20 bg-primary/5 px-8 py-4 font-mono text-base font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="relative z-10">
                                                    {status === "sending" ? "Sending..." : "Send Message"}
                                                </span>
                                                <Send size={18} className={`relative z-10 transition-transform ${status === "sending" ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                                                <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-shine" />
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

                            {/* Direct Contact Info */}
                            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                                <div className="rounded-2xl border border-border/40 bg-surface/20 p-6 backdrop-blur-md">
                                    <h4 className="mb-6 font-sans text-xl font-bold text-foreground">
                                        Let&apos;s talk directly
                                    </h4>
                                    <p className="mb-8 text-sm leading-relaxed text-secondary-foreground/60">
                                        Prefer to use your own email client? Use the direct address below. I typically respond within 24 hours.
                                    </p>

                                    <div className="flex flex-col gap-4">
                                        <div className="group relative flex items-center justify-between rounded-xl border border-primary/10 bg-primary/5 p-4 transition-all hover:border-primary/30">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <Mail size={20} />
                                                </div>
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="text-[10px] uppercase tracking-widest text-primary/60 font-mono">Email me at</span>
                                                    <span className="text-xs sm:text-sm xl:text-base font-medium text-foreground truncate">{content.email}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={copyToClipboard}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-primary/10 text-primary transition-colors"
                                                title="Copy to clipboard"
                                            >
                                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                        </div>

                                        <a
                                            href={`mailto:${content.email}`}
                                            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-mono text-sm font-bold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg shadow-primary/20"
                                        >
                                            Open Mail Client
                                        </a>
                                    </div>
                                </div>

                                <div className="px-4">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-4">
                                        Availability
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-sm text-secondary-foreground/80">Available for full-time roles & projects</span>
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
