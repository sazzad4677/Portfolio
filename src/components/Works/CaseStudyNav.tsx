"use client";

import Link from "next/link";
import { Mail, FileText, ExternalLink, ArrowLeft } from "lucide-react";
import { Project, ContactContent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
    project: Project;
    /** Contact block from the CMS — used for the primary CTA copy + links. */
    contact: Pick<ContactContent, "ctaText" | "email" | "calendarLink" | "calendarLabel">;
    /** Optional Live / source link, shown only when the project provides one. */
    liveUrl?: string;
    /** Résumé link from the hero content (shared with the home header). */
    cvLink?: string;
}

/**
 * Branded sticky top nav for `/work/[slug]` case-study pages.
 *
 * Intentionally minimal: a 2-column bar (logo on the left, primary CTA on the
 * right) that mirrors the visual rhythm of the home `Header` without inheriting
 * its five nav links — case-study pages are deep, so the only outbound action
 * that matters is "go back" (the brand itself) and "get in touch" (the CTA).
 */
export default function CaseStudyNav({ project, contact, liveUrl, cvLink }: Props) {
    const ctaLabel = contact.ctaText || "Say hello";
    // Prefer the calendar booking link (more direct for recruiters / clients).
    // Fall back to a mailto with a project-scoped subject line.
    const ctaHref = contact.calendarLink
        ? contact.calendarLink
        : `mailto:${contact.email}?subject=${encodeURIComponent(
              `About your ${project.title} case study`
          )}`;

    return (
        <nav
            aria-label="Case study navigation"
            className={cn(
                "sticky top-0 z-30",
                "backdrop-blur-md bg-background/70",
                "border-b border-border/30"
            )}
        >
            {/* Hairline gradient that follows the brand */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />

            <div className="site-container px-4 sm:px-6 lg:px-8 h-14 grid grid-cols-[1fr_auto] items-center gap-3 sm:gap-4">
                {/* ── Brand left ── */}
                <Link
                    href="/"
                    aria-label="Back to Sazzad Hossain's portfolio home"
                    className="group flex min-w-0 items-center gap-2.5"
                >
                    <div className="h-9 w-9 shrink-0 text-primary transition-transform duration-300 group-hover:rotate-12">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden="true">
                            <path
                                d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"
                                stroke="currentColor"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <text
                                x="50%"
                                y="55"
                                fill="currentColor"
                                fontSize="45px"
                                fontWeight="bold"
                                style={{ fontFamily: "monospace" }}
                                dominantBaseline="middle"
                                textAnchor="middle"
                            >
                                S
                            </text>
                        </svg>
                    </div>
                    <div className="hidden sm:flex min-w-0 items-baseline gap-1.5 leading-none">
                        <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors group-hover:text-primary">
                            Sazzad
                        </span>
                        <span className="font-mono text-[10px] text-primary">/</span>
                        <span className="truncate whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
                            Portfolio
                        </span>
                    </div>
                </Link>

                {/* ── Right: minimal actions ──
                 *   Order: optional live link (md+) → Resume (sm+) → primary CTA.
                 *   No "Home" button — clicking the logo already takes you home. */}
                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 justify-self-end">
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open the live project in a new tab"
                            className="hidden md:inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-lg border border-border/40 bg-surface/30 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/[0.08] hover:text-primary"
                        >
                            <span>Live</span>
                            <ExternalLink size={11} aria-hidden="true" />
                        </a>
                    )}

                    <a
                        href={cvLink ?? "#"}
                        target={cvLink ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        aria-label="Download Sazzad's résumé (opens in a new tab)"
                        className="hidden sm:inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-lg border border-border/40 bg-surface/30 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/[0.08] hover:text-primary"
                    >
                        <FileText size={11} aria-hidden="true" />
                        <span className="sm:hidden">CV</span>
                        <span className="hidden sm:inline">Résumé</span>
                    </a>

                    <a
                        href={ctaHref}
                        target={contact.calendarLink ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        aria-label={`${ctaLabel} — open booking or email`}
                        className={cn(
                            "group inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-all",
                            "bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_rgba(34,197,94,0.45)]",
                            "hover:bg-primary/90 hover:shadow-[0_6px_24px_-4px_rgba(34,197,94,0.6)]"
                        )}
                    >
                        {contact.calendarLink ? (
                            <ArrowLeft size={11} aria-hidden="true" className="rotate-180 transition-transform group-hover:translate-x-0.5" />
                        ) : (
                            <Mail size={11} aria-hidden="true" />
                        )}
                        <span>{ctaLabel}</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}
