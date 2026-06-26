import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { CHAT_MODEL_ID, chatModel } from "@/lib/chat-model";

describe("chat-model", () => {
  it("defaults to the Groq llama-3.3-70b-versatile model", () => {
    // Scenario: Default model is Groq llama-3.3-70b-versatile
    expect(CHAT_MODEL_ID).toBe("llama-3.3-70b-versatile");
    expect(chatModel.modelId).toBe("llama-3.3-70b-versatile");
    expect(String(chatModel.provider)).toMatch(/groq/i);
  });

  it("reads the key from the environment and hardcodes no API key", () => {
    // Scenario: API key comes from the environment, never hardcoded
    const src = readFileSync(resolve(process.cwd(), "lib/chat-model.ts"), "utf8");
    expect(src).not.toMatch(/gsk_[A-Za-z0-9]/); // no Groq key literal
    expect(src).not.toMatch(/apiKey\s*:/); // key is never passed inline
  });

  it("defines the model in a single swappable place", () => {
    // Scenario: Provider is swappable in one place — the route imports the model
    // from this module rather than constructing it itself.
    const routeSrc = readFileSync(
      resolve(process.cwd(), "app/api/chat/route.ts"),
      "utf8",
    );
    expect(routeSrc).toContain("@/lib/chat-model");
    expect(routeSrc).not.toContain("@ai-sdk/groq");
  });
});
