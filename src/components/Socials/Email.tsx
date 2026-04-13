"use client";

import React from "react";
import { motion } from "framer-motion";

const Email: React.FC = () => {
    return (
        <div className="hidden fixed bottom-0 right-6 lg:right-12 z-40 lg:flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="mb-6"
            >
                <a
                    href="mailto:sazzad4677@gmail.com"
                    className="font-mono text-sm tracking-widest text-secondary-foreground/60 hover:text-primary transition-all duration-300 vertical-text"
                    style={{
                        writingMode: "vertical-rl",
                    }}
                >
                    sazzad4677@gmail.com
                </a>
            </motion.div>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100px" }}
                transition={{ duration: 0.8 }}
                className="w-px bg-gradient-to-t from-transparent via-primary/35 to-primary/15"
            />
        </div>
    );
};

export default Email;
