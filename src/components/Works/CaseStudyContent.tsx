"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    Github,
    Sparkles,
    Quote,
    ChevronRight,
    Copy,
    Check,
    MessageSquareText,
    Terminal,
} from "lucide-react";
import { Project } from "@/lib/types";
import contentManager from "@/lib/contentManager";
import CaseStudyAskAI from "@/components/Works/CaseStudyAskAI";
import RequestFlowDiagram from "@/components/Works/RequestFlowDiagram";
import CaseStudyTOC from "./CaseStudyTOC";
import ReadingProgress from "./ReadingProgress";
import AnimatedStat from "./AnimatedStat";
import CaseStudyMeta from "./CaseStudyMeta";

interface Props {
    project: Project;
}

/**
 * Full-page case-study content. Renders the cover hero, quick facts,
 * the in-page TOC, all sections (with the opt-in flow diagram), a
 * pull-quote "What I learned" block, the sidebar, and a next/previous
 * case-study nav at the bottom.
 */
export default function CaseStudyContent({ project }: Props) {
    if (!project.caseStudy) return null;
    const cs = project.caseStudy;
    const cta = project.links.external || project.links.github;

    /** Sibling projects for the next/previous nav. */
    const allProjects = contentManager.getProjects();
    const featured = useMemo(
        () => allProjects.filter((p) => !!p.caseStudy),
        [allProjects]
    );
    const idx = featured.findIndex((p) => p.slug === project.slug);
    const prev = idx > 0 ? featured[idx - 1] : null;
    const next = idx < featured.length - 1 ? featured[idx + 1] : null;

    /** Group the tech stack by category for the sidebar. */
    const techGroups = useMemo(
        () => groupTechStack(project.technologies),
        [project.technologies]
    );

    /** Show the dedicated "Ask the AI" body block on long case studies. */
    const showAIBlock = !!project.deepDive || cs.sections.length >= 4;

    return (
        <div className="relative">
            {/* Top reading progress bar */}
            <ReadingProgress />

            {/* Back to projects */}
            <Link
                href="/#projects"
                className="group mb-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary/80 transition-colors hover:text-primary"
            >
                <ArrowLeft
                    size={13}
                    className="transition-transform group-hover:-translate-x-0.5"
                    aria-hidden="true"
                />
                All projects
            </Link>

            <Cover project={project} />

            {/* Quick facts strip */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Fact label="Role" value={cs.role} />
                <Fact label="Timeline" value={cs.timeline} />
                {cs.team && <Fact label="Team" value={cs.team} />}
            </div>

            {/* Body grid: TOC + sections + sidebar */}
            <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[200px_minmax(0,1fr)_280px]">
                {/* Sticky TOC (desktop only) */}
                <aside className="hidden lg:block">
                    <CaseStudyTOC
                        items={[
                            { id: "problem", label: "Problem", number: "00" },
                            ...cs.sections.map((s, i) => ({
                                id: slugify(s.title),
                                label: s.title,
                                number: String(i + 1).padStart(2, "0"),
                            })),
                            ...(cs.sections.some((s) => s.title === "Request flow")
                                ? [
                                      {
                                          id: "request-flow-diagram",
                                          label: "Request flow",
                                          number: "↳",
                                      },
                                  ]
                                : []),
                            ...(cs.lessons && cs.lessons.length > 0
                                ? [
                                      {
                                          id: "what-i-learned",
                                          label: "What I learned",
                                          number: "★",
                                      },
                                  ]
                                : []),
                            ...(showAIBlock
                                ? [
                                      {
                                          id: "ask-the-ai",
                                          label: "Ask the AI",
                                          number: "✦",
                                      },
                                  ]
                                : []),
                        ]}
                    />
                </aside>

                {/* Sections */}
                <article className="min-w-0 space-y-16">
                    <Section
                        eyebrow="00"
                        title="Problem"
                        body={cs.problem}
                        id="problem"
                    />

                    {cs.sections.map((s, i) => (
                        <Section
                            key={i}
                            eyebrow={String(i + 1).padStart(2, "0")}
                            title={s.title}
                            body={s.body}
                            bullets={s.bullets}
                            id={slugify(s.title)}
                        />
                    ))}

                    {cs.sections.some((s) => s.title === "Request flow") && (
                        <div id="request-flow-diagram" className="scroll-mt-32">
                            <RequestFlowDiagram />
                        </div>
                    )}

                    {cs.lessons && cs.lessons.length > 0 && (
                        <Lessons items={cs.lessons} id="what-i-learned" />
                    )}

                    {showAIBlock && <AskAIBlock project={project} />}

                    <NextPrev prev={prev} next={next} />
                </article>

                {/* Sidebar */}
                <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                    <Sidebar project={project} techGroups={techGroups} cta={cta} />
                </aside>
            </div>
        </div>
    );
}

/* ---------- Pieces ---------- */

function Cover({ project }: { project: Project }) {
    return (
        <header className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-surface/40 via-background to-primary/[0.06] p-6 sm:p-8 md:p-12">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-[80px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-[90px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative">
                <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary/80">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/[0.08] px-2.5 py-1">
                        <Sparkles size={11} aria-hidden="true" />
                        Case study
                    </span>
                    <span className="text-secondary-foreground/40">·</span>
                    <span className="text-secondary-foreground/70">
                        {project.category ||
                            (project.isCompanyProject
                                ? "Professional Project"
                                : "Personal Project")}
                    </span>
                    {project.companyName && (
                        <>
                            <span className="text-secondary-foreground/40">·</span>
                            <span className="text-secondary-foreground/70">
                                @{project.companyName}
                            </span>
                        </>
                    )}
                    {project.period && (
                        <>
                            <span className="text-secondary-foreground/40">·</span>
                            <span className="text-secondary-foreground/70">
                                {project.period}
                            </span>
                        </>
                    )}
                </div>

                <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
                    <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                        {project.title}
                    </span>
                </h1>

                {project.outcomeLine && (
                    <p className="mt-5 max-w-[820px] text-base sm:text-lg leading-relaxed text-secondary-foreground/85">
                        {project.outcomeLine}
                    </p>
                )}

                <CaseStudyMeta project={project} />

                {project.impact && project.impact.length > 0 && (
                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 max-w-[820px]">
                        {project.impact.map((stat, i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.05]"
                            >
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                                />
                                <AnimatedStat value={stat.value} />
                                {/* Divider between the big number and the small label. */}
                                <div
                                    aria-hidden="true"
                                    className="mt-2 h-px w-8 bg-gradient-to-r from-primary/40 to-transparent"
                                />
                                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary-foreground/65">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <CaseStudyAskAI
                        projectTitle={project.title}
                        projectSlug={project.slug}
                    />
                    {project.links.external && (
                        <a
                            href={project.links.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/[0.08] px-4 py-2 font-mono text-xs font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/15"
                        >
                            <ExternalLink size={13} aria-hidden="true" />
                            Live project
                        </a>
                    )}
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-surface/30 px-4 py-2 font-mono text-xs font-semibold text-foreground/80 transition-all hover:border-border/70 hover:text-foreground"
                        >
                            <Github size={13} aria-hidden="true" />
                            Source
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
}

function Fact({ label, value }: { label: string; value: string }) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-surface/30 p-4 backdrop-blur-sm">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">
                {label}
            </div>
            <div className="mt-1.5 text-sm font-medium text-foreground/90 leading-relaxed">
                {value}
            </div>
        </div>
    );
}

function Section({
    eyebrow,
    title,
    body,
    bullets,
    id,
}: {
    eyebrow: string;
    title: string;
    body: string;
    bullets?: string[];
    id?: string;
}) {
    return (
        <section id={id} className="scroll-mt-32">
            <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-primary/80">
                <span className="text-primary">{eyebrow}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                <span className="text-secondary-foreground/40">Section</span>
            </div>

            <h2 className="font-sans text-2xl sm:text-3xl font-bold leading-[1.15] tracking-tight text-foreground text-balance">
                {title}
            </h2>

            {body && (
                <p className="mt-5 text-base sm:text-[17px] leading-[1.7] text-secondary-foreground/85 max-w-[68ch]">
                    {body}
                </p>
            )}

            {bullets && bullets.length > 0 && (
                <ul className="mt-6 space-y-3 max-w-[68ch]">
                    {bullets.map((b, i) => (
                        <li
                            key={i}
                            className="group relative flex gap-3 pl-5 text-[15px] sm:text-base leading-[1.65] text-secondary-foreground/85"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-primary/60 transition-colors group-hover:bg-primary"
                            />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

function Lessons({ items, id }: { items: string[]; id?: string }) {
    return (
        <section id={id} className="scroll-mt-32">
            <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300/80">
                <span>★</span>
                <span className="h-px flex-1 bg-gradient-to-r from-amber-300/30 to-transparent" />
                <span className="text-secondary-foreground/40">Reflections</span>
            </div>

            <h2 className="font-sans text-2xl sm:text-3xl font-bold leading-[1.15] tracking-tight text-foreground text-balance">
                What I learned
            </h2>

            <div className="mt-7 grid grid-cols-1 gap-4">
                {items.map((lesson, i) => (
                    <figure
                        key={i}
                        className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-surface/40 to-background p-5 sm:p-6"
                    >
                        <Quote
                            size={28}
                            className="absolute -top-2 right-4 text-primary/15"
                            aria-hidden="true"
                        />
                        <div className="flex items-start gap-4">
                            <span className="font-mono text-2xl font-bold text-primary/40">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <blockquote className="text-[15px] sm:text-base leading-[1.65] text-secondary-foreground/90">
                                {lesson}
                            </blockquote>
                        </div>
                    </figure>
                ))}
            </div>
        </section>
    );
}

function NextPrev({ prev, next }: { prev: Project | null; next: Project | null }) {
    return (
        <nav
            aria-label="Case study pagination"
            className="mt-4 grid grid-cols-1 gap-3 border-t border-border/30 pt-10 sm:grid-cols-2"
        >
            {prev ? (
                <Link
                    href={`/work/${prev.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-border/40 bg-surface/20 p-4 transition-all hover:border-primary/40 hover:bg-primary/[0.05]"
                >
                    <ArrowLeft
                        size={16}
                        className="text-primary/70 transition-transform group-hover:-translate-x-0.5"
                        aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary-foreground/50">
                            Previous case study
                        </div>
                        <div className="mt-0.5 truncate text-sm font-semibold text-foreground/90">
                            {prev.title}
                        </div>
                    </div>
                </Link>
            ) : (
                <div />
            )}

            {next ? (
                <Link
                    href={`/work/${next.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-border/40 bg-surface/20 p-4 transition-all hover:border-primary/40 hover:bg-primary/[0.05] sm:text-right"
                >
                    <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary-foreground/50">
                            Next case study
                        </div>
                        <div className="mt-0.5 truncate text-sm font-semibold text-foreground/90">
                            {next.title}
                        </div>
                    </div>
                    <ArrowRight
                        size={16}
                        className="text-primary/70 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                    />
                </Link>
            ) : (
                <Link
                    href="/#projects"
                    className="group flex items-center justify-center gap-2 rounded-2xl border border-border/40 bg-surface/20 p-4 transition-all hover:border-primary/40 hover:bg-primary/[0.05]"
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary-foreground/70">
                        Back to all projects
                    </span>
                    <ChevronRight
                        size={14}
                        className="text-primary/70"
                        aria-hidden="true"
                    />
                </Link>
            )}
        </nav>
    );
}

function Sidebar({
    project,
    techGroups,
    cta,
}: {
    project: Project;
    techGroups: { name: string; items: string[] }[];
    cta?: string;
}) {
    return (
        <>
            <div className="rounded-2xl border border-border/40 bg-surface/30 p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/80">
                        Tech stack
                    </h3>
                    <span className="font-mono text-[10px] text-secondary-foreground/40">
                        {project.technologies.length}
                    </span>
                </div>
                <div className="space-y-3">
                    {techGroups.map((g) => (
                        <div key={g.name}>
                            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-secondary-foreground/50">
                                {g.name}
                            </div>
                            <ul className="mt-1.5 flex flex-wrap gap-1.5">
                                {g.items.map((t) => (
                                    <li
                                        key={t}
                                        className="rounded-md border border-primary/15 bg-primary/[0.06] px-2 py-1 font-mono text-[10px] text-primary/90"
                                    >
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {cta && (
                <a
                    href={cta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-mono text-xs font-bold text-primary-foreground transition-all hover:opacity-90"
                >
                    Visit live project
                    <ExternalLink size={13} aria-hidden="true" />
                </a>
            )}

            <Link
                href="/#projects"
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-border/40 bg-surface/20 px-5 py-3 font-mono text-xs font-semibold text-foreground/80 transition-all hover:border-border/70 hover:text-foreground"
            >
                <ArrowLeft size={13} aria-hidden="true" />
                All projects
            </Link>
        </>
    );
}

/* ---------- Helpers ---------- */

function slugify(s: string) {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

/**
 * Heuristic tech-stack categorizer. Keeps the sidebar scannable when
 * a project uses 8+ technologies. Falls back to a single "Stack"
 * group when nothing matches.
 */
function groupTechStack(items: string[]): { name: string; items: string[] }[] {
    const groups: Record<string, string[]> = {
        Frontend: [],
        Backend: [],
        "AI / Data": [],
        "Realtime / CV": [],
        Infra: [],
        Tooling: [],
    };

    const matchers: Array<[string, (t: string) => boolean]> = [
        [
            "AI / Data",
            (t) => /openai|openrouter|llm|gpt|ai[- ]sdk|machine|^ml$/i.test(t),
        ],
        [
            "Realtime / CV",
            (t) => /webrtc|socket\.?io|mediapipe|pose|^cv$|computer vision/i.test(t),
        ],
        [
            "Frontend",
            (t) =>
                /^(next\.?js|react|vue|angular|tailwind|^css$|^html$|framer|gsap|lenis|redux|zustand|radix|shadcn)/i.test(t) ||
                /^(typescript|javascript)$/i.test(t),
        ],
        [
            "Backend",
            (t) =>
                /^(node|express|fastify|nest|hono|django|flask|fastapi|\.net|java |spring|postgres|mysql|mongo|mongodb|^redis$|prisma|drizzle|auth)/i.test(t),
        ],
        [
            "Infra",
            (t) => /^(aws|gcp|azure|vercel|netlify|docker|kubernetes|^k8s$|terraform|github actions|^ci$|^cd$)/i.test(t),
        ],
        [
            "Tooling",
            (t) => /^(jest|vitest|playwright|cypress|eslint|prettier|webpack|vite|turbopack|pnpm|yarn)/i.test(t),
        ],
    ];

    for (const tech of items) {
        let placed = false;
        for (const [name, test] of matchers) {
            if (test(tech)) {
                groups[name].push(tech);
                placed = true;
                break;
            }
        }
        if (!placed) groups.Tooling.push(tech);
    }

    return Object.entries(groups)
        .filter(([, v]) => v.length > 0)
        .map(([name, list]) => ({ name, items: list }));
}

/* ---------- Dedicated "Ask the AI" body block ---------- */

/**
 * Inline section in the case-study body that previews a few sample
 * questions and opens the global AI chat pre-seeded with the project
 * context. Distinct from the cover pill, which is the primary CTA.
 */
function AskAIBlock({ project }: { project: Project }) {
    const questions = project.sampleQuestions?.slice(0, 3) ?? [];
    return (
        <section
            id="ask-the-ai"
            className="scroll-mt-32 rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] p-5 sm:p-7"
            aria-labelledby="ask-the-ai-heading"
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                        <MessageSquareText size={12} aria-hidden="true" />
                        Ask the AI
                    </div>
                    <h3
                        id="ask-the-ai-heading"
                        className="mt-2 font-sans text-xl font-bold text-foreground sm:text-2xl"
                    >
                        Have a follow-up question about this project?
                    </h3>
                    <p className="mt-1.5 max-w-prose text-sm text-secondary-foreground/80">
                        The assistant has the same deep-dive context that powers this page
                        and can answer in plain language, including the trade-offs I
                        didn&apos;t ship.
                    </p>
                </div>
                <div className="shrink-0 sm:pt-1">
                    <CaseStudyAskAI
                        projectTitle={project.title}
                        projectSlug={project.slug}
                    />
                </div>
            </div>

            {questions.length > 0 && (
                <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                    {questions.map((q, i) => (
                        <li
                            key={i}
                            className="rounded-lg border border-border/40 bg-background/50 p-3 font-mono text-[11px] leading-relaxed text-secondary-foreground/85"
                        >
                            <span className="mr-1 text-amber-300/80">→</span>
                            {q}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

/* ---------- Copy-able code block (for any fenced snippets) ---------- */

/**
 * Renders a code block with a one-click "Copy" button. Wired for future
 * case studies that may want to include a snippet; the AI case study
 * route already references this style.
 */
export function CodeBlock({
    code,
    language = "ts",
}: {
    code: string;
    language?: string;
}) {
    const [copied, setCopied] = useState(false);
    return (
        <div className="group relative my-4 overflow-hidden rounded-xl border border-border/40 bg-background/70">
            <div className="flex items-center justify-between border-b border-border/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-secondary-foreground/60">
                <span className="inline-flex items-center gap-1.5">
                    <Terminal size={11} aria-hidden="true" />
                    {language}
                </span>
                <button
                    type="button"
                    onClick={async () => {
                        try {
                            await navigator.clipboard.writeText(code);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1500);
                        } catch {
                            /* clipboard unavailable — silent fail */
                        }
                    }}
                    className="inline-flex items-center gap-1 rounded border border-border/40 bg-background/60 px-1.5 py-0.5 text-[10px] text-secondary-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
                    aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
                >
                    {copied ? (
                        <>
                            <Check size={11} aria-hidden="true" /> Copied
                        </>
                    ) : (
                        <>
                            <Copy size={11} aria-hidden="true" /> Copy
                        </>
                    )}
                </button>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-secondary-foreground/90">
                <code>{code}</code>
            </pre>
        </div>
    );
}
