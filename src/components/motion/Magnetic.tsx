"use client";

import React, { useRef, useState, ReactElement } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
    children: ReactElement;
    strength?: number;
}

export default function Magnetic({ children, strength = 0.5 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = () => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        if (rectRef.current) {
            const { width, height, left, top } = rectRef.current;
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            setPosition({ x: x * strength, y: y * strength });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        rectRef.current = null;
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
