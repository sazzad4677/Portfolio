import React from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";

const Footer: React.FC = () => {
    const socialLinks = [
        { name: "Github", url: "https://github.com/sazzad4677/", icon: GitHubIcon },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/sazzad4673/", icon: LinkedInIcon },
    ];

    return (
        <footer className="mt-4 bg-background/40 px-4 sm:px-6 py-8 sm:py-10 md:py-12 text-center backdrop-blur-sm">
            {/* Mobile Socials */}
            <ul className="flex items-center justify-center gap-5 sm:gap-6 mb-5 sm:mb-6 lg:hidden">
                {socialLinks.map((link) => (
                    <li key={link.name}>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary-foreground/60 hover:text-primary transition-colors duration-300"
                            aria-label={link.name}
                        >
                            <link.icon size={20} className="sm:w-6 sm:h-6" />
                        </a>
                    </li>
                ))}
            </ul>

            <div className="font-mono text-xs sm:text-sm tracking-wide text-secondary-foreground/60">
                <p className="mb-1.5 sm:mb-2">
                    Developed with passion by{" "}
                    <a
                        href="https://github.com/sazzad4677"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-4"
                    >
                        Sazzad Hossain
                    </a>
                </p>
                <p className="text-[10px] sm:text-xs opacity-70">
                    &copy; {new Date().getFullYear()} All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;