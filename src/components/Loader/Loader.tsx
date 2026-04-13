"use client";
import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

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

    const svgVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 0,
            scale: 0.8,
            transition: { delay: 0.2, duration: 0.4, ease: "easeInOut" },
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
        <AnimatePresence>
            <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="fixed inset-0 z-[999] flex h-screen w-full flex-col items-center justify-center bg-background overflow-hidden"
            >
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70vw_80vh_at_0%_38%,hsla(var(--primary-hsl)/0.12)_0%,transparent_62%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_68vw_78vh_at_100%_34%,hsla(var(--primary-hsl)/0.1)_0%,transparent_60%)]" />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-8">
                    <div className="relative h-32 w-32">
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
                        />
                        
                        <motion.svg
                            variants={svgVariants}
                            initial="hidden"
                            animate={counter === 100 ? "visible" : "hidden"}
                            onAnimationComplete={() => setLoading(false)}
                            id="logo"
                            className="h-full w-full text-primary drop-shadow-[0_0_15px_rgba(var(--primary-hsl),0.3)]"
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
                                stroke="currentColor"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"
                            />
                            <motion.text
                                variants={textVariants}
                                animate="visible"
                                initial="hidden"
                                x="50%"
                                y="55"
                                fill="currentColor"
                                fontSize="45px"
                                fontWeight="bold"
                                style={{ fontFamily: 'var(--font-mono)' }}
                                dominantBaseline="middle"
                                textAnchor="middle"
                            >
                                S
                            </motion.text>
                        </motion.svg>
                    </div>
                    {/* Percentage Counter */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-xl tracking-[0.2em] text-primary/80"
                    >
                        {counter}%
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Loader;
