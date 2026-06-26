import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the AI provider so the suite makes no network calls and needs no key.
const { streamTextMock } = vi.hoisted(() => ({ streamTextMock: vi.fn() }));

vi.mock("ai", () => ({
  streamText: streamTextMock,
  convertToModelMessages: (messages: unknown) => messages,
}));
vi.mock("@/lib/chat-model", () => ({
  chatModel: { modelId: "mock-model" },
  CHAT_MODEL_ID: "mock-model",
}));

import { POST } from "@/app/api/chat/route";
import { buildSystemPrompt } from "@/lib/portfolio-context";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = {
  messages: [{ id: "1", role: "user", parts: [{ type: "text", text: "Hi" }] }],
};

beforeEach(() => {
  streamTextMock.mockReset();
});

describe("POST /api/chat", () => {
  it("returns the streaming response from the AI SDK for a valid payload", async () => {
    // Scenario: Valid request returns a streaming response
    const streamResponse = new Response("event-stream", {
      status: 200,
      headers: { "content-type": "text/event-stream" },
    });
    streamTextMock.mockReturnValue({
      toUIMessageStreamResponse: () => streamResponse,
    });

    const res = await POST(makeRequest(validBody));

    expect(streamTextMock).toHaveBeenCalledTimes(1);
    expect(res).toBe(streamResponse);
    expect(res.status).toBe(200);
  });

  it("injects the single-source portfolio system prompt", async () => {
    // Scenario: System prompt is injected into the model call
    streamTextMock.mockReturnValue({
      toUIMessageStreamResponse: () => new Response("ok"),
    });

    await POST(makeRequest(validBody));

    const callArg = streamTextMock.mock.calls[0][0] as { system: string };
    expect(callArg.system).toBe(buildSystemPrompt());
  });

  it("handles a provider failure gracefully without leaking secrets", async () => {
    // Scenario: Provider failure is handled gracefully
    streamTextMock.mockImplementation(() => {
      throw new Error("groq blew up — apiKey gsk_supersecret leaked here");
    });

    const res = await POST(makeRequest(validBody));

    expect(res.status).toBe(500);
    const payload = await res.json();
    expect(payload.error).toBeTruthy();
    const serialized = JSON.stringify(payload);
    expect(serialized).not.toContain("gsk_supersecret");
    expect(serialized).not.toMatch(/stack|at Object|\.ts:/i);
  });
});
