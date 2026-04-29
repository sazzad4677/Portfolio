"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Code2, Users, Zap, CheckCircle2 } from "lucide-react";
import type { HeroStat } from "@/lib/types";

const ICON_MAP: Record<string, React.FC<{ size: number }>> = {
    Code2: ({ size }) => <Code2 size={size} />,
    Users: ({ size }) => <Users size={size} />,
    Zap: ({ size }) => <Zap size={size} />,
    CheckCircle2: ({ size }) => <CheckCircle2 size={size} />,
};

const barVariant: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] },
    },
};

interface StatsBarProps {
    stats: HeroStat[];
}

const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
    return (
        <motion.div
            variants={barVariant}
            initial="initial"
            animate="animate"
            className="relative z-20 w-full px-2 pb-6 sm:px-0 sm:pb-8"
        >
            <div className="site-container">
                <div className="rounded-xl border border-on-background/[0.08] bg-on-background/[0.03] px-4 py-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:rounded-2xl sm:px-8 sm:py-7 md:px-10 md:py-8">
                    <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-on-background/[0.1]">
                        {stats.map((stat, i) => {
                            const IconComp = ICON_MAP[stat.icon];
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 sm:gap-4 lg:justify-center lg:px-5 xl:px-10"
                                >
                                    {IconComp && (
                                        <div className={`flex-shrink-0 ${stat.color}`}>
                                            <IconComp size={20} />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-2xl font-extrabold text-on-background sm:text-3xl md:text-[34px]">
                                            {stat.value}
                                        </p>
                                        <p className="truncate text-[10px] font-medium text-on-surface-variant/70 sm:text-xs md:text-sm">
                                            {stat.label}
                                        </p>
                                        <p className="truncate text-[9px] text-on-surface-variant/30 sm:text-[10px] md:text-xs">
                                            {stat.sublabel}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsBar;
