"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Code2,
    Compass,
    Heart,
    Briefcase,
    Lightbulb,
    Rocket,
} from "lucide-react";
import type { AboutInfoCard } from "@/lib/types";

const ICON_MAP: Record<string, React.FC<{ size: number; className?: string }>> = {
    Code2: (p) => <Code2 {...p} />,
    Compass: (p) => <Compass {...p} />,
    Heart: (p) => <Heart {...p} />,
    Briefcase: (p) => <Briefcase {...p} />,
    Lightbulb: (p) => <Lightbulb {...p} />,
    Rocket: (p) => <Rocket {...p} />,
};

const variantStyles: Record<
    AboutInfoCard["variant"],
    {
        wrapper: string;
        hoverClass: string;
        iconBox: string;
    }
> = {
    normal: {
        wrapper:
            "rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm",
        hoverClass: "hover:border-white/20",
        iconBox:
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
    },
    highlight: {
        wrapper:
            "rounded-xl border border-primary/40 bg-primary/[0.04] p-5 backdrop-blur-sm shadow-[0_0_20px_rgba(0,210,150,0.15)]",
        hoverClass: "hover:border-primary/60 hover:shadow-[0_0_30px_rgba(0,210,150,0.2)]",
        iconBox:
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary",
    },
    minimal: {
        wrapper: "rounded-lg bg-white/[0.02] p-4",
        hoverClass: "",
        iconBox:
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/50",
    },
};

interface InfoCardProps {
    card: AboutInfoCard;
}

const InfoCard: React.FC<InfoCardProps> = ({ card }) => {
    const style = variantStyles[card.variant];
    const IconComp = ICON_MAP[card.icon];

    return (
        <motion.div
            whileHover={card.variant === "highlight" ? { scale: 1.02 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`flex gap-4 transition-all duration-300 ${style.wrapper} ${style.hoverClass}`}
        >
            {/* Icon */}
            <div className={style.iconBox}>
                {IconComp && <IconComp size={20} />}
            </div>

            {/* Text */}
            <div className="min-w-0">
                <h3 className="mb-1.5 text-sm font-semibold text-white md:text-base">
                    {card.title}
                </h3>
                <p
                    className="text-xs leading-relaxed text-white/60 md:text-sm"
                    dangerouslySetInnerHTML={{ __html: card.description }}
                />
            </div>
        </motion.div>
    );
};

export default InfoCard;
