"use client";

import React from "react";
import {
    Code2,
    Radio,
    Container,
    Puzzle,
    Server,
    Shield,
} from "lucide-react";
import type { AboutFeatureItem } from "@/lib/types";

const ICON_MAP: Record<string, React.FC<{ size: number; className?: string }>> = {
    Code2: (p) => <Code2 {...p} />,
    Radio: (p) => <Radio {...p} />,
    Container: (p) => <Container {...p} />,
    Puzzle: (p) => <Puzzle {...p} />,
    Server: (p) => <Server {...p} />,
    Shield: (p) => <Shield {...p} />,
};

interface FeatureItemProps {
    item: AboutFeatureItem;
    isLast?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ item, isLast = false }) => {
    const IconComp = ICON_MAP[item.icon];

    return (
        <>
            <div className="group flex items-start gap-4 transition-all duration-300 hover:translate-x-1">
                {/* Icon box */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                    {IconComp && <IconComp size={22} />}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                    <h4 className="mb-1 text-sm font-semibold text-on-background transition-colors duration-300 group-hover:text-on-background md:text-base">
                        {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-on-surface-variant/80 transition-colors duration-300 group-hover:text-on-surface-variant md:text-sm">
                        {item.description}
                    </p>
                </div>

                {/* Accent dot */}
                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 transition-all duration-300 group-hover:scale-150 group-hover:bg-primary" />
            </div>

            {/* Divider */}
            {!isLast && <div className="border-t border-border/60" />}
        </>
    );
};

export default FeatureItem;
