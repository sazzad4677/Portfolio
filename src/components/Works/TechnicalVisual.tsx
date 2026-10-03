"use client";

import React from "react";
import { Lock, ArrowRight, ArrowDown, Cpu, Activity, Video, Layers } from "lucide-react";

interface FlowVisualData {
    nodes: string[];
    tags: string[];
    icon: React.ReactNode;
}

function getFlowData(title: string): FlowVisualData {
    const t = title.toLowerCase();

    if (t.includes("webrtc") || t.includes("video")) {
        return {
            nodes: ["Patient", "Signaling", "WebRTC", "Provider"],
            tags: ["WebRTC", "Socket.io", "Next.js"],
            icon: <Video size={16} className="text-primary" />
        };
    }

    if (t.includes("physical") || t.includes("mediapipe") || t.includes("pose")) {
        return {
            nodes: ["Camera", "MediaPipe", "Pose Landmarks", "Pose Matching", "Feedback"],
            tags: ["MediaPipe", "Computer Vision", "React"],
            icon: <Activity size={16} className="text-primary" />
        };
    }

    if (t.includes("component library") || t.includes("design system")) {
        return {
            nodes: ["Figma Specs", "Design Tokens", "React Components", "Enterprise UI"],
            tags: ["Figma", "Tailwind CSS", "React"],
            icon: <Layers size={16} className="text-primary" />
        };
    }

    if (t.includes("erp")) {
        return {
            nodes: [".NET ERP", "React / Next.js", "Component Architecture", "AWS + CI/CD"],
            tags: [".NET Core", "Next.js", "AWS"],
            icon: <Cpu size={16} className="text-primary" />
        };
    }

    return {
        nodes: ["Client", "API Gateway", "Core Business Logic", "Cloud Infrastructure"],
        tags: ["System Architecture", "Enterprise Solution"],
        icon: <Cpu size={16} className="text-primary" />
    };
}

interface TechnicalVisualProps {
    title: string;
    companyName?: string;
}

export const TechnicalVisual: React.FC<TechnicalVisualProps> = ({ title, companyName }) => {
    const { nodes, tags, icon } = getFlowData(title);

    return (
        <div className="relative w-full aspect-[16/10] sm:aspect-video overflow-hidden rounded-xl border border-primary/25 bg-gradient-to-br from-surface/90 via-background to-surface/60 p-5 sm:p-7 md:p-8 flex flex-col justify-between shadow-xl group-hover/card:border-primary/50 transition-all duration-500">
            {/* Ambient Background Glow & Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {/* Header: Company & Proprietary tag */}
            <div className="relative z-10 flex items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                        {icon}
                    </div>
                    <span className="font-mono text-xs font-semibold text-foreground tracking-wide truncate">
                        {companyName || "Proprietary Platform"}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-[10px] text-primary font-medium shrink-0">
                    <Lock size={11} />
                    <span>Proprietary Architecture</span>
                </div>
            </div>

            {/* Flow Diagram - Ensured breathing room & no horizontal clipping */}
            <div className="relative z-10 my-auto py-3 px-2 sm:px-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-full">
                {nodes.map((node, i) => (
                    <React.Fragment key={i}>
                        <div className="group/node relative flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-primary/30 bg-surface/80 backdrop-blur-md shadow-md shadow-black/20 transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:scale-105">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                            <span className="font-mono text-[10px] sm:text-xs font-semibold text-foreground whitespace-nowrap">
                                {node}
                            </span>
                        </div>
                        {i < nodes.length - 1 && (
                            <div className="text-primary/70 flex items-center shrink-0">
                                <ArrowRight size={13} className="hidden sm:block animate-pulse text-primary/80" />
                                <ArrowDown size={11} className="block sm:hidden animate-pulse text-primary/80" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Small Tags Footer */}
            <div className="relative z-10 flex items-center justify-center border-t border-border/30 pt-2.5">
                <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-medium text-primary/90 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full backdrop-blur-md">
                    <span>{tags.join(" • ")}</span>
                </div>
            </div>
        </div>
    );
};
