"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import { Quote, ArrowRight } from "lucide-react";
import contentManager from "@/lib/contentManager";
import InfoCard from "./InfoCard";
import FeatureItem from "./FeatureItem";
import TechChip from "./TechChip";

/* ── Animation variants ─────────────────────────────────────── */
const sectionReveal: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const fadeRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

/* ================================================================
   ABOUT SECTION
   ================================================================ */
const About: React.FC = () => {
    const content = contentManager.getAbout();

    return (
        <Element name="about" className="scroll-anchor">
            <motion.section
                id="about"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionReveal}
                className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-32"
            >
                {/* ── Background blobs ────────────────────────── */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[120px]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-[5%] right-[-8%] h-[400px] w-[400px] rounded-full bg-primary/[0.04] blur-[100px]"
                />

                <div className="site-container relative z-10">
                    {/* ── Two-column grid ────────────────────── */}
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                        {/* ═══════════════════ LEFT COLUMN ═══════════════════ */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col gap-6 md:gap-10"
                        >
                            {/* Section label */}
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-sm text-primary/80 md:text-base">
                                    {content.sectionNumber}
                                </span>
                                <span className="h-px w-8 bg-primary/40" />
                                <span className="text-xs font-medium uppercase tracking-widest text-primary/60">
                                    {content.sectionLabel}
                                </span>
                            </div>
                            {/* ── Quote card (whisper-level) ──── */}
                            <motion.div
                                variants={fadeUp}
                                className="mb-2 rounded-xl border border-white/[0.06] bg-white/[0.015] px-3 py-2.5 md:mb-4 md:px-4 md:py-3"
                            >
                                <div className="flex items-start gap-2.5">
                                    <Quote
                                        size={16}
                                        className="mt-0.5 shrink-0 text-primary/20"
                                    />
                                    <p
                                        className="text-[13px] italic leading-relaxed text-white/50"
                                        dangerouslySetInnerHTML={{
                                            __html: content.quote,
                                        }}
                                    />
                                </div>
                            </motion.div>

                            {/* ── Info cards ───────────────────── */}
                            <div className="flex flex-col gap-3">
                                {content.infoCards.map((card, i) => (
                                    <motion.div key={i} variants={fadeUp}>
                                        <InfoCard card={card} />
                                    </motion.div>
                                ))}
                            </div>

                            {/* ── Spacer before CTA ──────────── */}
                            <div aria-hidden className="h-px w-full bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent" />

                            {/* ── CTA block ────────────────────── */}
                            <motion.div
                                variants={fadeUp}
                                className="flex flex-col items-start gap-4 rounded-xl border border-primary/20 bg-primary/[0.05] p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between md:p-5"
                            >
                                <p className="text-sm font-medium leading-relaxed text-white/80">
                                    {content.cta.text}
                                </p>
                                <a
                                    href={content.cta.buttonLink}
                                    className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-background transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,210,150,0.35)] w-full justify-center sm:w-auto"
                                >
                                    {content.cta.buttonLabel}
                                    <ArrowRight
                                        size={14}
                                        className="transition-transform group-hover:translate-x-0.5"
                                    />
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* ═══════════════════ RIGHT COLUMN (centered) ═════ */}
                        <motion.div
                            variants={fadeRight}
                            className="mx-auto flex w-full max-w-lg flex-col gap-6 lg:mx-0 lg:max-w-none"
                        >
                            {/* ── Core work card ──────────────── */}
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:translate-x-1 hover:border-primary/40 md:p-8">
                                {/* Header */}
                                <div className="mb-8 sm:mb-10 flex items-center space-x-4">
                                    <span className="h-2 w-2 rounded-full bg-primary/70" />
                                    <span className="text-xs font-medium uppercase tracking-widest text-primary/80">
                                        {content.coreWorkLabel}
                                    </span>
                                </div>

                                {/* Feature items */}
                                <div className="flex flex-col gap-5">
                                    {content.coreWorkItems.map((item, i) => (
                                        <FeatureItem
                                            key={i}
                                            item={item}
                                            isLast={
                                                i ===
                                                content.coreWorkItems.length - 1
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* ── Tech stack chips (contained) ── */}
                            <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm md:p-5">
                                {/* Header */}
                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                                    <span className="text-xs font-medium uppercase tracking-widest text-primary/80">
                                        {content.techStackLabel}
                                    </span>
                                </div>

                                {/* Chips grid */}
                                <div className="flex max-w-[600px] flex-wrap gap-x-2.5 gap-y-4">
                                    {content.techStack.map((chip, i) => (
                                        <motion.div key={i} variants={fadeUp}>
                                            <TechChip chip={chip} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </motion.section>
        </Element>
    );
};

export default About;