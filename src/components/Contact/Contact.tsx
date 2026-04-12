import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import contentManager from "@/lib/contentManager";
import { ContactContent } from "@/lib/types";

const Contact: React.FC = () => {
    const [content, setContent] = useState<ContactContent>({
        preHeading: "What's Next?",
        heading: "Get In Touch",
        description: "",
        email: "sazzad4677@gmail.com",
        ctaText: "Say Hello"
    });

    useEffect(() => {
        const contactData = contentManager.getContact();
        if (contactData) setContent(contactData);
    }, []);

    const revealVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <Element name="contact" className="scroll-anchor">
            <motion.section
                id="contact"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={revealVariants}
                className="py-16 text-center md:py-20"
            >
                <div className="site-container">
                    <div className="flex flex-col items-center">
                        <span className="mb-4 flex items-center font-mono text-base text-primary">
                            <span className="mr-2">04.</span> {content.preHeading}
                        </span>
                        
                        <h2 className="mb-6 text-3xl font-bold text-foreground md:text-5xl">
                            {content.heading}
                        </h2>

                        <p className="mb-12 max-w-[600px] text-base leading-relaxed text-secondary-foreground/80">
                            {content.description || "Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!"}
                        </p>

                        <motion.a
                            href={`mailto:${content.email}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center rounded-md border-2 border-primary px-10 py-4 font-mono text-primary transition-all duration-300 hover:bg-primary/10"
                        >
                            {content.ctaText}
                        </motion.a>
                    </div>
                </div>
            </motion.section>
        </Element>
    );
};

export default Contact;
