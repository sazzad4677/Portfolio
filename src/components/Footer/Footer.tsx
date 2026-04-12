import React from "react";
import { Github, Twitter, Linkedin, Facebook } from "lucide-react";

const Footer: React.FC = () => {
    const socialLinks = [
        { name: "Github", url: "https://github.com/sazzad4677/", icon: Github },
        { name: "Twitter", url: "https://twitter.com/sazzad4677/", icon: Twitter },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/sazzad4673/", icon: Linkedin },
        { name: "Facebook", url: "https://facebook.com/sazzad4677/", icon: Facebook },
    ];

    return (
        <footer className="py-12 px-6 text-center">
            {/* Mobile Socials */}
            <ul className="flex items-center justify-center gap-6 mb-6 md:hidden">
                {socialLinks.map((link) => (
                    <li key={link.name}>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary-foreground/60 hover:text-primary transition-colors duration-300"
                            aria-label={link.name}
                        >
                            <link.icon size={24} />
                        </a>
                    </li>
                ))}
            </ul>

            <div className="font-mono text-sm tracking-wide text-secondary-foreground/60">
                <p className="mb-2">
                    Developed with passion by{" "}
                    <a
                        href="https://github.com/sazzad4677"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-4"
                    >
                        Sazzad Hosain
                    </a>
                </p>
                <p className="text-xs opacity-70">
                    &copy; {new Date().getFullYear()} All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
