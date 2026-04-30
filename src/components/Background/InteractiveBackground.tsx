"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// Individual Sparkle for Click Burst
const Sparkle = ({ x, y }: { x: number; y: number }) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 40;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;
    const size = Math.random() * 4 + 2;

    return (
        <motion.div
            className="absolute rounded-full bg-primary pointer-events-none"
            style={{ 
                left: x, 
                top: y, 
                width: size, 
                height: size,
                boxShadow: "0 0 12px var(--primary)",
                zIndex: 10
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{ x: destX, y: destY, opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        />
    );
};

const Particle = ({ i }: { i: number }) => {
    const [pos] = useState({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        twinkleDuration: Math.random() * 2 + 1.5,
    });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [mouseX, mouseY]);

    // Parallax effect
    const tx = useSpring(useTransform(mouseX, [0, 2000], [i * 1.5, -i * 1.5]), { damping: 40, stiffness: 15 });
    const ty = useSpring(useTransform(mouseY, [0, 2000], [i * 1.5, -i * 1.5]), { damping: 40, stiffness: 15 });

    return (
        <motion.div
            className="absolute rounded-full bg-primary/30"
            style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: pos.size,
                height: pos.size,
                x: tx,
                y: ty,
                boxShadow: i % 4 === 0 ? "0 0 10px var(--primary)" : "none",
            }}
            animate={i % 3 === 0 ? {
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.8, 1],
            } : {
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: pos.twinkleDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
            }}
        />
    );
};

export const InteractiveBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

    const springConfig = { damping: 30, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleClick = (e: MouseEvent) => {
            const id = Date.now();
            setClicks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
            setTimeout(() => {
                setClicks((prev) => prev.filter((c) => c.id !== id));
            }, 1000);
        };

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleClick);
        window.addEventListener("resize", checkMobile);
        checkMobile();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleClick);
            window.removeEventListener("resize", checkMobile);
        };
    }, [mouseX, mouseY]);

    if (!mounted || isMobile) return null;

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
            {/* Click Bursts */}
            <AnimatePresence>
                {clicks.map((click) => (
                    <div key={click.id}>
                        {[...Array(8)].map((_, i) => (
                            <Sparkle key={`${click.id}-${i}`} x={click.x} y={click.y} />
                        ))}
                    </div>
                ))}
            </AnimatePresence>

            {/* Central follow-glow (Spotlight) */}
            <motion.div
                className="absolute -left-[100px] -top-[100px] h-[250px] w-[250px] rounded-full bg-primary/10 blur-[80px]"
                style={{
                    x: springX,
                    y: springY,
                }}
            />

            {/* Twinkling background particles */}
            <div className="absolute inset-0 opacity-60">
                {[...Array(20)].map((_, i) => (
                    <Particle key={i} i={i} />
                ))}
            </div>

            {/* Decorative ambient gradients */}
            <motion.div 
                className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[160px]"
                animate={{
                    x: [0, 40, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div 
                className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[160px]"
                animate={{
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};
