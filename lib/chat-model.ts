/**
 * The active chat model — the ONE place to change the provider.
 *
 * Default: Groq `llama-3.3-70b-versatile` (free, no credit card). The default
 * `groq` provider reads the `GROQ_API_KEY` environment variable automatically;
 * no key is ever hardcoded here.
 *
 * To swap providers, change the single `chatModel` line below. For example, to
 * use Google Gemini: `pnpm add @ai-sdk/google`, then
 *   import { google } from "@ai-sdk/google";
 *   export const chatModel = google("gemini-2.0-flash");
 * Nothing in the route handler or UI needs to change.
 */

import { groq } from "@ai-sdk/groq";

/** Default model id, exported so it can be asserted in tests. */
export const CHAT_MODEL_ID = "llama-3.3-70b-versatile";

// --- swap this one line to change provider/model -------------------------------
export const chatModel = groq(CHAT_MODEL_ID);
// -------------------------------------------------------------------------------
