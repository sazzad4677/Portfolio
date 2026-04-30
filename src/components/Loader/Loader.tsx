"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

interface LoaderProps {
    setLoading: (loading: boolean) => void;
}

const Loader: React.FC<LoaderProps> = ({ setLoading }) => {
    const [counter, setCounter] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 15);
        return () => clearInterval(interval);
    }, []);

    const containerVariants: Variants = {
        show: { opacity: 1 },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.4, ease: "easeInOut" },
        },
    };

    const pathVariants: Variants = {
        hidden: { opacity: 0, pathLength: 0 },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: { duration: 1.2, ease: "easeInOut" },
        },
    };

    const textVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 1, duration: 0.5, ease: "backOut" },
        },
    };

    return (
        <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-[999] flex h-screen w-full flex-col items-center justify-center bg-background overflow-hidden"
        >
            {/* Shimmering Background Elements (Skeleton-like) */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-20 left-10 h-8 w-64 rounded-lg shimmer bg-surface-variant/30" />
                <div className="absolute top-40 left-10 h-16 w-3/4 rounded-xl shimmer bg-surface-variant/20" />
                <div className="absolute top-64 left-10 h-24 w-1/2 rounded-xl shimmer bg-surface-variant/10" />
                
                <div className="absolute bottom-20 right-10 h-40 w-80 rounded-2xl border border-border/20 shimmer bg-surface-variant/5" />
                <div className="absolute bottom-64 right-40 h-32 w-64 rounded-2xl border border-border/20 shimmer bg-surface-variant/5" />

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70vw_80vh_at_0%_38%,hsla(var(--primary-hsl)/0.12)_0%,transparent_62%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_68vw_78vh_at_100%_34%,hsla(var(--primary-hsl)/0.1)_0%,transparent_60%)]" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-10">
                <div className="relative h-32 w-32">
                    <motion.div
                        initial={{ opacity: 0.5, scale: 0.9 }}
                        animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
                    />
                    
                    <motion.svg
                        variants={containerVariants}
                        initial="show"
                        animate={counter === 100 ? "exit" : "show"}
                        onAnimationComplete={() => setLoading(false)}
                        id="logo"
                        className="h-full w-full text-primary drop-shadow-[0_0_20px_rgba(var(--primary-hsl),0.4)]"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 100 100"
                        fill="none"
                    >
                        <title>Logo</title>
                        <motion.path
                            variants={pathVariants}
                            animate="visible"
                            initial="hidden"
                            style={{ opacity: 0.4, pathLength: 1 }}
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"
                        />
                        <motion.text
                            variants={textVariants}
                            animate="visible"
                            initial={{ opacity: 1, scale: 0.8 }}
                            x="50%"
                            y="55"
                            fill="currentColor"
                            fontSize="42px"
                            fontWeight="bold"
                            style={{ fontFamily: 'monospace' }}
                            dominantBaseline="middle"
                            textAnchor="middle"
                        >
                            S
                        </motion.text>
                    </motion.svg>
                </div>

                {/* Progress Bar with Shimmer */}
                <div className="w-64 space-y-4">
                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-surface-variant/30">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${counter}%` }}
                            className="absolute h-full bg-primary shadow-[0_0_10px_rgba(var(--primary-hsl),0.5)]"
                        />
                        <div className="absolute inset-0 shimmer opacity-50" />
                    </div>
                    
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-primary/70 uppercase">
                        <span>Initializing</span>
                        <motion.span 
                            key={counter}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {counter}%
                        </motion.span>
                    </div>
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px]" />
        </motion.div>
    );
};

export default Loader;
