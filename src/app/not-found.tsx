"use client";

import { motion } from "framer-motion";
import { Home, Search, MoveLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Theme Background */}
            <div className="bg-mesh-layer" aria-hidden="true" />
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="glass-dark relative z-10 max-w-md rounded-[2.5rem] p-12 shadow-2xl border border-primary/10 backdrop-blur-3xl overflow-hidden"
            >
                {/* Decorative Icon */}
                <div className="mb-8 flex justify-center text-primary relative">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="relative z-10"
                    >
                        <Search size={80} strokeWidth={1} />
                    </motion.div>
                    <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full animate-pulse" />
                </div>

                {/* 404 Text */}
                <div className="mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary font-bold">Error Code</span>
                    <h1 className="text-8xl font-black text-foreground/5 tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 select-none pointer-events-none">404</h1>
                    <h2 className="text-4xl font-bold text-foreground mt-2">Page Not Found</h2>
                </div>
                
                <p className="mb-10 text-secondary-foreground text-sm leading-relaxed">
                    It seems you've drifted off course. The requested page doesn't exist or has been shifted to a new coordinate in the digital void.
                </p>

                <div className="flex flex-col gap-4">
                    <Link
                        href="/"
                        className="group flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-mono text-xs font-bold text-primary-foreground transition-all hover:shadow-[0_0_20px_rgba(var(--primary-hsl),0.3)] active:scale-95"
                    >
                        <Home size={16} />
                        Return to Dashboard
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-border/10 bg-surface/20 px-8 py-4 font-mono text-xs font-bold text-secondary-foreground transition-all hover:bg-surface/40"
                    >
                        <MoveLeft size={16} />
                        Go Back
                    </button>
                </div>

                {/* Subtle Branding */}
                <div className="mt-12 text-[10px] font-mono text-secondary-foreground/20 uppercase tracking-widest">
                    Port-404 | Sequence Terminated
                </div>
            </motion.div>

            {/* Ambient Background Light */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[140px]" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-[140px]" />
        </div>
    );
}
