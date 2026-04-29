"use client";

import React from "react";
import { motion } from "framer-motion";
import type { AboutTechChip } from "@/lib/types";

/* ── Lightweight SVG icons for tech chips ─────────────────────── */
const chipIcons: Record<string, React.ReactNode> = {
    nodejs: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.06c0 .66-.68 1.31-1.77.76L4.45 16.4a.26.26 0 01-.12-.21V7.6c0-.09.04-.17.12-.22l7.44-4.3c.07-.04.18-.04.26 0l7.43 4.3c.08.05.13.13.13.22v8.58c0 .09-.05.17-.13.22l-7.43 4.3c-.08.04-.17.04-.26 0l-1.88-1.12c-.07-.04-.16-.05-.23-.02-.63.28-.75.32-1.35.48-.15.04-.37.12.08.35l2.45 1.45c.24.14.51.2.78.2s.54-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.7c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.12-.5-.2-.78-.2z" />
        </svg>
    ),
    express: <span className="text-[10px] font-bold leading-none">ex</span>,
    mongodb: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M17.18 9.52c-.95-4.08-3.06-5.4-3.29-5.86a9.59 9.59 0 01-.65-1.43l-.08-.01c-.06.46-.08.97-.27 1.39-1.17 2.58-4.58 4.22-4.81 7.13-.24 2.96 1.52 5.15 3.55 6.24.22.12.47-.12.39-.36-.51-1.48-.2-3.08.66-4.32.87.72 1.71 1.64 2.22 2.78.36.78.53 1.6.52 2.42-.01.27.33.4.49.18 1.54-2.13 2.15-5.1 1.27-8.16z" />
        </svg>
    ),
    postgresql: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm0-8H9V7h6v2z" />
        </svg>
    ),
    nextjs: <span className="text-[10px] font-bold leading-none">N</span>,
    react: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <circle cx="12" cy="12" r="2.05" />
            <path fill="none" stroke="currentColor" strokeWidth="1" d="M12 7.5c3.87 0 7 1.5 7 3.5s-3.13 3.5-7 3.5S5 13 5 11s3.13-3.5 7-3.5z" transform="rotate(30 12 12)" />
            <path fill="none" stroke="currentColor" strokeWidth="1" d="M12 7.5c3.87 0 7 1.5 7 3.5s-3.13 3.5-7 3.5S5 13 5 11s3.13-3.5 7-3.5z" transform="rotate(90 12 12)" />
            <path fill="none" stroke="currentColor" strokeWidth="1" d="M12 7.5c3.87 0 7 1.5 7 3.5s-3.13 3.5-7 3.5S5 13 5 11s3.13-3.5 7-3.5z" transform="rotate(150 12 12)" />
        </svg>
    ),
    typescript: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M3 3h18v18H3V3zm10.71 13.63v1.9c.31.16.69.28 1.1.36.42.09.84.13 1.27.13.42 0 .81-.04 1.17-.13.36-.09.67-.23.93-.42.26-.19.47-.43.62-.73.15-.3.22-.65.22-1.06 0-.3-.04-.56-.13-.78a2.01 2.01 0 00-.37-.59 2.77 2.77 0 00-.56-.45c-.22-.14-.45-.27-.71-.39-.19-.09-.36-.18-.51-.27a2.32 2.32 0 01-.37-.27.99.99 0 01-.23-.29.7.7 0 01-.08-.33c0-.12.03-.22.08-.31.05-.09.13-.17.23-.23.1-.06.22-.11.36-.14.14-.03.3-.05.47-.05.12 0 .25.01.39.04.14.02.28.06.42.11.14.05.28.11.4.19.13.08.24.17.34.28v-1.76a3.77 3.77 0 00-.9-.24 6.2 6.2 0 00-1.04-.08c-.41 0-.79.05-1.14.14-.35.09-.66.24-.92.43-.26.2-.46.44-.61.73-.15.3-.22.64-.22 1.03 0 .51.14.95.43 1.3.29.36.72.66 1.31.92.23.1.44.2.62.3.18.1.33.21.45.32.13.11.23.23.29.36.07.13.1.28.1.44 0 .11-.02.22-.07.31a.66.66 0 01-.21.25.99.99 0 01-.36.16c-.14.04-.31.05-.5.05-.33 0-.67-.07-.99-.2a3.3 3.3 0 01-.92-.57zM9 11.07H7v-1.26h6.01v1.26h-2v5.87H9v-5.87z" />
        </svg>
    ),
    socketio: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 6l-3 6h6l-3-6z" />
            <path d="M12 18l3-6H9l3 6z" opacity="0.5" />
        </svg>
    ),
    docker: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M13.98 11.08h2.12a.19.19 0 00.19-.19V9.01a.19.19 0 00-.19-.19h-2.12a.19.19 0 00-.19.19v1.88c0 .11.09.19.19.19zm-2.95-5.43h2.12a.19.19 0 00.19-.19V3.58a.19.19 0 00-.19-.19h-2.12a.19.19 0 00-.19.19v1.88c0 .1.09.19.19.19zm0 2.71h2.12a.19.19 0 00.19-.19V6.29a.19.19 0 00-.19-.19h-2.12a.19.19 0 00-.19.19v1.88c0 .1.09.19.19.19zm-2.93 0h2.12a.19.19 0 00.19-.19V6.29a.19.19 0 00-.19-.19H8.1a.19.19 0 00-.19.19v1.88c0 .1.08.19.19.19zm-2.96 0h2.12a.19.19 0 00.19-.19V6.29a.19.19 0 00-.19-.19H5.14a.19.19 0 00-.19.19v1.88c0 .1.08.19.19.19zm5.89 2.72h2.12a.19.19 0 00.19-.19V9.01a.19.19 0 00-.19-.19h-2.12a.19.19 0 00-.19.19v1.88c0 .11.09.19.19.19zm-2.93 0h2.12a.19.19 0 00.19-.19V9.01a.19.19 0 00-.19-.19H8.1a.19.19 0 00-.19.19v1.88c0 .11.08.19.19.19zm-2.96 0h2.12a.19.19 0 00.19-.19V9.01a.19.19 0 00-.19-.19H5.14a.19.19 0 00-.19.19v1.88c0 .11.08.19.19.19zm12.16 1.14c-.28-.17-.73-.22-1.3-.17-.57.06-1.09.22-1.56.48-.12.07-.15.17-.09.28.07.12.18.16.29.12.42-.19.87-.33 1.31-.37.52-.04.93.02 1.13.15.21.14.31.4.31.77 0 .42-.08.84-.22 1.25-.15.41-.3.71-.46.93-.07.1-.04.2.08.28.04.03.09.04.14.04.06 0 .13-.04.18-.1.19-.26.37-.61.55-1.08.17-.47.27-.95.27-1.42-.01-.52-.17-.89-.63-1.16zM23.7 12.07c-.38-.6-1.02-1.03-1.91-1.3.06-.58-.02-1.09-.26-1.59-.24-.5-.59-.84-1.06-.98-.11-.03-.21-.05-.32-.05-.43 0-.83.22-1.22.63-.3.32-.57.7-.82 1.14H5.23c-.31 0-.57.24-.6.55-.06.79-.02 1.6.13 2.42.15.81.4 1.57.75 2.26.35.69.8 1.29 1.33 1.79.53.5 1.17.88 1.92 1.12.64.21 1.37.32 2.2.35.12.01.24.01.36.01.85 0 1.78-.13 2.76-.4a10.8 10.8 0 002.54-1.08c.36-.22.69-.45 1-.69.47.41 1.04.63 1.68.63h.05c.72-.02 1.31-.33 1.76-.95.43-.6.63-1.33.59-2.16-.01-.31-.11-.49-.26-.7z" />
        </svg>
    ),
    aws: <span className="text-[10px] font-bold leading-none">☁</span>,
    tailwind: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
    ),
    tanstack: <span className="text-[10px] font-bold leading-none">⚡</span>,
    redis: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    zustand: <span className="text-[10px] font-bold leading-none">🐻</span>,
    webrtc: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 2a10 10 0 0110 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 6a6 6 0 016 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    llm: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12 2a2 2 0 012 2v1a7 7 0 017 7 2 2 0 110 4 7 7 0 01-7 7v1a2 2 0 11-4 0v-1a7 7 0 01-7-7 2 2 0 110-4 7 7 0 017-7V4a2 2 0 012-2z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
};

interface TechChipProps {
    chip: AboutTechChip;
}

const TechChip: React.FC<TechChipProps> = ({ chip }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, borderColor: "rgba(0,210,150,0.4)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 transition-colors duration-200 hover:bg-primary/[0.08] hover:text-white/90"
        >
            <span className="flex items-center text-primary/80">
                {chipIcons[chip.icon] ?? (
                    <span className="text-[10px] font-bold">●</span>
                )}
            </span>
            {chip.label}
        </motion.div>
    );
};

export default TechChip;
