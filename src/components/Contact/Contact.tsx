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
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.6, 0.05, -0.01, 0.9],
            },
        },
    };

    return (
        <Element name="contact">
            <motion.section
                id="contact"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={revealVariants}
                className="py-32 text-center"
            >
                <div className="flex flex-col items-center">
                    <span className="font-mono text-primary text-lg mb-4 flex items-center">
                        <span className="mr-2">04.</span> {content.preHeading}
                    </span>
                    
                    <h2 className="text-4xl font-bold text-foreground md:text-6xl mb-6">
                        {content.heading}
                    </h2>

                    <p className="max-w-[600px] text-lg text-secondary-foreground/80 leading-relaxed mb-12">
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
            </motion.section>
        </Element>
    );
};

export default Contact;
