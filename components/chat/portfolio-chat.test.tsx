import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the AI SDK React hook so rendering is deterministic and offline.
const { useChatMock } = vi.hoisted(() => ({ useChatMock: vi.fn() }));
vi.mock("@ai-sdk/react", () => ({ useChat: useChatMock }));

import { PortfolioChat } from "@/components/chat/portfolio-chat";

type ChatState = Partial<ReturnType<typeof useChatMock>>;

function primeChat(overrides: ChatState = {}) {
  const sendMessage = vi.fn();
  const regenerate = vi.fn();
  useChatMock.mockReturnValue({
    messages: [],
    sendMessage,
    regenerate,
    status: "ready",
    error: undefined,
    ...overrides,
  });
  return { sendMessage, regenerate };
}

async function openWidget() {
  await userEvent.click(screen.getByRole("button", { name: /open chat/i }));
}

beforeEach(() => {
  useChatMock.mockReset();
});

describe("PortfolioChat", () => {
  it("renders a launcher that opens an accessible, collapsible panel", async () => {
    // Scenario: Widget is collapsible and responsive + Accessible chat controls
    primeChat();
    render(<PortfolioChat />);

    const launcher = screen.getByRole("button", { name: /open chat/i });
    expect(launcher).toBeInTheDocument();

    await openWidget();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /close chat/i }),
    ).toBeInTheDocument();
  });

  it("renders the empty state (intro + starter pills) and a ready input", async () => {
    // Scenario: Conversation view renders
    primeChat();
    render(<PortfolioChat />);
    await openWidget();

    expect(
      screen.getByRole("button", { name: /experience/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /message/i }),
    ).toBeInTheDocument();
  });

  it("sends a starter question when a pill is clicked", async () => {
    const { sendMessage } = primeChat();
    render(<PortfolioChat />);
    await openWidget();

    await userEvent.click(screen.getByRole("button", { name: /projects/i }));
    await waitFor(() =>
      expect(sendMessage).toHaveBeenCalledWith(
        expect.objectContaining({ text: expect.stringMatching(/projects/i) }),
      ),
    );
  });

  it("submits a typed message via sendMessage and clears the input", async () => {
    // Scenario: User submits a message
    const { sendMessage } = primeChat();
    render(<PortfolioChat />);
    await openWidget();

    const box = screen.getByRole("textbox", { name: /message/i });
    await userEvent.type(box, "What did you build at WERN?");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(sendMessage).toHaveBeenCalledWith({
        text: "What did you build at WERN?",
      }),
    );
    expect(box).toHaveValue("");
  });

  it("renders streamed assistant text", async () => {
    // Scenario: Streamed assistant text appears
    primeChat({
      messages: [
        { id: "u1", role: "user", parts: [{ type: "text", text: "hi" }] },
        {
          id: "a1",
          role: "assistant",
          parts: [{ type: "text", text: "Steven built real time backends." }],
        },
      ],
    });
    render(<PortfolioChat />);
    await openWidget();

    expect(
      await screen.findByText(/Steven built real time backends/i),
    ).toBeInTheDocument();
  });

  it("shows a loading indicator while a request is submitted", async () => {
    // Scenario: Loading indicator while awaiting a response
    primeChat({ status: "submitted" });
    render(<PortfolioChat />);
    await openWidget();

    expect(screen.getByText(/thinking/i)).toBeInTheDocument();
  });

  it("surfaces a retryable error state on failure", async () => {
    // Scenario: Graceful failure surfaced to the user
    const { regenerate } = primeChat({ error: new Error("network down") });
    render(<PortfolioChat />);
    await openWidget();

    expect(screen.getByRole("alert")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(regenerate).toHaveBeenCalled();
  });
});

describe("PortfolioChat client safety", () => {
  it("does not import the provider SDK or reference GROQ_API_KEY", () => {
    // Scenario: No secrets in the client bundle
    const src = readFileSync(
      resolve(process.cwd(), "components/chat/portfolio-chat.tsx"),
      "utf8",
    );
    expect(src).not.toContain("@ai-sdk/groq");
    expect(src).not.toContain("chat-model");
    expect(src).not.toContain("GROQ_API_KEY");
  });
});
