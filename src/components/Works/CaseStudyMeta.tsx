import { Clock3, CalendarClock } from "lucide-react";
import type { Project } from "@/lib/types";

interface Props {
    project: Project;
}

const WORDS_PER_MINUTE = 200;

/**
 * Read-time + last-updated meta row shown under the case-study title.
 * - Read time is derived from total word count across all section bodies
 *   and lessons, at 200 wpm. This is a plain server component so it
 *   contributes zero client JS.
 * - "Last updated" is the end of `project.period` if it looks like a
 *   range ("2024 – Present", "Mar 2024 – Dec 2025"); otherwise we fall
 *   back to the full period.
 */
export default function CaseStudyMeta({ project }: Props) {
    const caseStudy = project.caseStudy;
    if (!caseStudy) return null;

    const bodyWords =
        caseStudy.sections?.reduce(
            (acc, s) =>
                acc +
                (s.body?.split(/\s+/).filter(Boolean).length ?? 0) +
                (s.bullets?.join(" ").split(/\s+/).filter(Boolean).length ?? 0),
            0,
        ) ?? 0;
    const lessonWords =
        caseStudy.lessons?.join(" ").split(/\s+/).filter(Boolean).length ?? 0;
    const totalWords = bodyWords + lessonWords;
    const minutes = Math.max(1, Math.round(totalWords / WORDS_PER_MINUTE));
    const lastUpdated = extractLastUpdated(project.period);

    return (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-secondary-foreground/60">
            <span className="inline-flex items-center gap-1.5">
                <Clock3 size={12} aria-hidden="true" className="text-primary/70" />
                {minutes} min read
            </span>
            {lastUpdated && (
                <>
                    <span className="text-secondary-foreground/30" aria-hidden="true">
                        ·
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <CalendarClock size={12} aria-hidden="true" className="text-primary/70" />
                        Last updated {lastUpdated}
                    </span>
                </>
            )}
        </div>
    );
}

/** Pulls the end of a "Start – End" or "Start - End" range, or returns null. */
function extractLastUpdated(period?: string): string | null {
    if (!period) return null;
    const parts = period.split(/\s*[–—-]\s*/);
    if (parts.length < 2) return null;
    const end = parts[parts.length - 1].trim();
    if (!end || /present/i.test(end)) return null;
    return end;
}
