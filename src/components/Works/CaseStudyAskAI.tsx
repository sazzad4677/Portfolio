"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { openAIChat } from "@/lib/aiChatEvents";

interface Props {
    projectTitle: string;
    projectSlug: string;
}

/**
 * "Ask AI about this project" button used on `/work/[slug]` case-study pages.
 * Opens the global AI chat pre-seeded with a project-scoped prompt.
 */
export default function CaseStudyAskAI({ projectTitle, projectSlug }: Props) {
    return (
        <button
            type="button"
            onClick={() =>
                openAIChat({
                    prompt: `Walk me through the architecture and trade-offs of ${projectTitle}.`,
                    projectSlug,
                })
            }
            className="group inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/[0.08] px-4 py-2 font-mono text-xs font-semibold text-amber-300 transition-all hover:border-amber-400/60 hover:bg-amber-400/15"
            aria-label={`Ask the AI about ${projectTitle}`}
        >
            <Sparkles size={13} className="transition-transform group-hover:rotate-12" aria-hidden="true" />
            Ask the AI about this project
        </button>
    );
}
