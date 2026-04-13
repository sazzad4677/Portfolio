"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("App Error:", error);
    }, [error]);

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Background elements to maintain theme consistency */}
            <div className="bg-mesh-layer" aria-hidden="true" />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="glass-dark relative z-10 max-w-md rounded-3xl p-8 shadow-2xl border border-primary/20 backdrop-blur-xl"
            >
                <div className="mb-6 flex justify-center">
                    <div className="rounded-2xl bg-primary/10 p-4 text-primary animate-pulse">
                        <AlertCircle size={48} />
                    </div>
                </div>

                <h1 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Something went wrong!
                </h1>
                
                <p className="mb-8 text-secondary-foreground text-sm sm:text-base leading-relaxed">
                    An unexpected error occurred while rendering this page. Our systems have been notified and we are looking into it.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={() => reset()}
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-mono text-sm font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-primary/20"
                    >
                        <RotateCcw size={18} />
                        Try Again
                    </button>
                    
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-surface/40 px-6 py-3 font-mono text-sm font-bold text-foreground transition-all hover:bg-surface/60 active:scale-95 shadow-sm"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>
                </div>

                {error.digest && (
                    <p className="mt-8 font-mono text-[10px] text-secondary-foreground/30">
                        Error Digest: {error.digest}
                    </p>
                )}
            </motion.div>

            {/* Subtle decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] -z-10 rounded-full" />
        </div>
    );
}
