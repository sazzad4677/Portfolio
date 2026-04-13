"use client";

import "../index.css";
import { RotateCcw } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className="antialiased font-sans bg-background text-foreground">
                <div className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center overflow-hidden">
                    {/* Background mesh for brand consistency even in global errors */}
                    <div className="bg-mesh-layer" aria-hidden="true" />
                    
                    <div className="glass-dark relative z-10 max-w-lg rounded-3xl p-10 shadow-2xl border border-primary/20 backdrop-blur-2xl">
                        <div className="mb-8 flex justify-center">
                            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <svg viewBox="0 0 100 100" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                    <text x="50%" y="55" fill="currentColor" fontSize="45px" fontWeight="bold" dominantBaseline="middle" textAnchor="middle">!</text>
                                </svg>
                            </div>
                        </div>

                        <h1 className="mb-4 text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                            Critical System Error
                        </h1>
                        
                        <p className="mb-10 text-secondary-foreground text-lg leading-relaxed max-w-sm mx-auto">
                            The portfolio encountered a severe error at the root level. A complete system restart is required to recover.
                        </p>

                        <button
                            onClick={() => reset()}
                            className="inline-flex items-center gap-3 rounded-xl bg-primary px-10 py-4 font-mono text-sm font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/25"
                        >
                            <RotateCcw size={20} />
                            Restart Application
                        </button>

                        <div className="mt-12 pt-8 border-t border-border/10">
                            <p className="text-[10px] font-mono uppercase tracking-widest text-secondary-foreground/40">
                                Sazzad Hossain | Global Recovery System
                            </p>
                        </div>
                    </div>

                    {/* Background lighting */}
                    <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-primary/5 to-transparent pointer-events-none" />
                </div>
            </body>
        </html>
    );
}
