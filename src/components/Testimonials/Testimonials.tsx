"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import { Quote, Linkedin } from "lucide-react";
import contentManager from "@/lib/contentManager";
import type { Testimonial } from "@/lib/types";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, staggerChildren: 0.12 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

function initials(name: string) {
    return name
        .split(/\s+/)
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

const Testimonials: React.FC = () => {
    const items = contentManager.getTestimonials();

    if (!items || items.length === 0) return null;

    return (
        <Element name="testimonials" className="scroll-anchor">
            <motion.section
                id="testimonials"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
                className="relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
            >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
                </div>

                <div className="site-container relative z-10">
                    {/* Heading */}
                    <motion.div variants={cardVariants} className="mb-10 md:mb-14 flex items-center space-x-4">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold text-foreground before:mr-2 before:font-mono before:text-lg before:text-primary before:content-['09.'] md:text-3xl">
                            What people say
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" aria-hidden="true" />
                    </motion.div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((t: Testimonial, i: number) => (
                            <motion.figure
                                key={i}
                                variants={cardVariants}
                                className="group relative flex h-full flex-col rounded-2xl border border-border/40 bg-surface/20 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:bg-surface/40"
                            >
                                <Quote
                                    size={28}
                                    className="mb-3 text-primary/40 transition-colors group-hover:text-primary/70"
                                    aria-hidden="true"
                                />

                                <blockquote className="flex-1 text-sm leading-relaxed text-secondary-foreground/85">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>

                                <figcaption className="mt-5 flex items-center gap-3 border-t border-border/30 pt-4">
                                    {t.avatarUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={t.avatarUrl}
                                            alt={`${t.name} avatar`}
                                            className="h-10 w-10 rounded-full border border-border/40 object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-xs font-bold text-primary"
                                            aria-hidden="true"
                                        >
                                            {initials(t.name)}
                                        </div>
                                    )}

                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex items-center gap-1.5">
                                            {t.linkedinUrl ? (
                                                <a
                                                    href={t.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-semibold text-foreground hover:text-primary"
                                                >
                                                    {t.name}
                                                </a>
                                            ) : (
                                                <span className="text-sm font-semibold text-foreground">
                                                    {t.name}
                                                </span>
                                            )}
                                            {t.linkedinUrl && (
                                                <a
                                                    href={t.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-secondary-foreground/50 hover:text-primary"
                                                    aria-label={`${t.name} on LinkedIn`}
                                                >
                                                    <Linkedin size={12} aria-hidden="true" />
                                                </a>
                                            )}
                                        </div>
                                        <div className="font-mono text-[10px] uppercase tracking-wider text-secondary-foreground/60">
                                            {t.role}
                                            {t.company ? ` · ${t.company}` : ""}
                                            {t.year ? ` · ${t.year}` : ""}
                                        </div>
                                    </div>
                                </figcaption>
                            </motion.figure>
                        ))}
                    </div>
                </div>
            </motion.section>
        </Element>
    );
};

export default Testimonials;
