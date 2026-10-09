/**
 * Knowledge base fed into the AI system prompt.
 *
 * Projects, experience, skills, education, awards and professional development
 * are derived from `defaultContent.ts` — the same data that renders the page —
 * so the assistant can never drift from what visitors see. Only facts that have
 * no on-page home (personal summary, tooling, languages, availability) live here.
 */
import { defaultContent } from "./defaultContent";
import type { Project } from "./types";

export interface PortfolioProject {
  slug: string;
  name: string;
  type: "Company Project" | "Personal Project";
  company?: string;
  period?: string;
  techStack: string[];
  highlights: string[];
  sourceCode?: string;
  liveLink?: string;
  /** Two- to three-sentence walkthrough the AI can use to answer "tell me about this project". */
  deepDive: string;
  /** Optional prompts the AI is well-equipped to answer about this project. */
  sampleQuestions?: string[];
}

function toPortfolioProject(p: Project): PortfolioProject {
  return {
    slug: p.slug,
    name: p.title,
    type: p.isCompanyProject ? "Company Project" : "Personal Project",
    company: p.companyName,
    period: p.period,
    techStack: p.technologies,
    highlights: p.descriptionList ?? [p.description],
    sourceCode: p.links.github,
    liveLink: p.links.external,
    deepDive: p.deepDive,
    sampleQuestions: p.sampleQuestions,
  };
}

export const portfolioContext = {
  personal: {
    name: "Md Sazzad Hossain",
    title: "Full-Stack Engineer (AI Native)",
    email: "sazzad4677@gmail.com",
    phone: "+8801679436054",
    location: "Dhaka, Bangladesh",
    website: "https://sazzad.dev",
    linkedin: "https://linkedin.com/in/sazzad4673",
    github: "https://github.com/sazzad4677",
    summary:
      "AI-native full-stack engineer with 4+ years of building React, Next.js, and TypeScript products. Rebuilt a legacy .NET ERP frontend while working directly with its users, and set up its GitHub Actions CI/CD. Built WebRTC video consultations for a telemedicine platform. Builds with Cursor, Claude, and Codex every day, and has shipped LLM features with OpenRouter and the Vercel AI SDK.",
  },

  skills: defaultContent.detailedSkills.map((group) => ({
    category: group.category,
    primary: group.items.filter((i) => i.level === "primary").map((i) => i.name),
    secondary: group.items.filter((i) => i.level !== "primary").map((i) => i.name),
  })),

  experience: defaultContent.experience.map((e) => ({
    company: e.name,
    role: e.position,
    period: e.range,
    highlights: e.description,
    techStack: e.technologies ?? [],
  })),

  projects: defaultContent.projects.map(toPortfolioProject),

  aiTooling: {
    editor: "Cursor",
    assistants: ["Claude", "Codex"],
    modelRouters: ["OpenRouter", "Vercel AI SDK"],
    localRuntime: "Ollama",
    vision: "MediaPipe (Pose landmarks)",
    dailyWorkflow:
      "Cursor is the default editor. Claude and Codex are used for code review, refactors, and spec writing. OpenRouter is the production model gateway; Ollama is used for offline experiments. MediaPipe handles on-device computer-vision features.",
  },

  awards: (defaultContent.awards ?? []).map((a) => ({
    title: a.title,
    organization: a.organization,
    date: a.dates,
    description: a.description,
  })),

  professionalDevelopment: (defaultContent.professionalDevelopment ?? []).map((d) => ({
    title: d.title,
    institution: d.provider,
    period: d.range,
    focus: d.focus,
  })),

  education: defaultContent.education.map((e) => ({
    degree: e.degree,
    institution: e.school,
    period: e.range,
  })),

  certifications: defaultContent.certifications.map((c) => ({
    title: c.title,
    issuer: c.issuer,
    date: c.date,
  })),

  languages: [
    { language: "Bangla", level: "Native" },
    { language: "English", level: "Proficient" },
  ],

  availability: {
    openToWork: true,
    workModes: ["Remote", "Office / On-site", "Hybrid"],
    preferredRoles: [
      "Full-Stack Engineer (AI Native)",
      "Software Engineer",
      "Frontend / Systems Architect",
    ],
    preferredStack: "React / Next.js / TypeScript / Node.js / AI (OpenRouter, Vercel AI SDK, MediaPipe)",
  },
};

/** Look up a project by its stable slug — used by the chat route to scope answers. */
export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioContext.projects.find((p) => p.slug === slug);
}

export type PortfolioContext = typeof portfolioContext;
