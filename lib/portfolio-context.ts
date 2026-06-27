/**
 * Single source of truth for the portfolio chatbot's knowledge.
 *
 * The bot is ONLY allowed to use what this module exposes. Every fact here is
 * derived from `lib/data.ts` (`portfolioData`) — the same canonical content the
 * rest of the site renders — so nothing is duplicated or able to drift.
 *
 * Anything the bot needs that is NOT in `portfolioData` is marked as a
 * `PLACEHOLDER` below. Do NOT replace a placeholder with invented details —
 * fill it in with real information or leave it for the portfolio owner.
 */

import { portfolioData, type ExperienceItem } from "@/lib/data";

// ---------------------------------------------------------------------------
// PLACEHOLDERS — bot-specific content not present in lib/data.ts.
// Replace the text with real content; do not fabricate biographical facts.
// ---------------------------------------------------------------------------
const PLACEHOLDERS = {
  /** PLACEHOLDER: extra FAQ-style answers (availability, rates, timezone overlap,
   *  preferred contact, etc.). Leave empty until the owner provides real values. */
  faq: "" as string,
  /** PLACEHOLDER: anything the owner wants the assistant to emphasize or avoid. */
  notes: "" as string,
};

function formatExperience(item: ExperienceItem, depth = 0): string {
  const indent = depth > 0 ? "  ".repeat(depth) : "";
  const head = `${indent}- ${item.title} @ ${item.company} (${item.period}${
    item.location ? `, ${item.location}` : ""
  })`;
  const bullets = item.bullets.map((b) => `${indent}    • ${b}`).join("\n");
  const children = (item.children ?? [])
    .map((c) => formatExperience(c, depth + 1))
    .join("\n");
  return [head, bullets, children].filter(Boolean).join("\n");
}

/**
 * Structured, prompt-ready view of the portfolio, grouped by the sections the
 * bot answers about: bio, skills, experience, projects, education, contact.
 */
const portfolioContext = {
  get bio(): string {
    const { profile, about } = portfolioData;
    return [
      `Name: ${profile.fullName}`,
      `Role: ${profile.role}`,
      `Tagline: ${profile.tagline}`,
      `Location: ${profile.location} (${profile.timezone})`,
      `Languages: ${portfolioData.languages
        .map((l) => `${l.name} (${l.level})`)
        .join(", ")}`,
      `Summary: ${about.resumeSummary}`,
      `Focus areas: ${about.focusAreas.join("; ")}`,
    ].join("\n");
  },

  get skills(): string {
    return portfolioData.skills.categories
      .map((c) => `- ${c.label}: ${c.items.join(", ")}`)
      .join("\n");
  },

  get experience(): string {
    return portfolioData.experience.map((e) => formatExperience(e)).join("\n");
  },

  get projects(): string {
    return portfolioData.projects
      .map((p) => `- ${p.title} (${p.label}): ${p.description}`)
      .join("\n");
  },

  get education(): string {
    const degrees = portfolioData.education
      .map((e) => `- ${e.degree}, ${e.institution} (${e.period})`)
      .join("\n");
    const certs = portfolioData.certifications
      .map((c) => `- ${c.name} — ${c.org} (${c.year})`)
      .join("\n");
    return `${degrees}\n${certs}`;
  },

  get contact(): string {
    const { profile, socials } = portfolioData;
    return [
      `Email: ${profile.contactEmail}`,
      `GitHub: ${socials.github}`,
      `LinkedIn: ${socials.linkedin}`,
      `Upwork: ${socials.upwork}`,
    ].join("\n");
  },
};

/** The owner's name — used in the guardrail and greetings. */
export const OWNER_NAME = portfolioData.profile.fullName;

/** The assistant's display name (single source for UI + system prompt). */
export const AGENT_NAME = "Jarvis";

/**
 * Build the system prompt injected into every chat request. Composes an identity
 * preamble, the single-source portfolio context, and the on-topic guardrail.
 */
export function buildSystemPrompt(): string {
  const faq = PLACEHOLDERS.faq.trim()
    ? `\n## Additional Q&A\n${PLACEHOLDERS.faq.trim()}`
    : "";
  const notes = PLACEHOLDERS.notes.trim()
    ? `\n## Notes\n${PLACEHOLDERS.notes.trim()}`
    : "";

  return `You are ${AGENT_NAME}, the portfolio assistant for ${OWNER_NAME}, embedded on his personal portfolio website. If asked your name, say you are ${AGENT_NAME}. You speak about ${OWNER_NAME} in the third person and help visitors (recruiters, hiring managers, collaborators) learn about him.

# Guardrails
- ONLY answer questions about ${OWNER_NAME}, his work, experience, skills, projects, education, or how to contact him — i.e. topics covered by the portfolio context below.
- If a question is NOT about ${OWNER_NAME} or this portfolio (e.g. general coding help, math, writing, current events, anything off-topic), politely DECLINE and redirect the visitor back to portfolio-related topics. Do not act as a general-purpose assistant.
- Only state facts that are supported by the portfolio context below. If you don't have the information, say so and point the visitor to the contact details — never invent details.
- Keep answers SHORT: 2–4 sentences, or a few short bullet points at most. Lead with the direct answer and don't over-explain. If there's a lot to cover, give a brief summary and offer to go deeper if the visitor wants. Be friendly and professional.

# Portfolio context

## Bio
${portfolioContext.bio}

## Skills
${portfolioContext.skills}

## Experience
${portfolioContext.experience}

## Projects
${portfolioContext.projects}

## Education & Certifications
${portfolioContext.education}

## Contact
${portfolioContext.contact}${faq}${notes}`;
}
