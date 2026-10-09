/**
 * Cheap, free pre-filter in front of the model. Refuses obvious junk
 * (poems, homework, general knowledge, prompt injection) without spending
 * tokens. Anything ambiguous is let through — the system prompt handles it.
 *
 * Terms are matched on word boundaries, not substrings: the old substring
 * check matched "he" inside "the" and "ai" inside "said", so it almost never
 * fired. Tech and project vocabulary is derived from `defaultContent` so new
 * projects or skills are recognised without touching this file.
 */
import { defaultContent } from "./defaultContent";

/** Hand-picked identity / career / portfolio terms. Keep these specific. */
const STATIC_ON_TOPIC_TERMS = [
  // Identity
  "sazzad", "hossain", "sazzad4677", "sazzad.dev", "he", "his", "him", "himself",
  "this portfolio", "this site", "this website",
  // Career
  "experience", "background", "career", "resume", "cv", "job", "role", "roles",
  "company", "companies", "hire", "hired", "hiring", "open to work", "availability",
  "available", "remote", "on-site", "onsite", "hybrid", "salary", "notice period",
  // Portfolio sections
  "project", "projects", "skill", "skills", "tech stack", "stack", "education",
  "degree", "university", "certification", "certifications", "award", "awards",
  "course", "courses", "contact", "email", "linkedin", "github",
  // AI terms that are specific enough to imply his work
  "llm", "llms", "ai sdk", "ai-native", "ai native", "computer vision", "pose",
  "landmarks", "inventory", "restocking", "video consultation", "component library",
];

/**
 * Refused even if an on-topic term is present: prompt injection, creative
 * writing, and classic homework are never legitimate portfolio questions,
 * and "write a poem in TypeScript" shouldn't slip through on "typescript".
 */
const ALWAYS_REFUSE_PHRASES = [
  // Prompt injection
  "ignore previous", "ignore all previous", "ignore the above", "disregard previous",
  "disregard the above", "pretend you", "roleplay as", "act as if", "jailbreak",
  "developer mode", "dan mode",
  // Creative writing
  "write a poem", "write me a poem", "write a story", "write me a story",
  "write a song", "write a joke", "tell me a joke", "tell a joke",
  "haiku", "limerick", "love letter",
  // Classic homework
  "fizzbuzz", "fizz buzz", "implement a linked list", "implement a binary tree",
  "reverse a string",
];

/** Phrases that signal an off-topic question when no on-topic term is present. */
const OFF_TOPIC_PHRASES = [
  // General knowledge / homework
  "what is the capital", "what's the capital", "what is 2+2", "what's 2+2",
  "solve this", "calculate", "math problem", "equation", "derivative of",
  "integrate", "theorem", "proof of", "history of", "when was",
  // Writing requests
  "rhyme", "cover letter", "essay",
  // Opinions / advice unrelated
  "best restaurant", "best movie", "best book", "recommend a",
  "should i buy", "stock price", "crypto price", "bitcoin",
  "what's the weather", "weather in", "news about", "latest news",
  // Coding homework (generic, no Sazzad reference)
  "sort an array", "merge sort", "quicksort",
  "leetcode", "hackerrank", "codewars", "write a function", "write code",
  // Other AIs / meta
  "chatgpt", "gemini", "bard", "what model are you", "are you gpt",
  "system prompt", "your instructions", "who created you", "who made you",
  "are you human", "are you a bot", "are you an ai",
];

/** "MongoDB & Mongoose" → ["mongodb & mongoose", "mongodb", "mongoose"]; "Next.js 16" → ["next.js"]. */
function expandTerm(raw: string): string[] {
  const base = raw.toLowerCase().replace(/\s+\d[\d.]*$/, "").trim();
  const parts = base.split(/[&(),/]/).map((p) => p.trim());
  return [base, ...parts].filter((t) => t.length >= 2);
}

function contentTerms(): string[] {
  const c = defaultContent;
  return [
    ...c.detailedSkills.flatMap((g) => g.items.map((i) => i.name)),
    ...c.projects.flatMap((p) => [p.title, ...p.technologies, p.companyName ?? ""]),
    ...c.experience.flatMap((e) => [e.company, e.name, ...(e.technologies ?? [])]),
    ...c.education.map((e) => e.school),
    ...(c.awards ?? []).map((a) => a.organization),
  ]
    .filter(Boolean)
    .flatMap(expandTerm);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * One alternation regex per list. Uses alphanumeric lookarounds rather than
 * `\b` so terms that start or end with punctuation (".net", "socket.io",
 * "c#") still match as whole words.
 */
function buildMatcher(terms: string[]): RegExp {
  const unique = Array.from(new Set(terms.map((t) => t.toLowerCase())))
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  return new RegExp(`(?<![a-z0-9])(?:${unique.join("|")})(?![a-z0-9])`, "i");
}

const ON_TOPIC = buildMatcher([...STATIC_ON_TOPIC_TERMS, ...contentTerms()]);
const ALWAYS_REFUSE = buildMatcher(ALWAYS_REFUSE_PHRASES);
const OFF_TOPIC = buildMatcher(OFF_TOPIC_PHRASES);

export function isOffTopic(message: string): boolean {
  const text = message.toLowerCase().replace(/\s+/g, " ").trim();
  // Short messages ("hi", "hello?") default to on-topic; the prompt's
  // "vague question" rule handles them.
  if (text.length < 8) return false;
  if (ALWAYS_REFUSE.test(text)) return true;
  if (ON_TOPIC.test(text)) return false;
  return OFF_TOPIC.test(text);
}

const OFF_TOPIC_REFUSALS = [
  "I'm Sazzad's portfolio assistant — I only answer questions about his background, projects, and skills. Want to hear about his AI-native work, WebRTC systems, or how he modernized a legacy .NET ERP?",
  "That's outside my scope — I focus on Sazzad's career, skills, and projects. Curious about his work with LLMs, real-time video, or computer vision?",
  "I'm here to talk about Sazzad — his experience, tech stack, and what he's building. Anything else on your mind about him?",
  "Off-topic for me! I'm the assistant for Sazzad Hossain's portfolio. Ask me about his OpenRouter integrations, MediaPipe work, or what's next in his stack.",
];

/** Pick a refusal variant. Rotates by time so the same user sees variety. */
export function offTopicRefusal(): string {
  const idx = Math.floor(Date.now() / 1000) % OFF_TOPIC_REFUSALS.length;
  return OFF_TOPIC_REFUSALS[idx];
}
