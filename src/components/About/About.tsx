"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import { Quote, ArrowRight } from "lucide-react";
import contentManager from "@/lib/contentManager";
import InfoCard from "./InfoCard";
import FeatureItem from "./FeatureItem";
import TechChip from "./TechChip";


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
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[120px]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-[5%] right-[-8%] h-[400px] w-[400px] rounded-full bg-primary/[0.04] blur-[100px]"
                />

                <div className="site-container relative z-10">
                    <div className="mb-12 sm:mb-16 md:mb-20 flex items-center gap-4">
                        <h2 className="whitespace-nowrap font-sans text-2xl font-bold tracking-tight text-foreground before:mr-2 before:font-mono before:text-base before:text-primary before:content-['01.'] md:text-3xl">
                            About Me
                        </h2>
                        <div className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                        {/* ═══════════════════ LEFT COLUMN ═══════════════════ */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col gap-6 md:gap-10"
                        >
                            {/* Section label removed since we now have H2 */}
                            
                            {/* ── Quote card ──── */}
                            <motion.div
                                variants={fadeUp}
                                className="mb-2 rounded-xl border border-border/40 bg-surface/20 px-3 py-2.5 md:mb-4 md:px-4 md:py-3"
                            >
                                <div className="flex items-start gap-2.5">
                                    <Quote
                                        size={16}
                                        className="mt-0.5 shrink-0 text-primary/20"
                                    />
                                    <p
                                        className="text-[13px] italic leading-relaxed text-on-surface-variant/60"
                                        dangerouslySetInnerHTML={{
                                            __html: content.quote,
                                        }}
                                    />
                                </div>
                            </motion.div>

                            {/* ── Info cards ───────────────────── */}
                            <div className="flex flex-col gap-3">
                                {content.infoCards?.map((card, i) => (
                                    <motion.div key={i} variants={fadeUp}>
                                        <InfoCard card={card} />
                                    </motion.div>
                                ))}
                            </div>


                            <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-border/40 via-border/20 to-transparent" />

                            {/* ── CTA block ────────────────────── */}
                            <motion.div
                                variants={fadeUp}
                                className="flex flex-col items-start gap-4 rounded-xl border border-primary/20 bg-primary/[0.05] p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between md:p-5"
                            >
                                <p className="text-sm font-medium leading-relaxed text-on-background">
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


                        <motion.div
                            variants={fadeRight}
                            className="mx-auto flex w-full max-w-lg flex-col gap-6 lg:mx-0 lg:max-w-none"
                        >
                            {/* ── Core work card ──────────────── */}
                            <div className="rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur-sm transition-all duration-300 hover:translate-x-1 hover:border-primary/40 md:p-8">
                                {/* Header */}
                                <div className="mb-8 sm:mb-10 flex items-center space-x-4">
                                    <span className="h-2 w-2 rounded-full bg-primary/70" />
                                    <h3 className="text-xs font-medium uppercase tracking-widest text-primary/80">
                                        {content.coreWorkLabel}
                                    </h3>
                                </div>

                                {/* Feature items */}
                                <div className="flex flex-col gap-5">
                                    {content.coreWorkItems?.map((item, i) => (
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
                            <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-surface/40 p-4 backdrop-blur-sm md:p-5">
                                {/* Header */}
                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                                    <h3 className="text-xs font-medium uppercase tracking-widest text-primary/80">
                                        {content.techStackLabel}
                                    </h3>
                                </div>

                                {/* Chips grid */}
                                <div className="flex max-w-[600px] flex-wrap gap-x-2.5 gap-y-4">
                                    {content.techStack?.map((chip, i) => (
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