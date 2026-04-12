"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NoMatchRoute: React.FC = () => {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
            {/* Atmospheric Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-primary/2 rounded-full blur-[80px] pointer-events-none" />

            <div className="site-container relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        duration: 1.2, 
                        ease: [0.22, 1, 0.36, 1],
                        scale: { type: "spring", stiffness: 100, damping: 20 }
                    }}
                    className="relative"
                >
                    {/* Large Shadow 404 */}
                    <span className="absolute inset-0 block font-sans text-[15rem] font-black text-primary/5 blur-xl md:text-[20rem]">
                        404
                    </span>
                    <h1 className="relative font-sans text-[12rem] font-black leading-none tracking-tighter text-foreground md:text-[18rem]">
                        404
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <h2 className="mt-4 text-2xl font-bold text-foreground md:text-4xl">
                        Page Not Found
                    </h2>
                    <p className="mt-6 max-w-md text-base leading-relaxed text-secondary-foreground/60">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-12"
                >
                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-8 py-4 font-mono text-sm text-primary transition-all hover:bg-primary/10 hover:border-primary/40"
                        >
                            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                            <span>Return to Home</span>
                        </motion.div>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary-foreground/30">
                        Error Code: 404_NOT_FOUND
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default NoMatchRoute;
