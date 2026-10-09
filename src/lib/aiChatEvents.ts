/**
 * A tiny window-scoped event bus so anywhere on the page (hero CTAs, project
 * cards, future entry points) can request that the AI chat open with a
 * pre-seeded user message — optionally scoped to a single project.
 *
 * Why not React Context? The chat bubble is a single instance mounted near
 * the root, and the entry points are scattered across the page. A DOM
 * CustomEvent keeps the wiring zero-dep and the call sites a single line.
 */

export interface OpenChatDetail {
  /** Pre-filled user message to send through `useChat.append`. */
  prompt: string;
  /** Optional project slug passed to `/api/chat` to scope the system prompt. */
  projectSlug?: string;
}

export const OPEN_AI_CHAT_EVENT = "open-ai-chat";

export function openAIChat(detail: OpenChatDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<OpenChatDetail>(OPEN_AI_CHAT_EVENT, { detail }));
}
