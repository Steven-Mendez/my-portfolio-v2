"use client";

/**
 * Portfolio chatbot — a collapsible chat widget built entirely from AI Elements
 * components and wired to the AI SDK `useChat` hook. Layout inspired by modern
 * support agents (avatar header, soft rounded bubbles, quick-reply pills),
 * recolored into the site's dark / periwinkle design language.
 *
 * All model work happens server-side in `/api/chat`; this client component never
 * imports the provider SDK and never references any API key.
 */

import { type ReactNode, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { BotIcon, XIcon } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Spinner } from "@/components/ui/spinner";
import { portfolioData } from "@/lib/data";
import { AGENT_NAME } from "@/lib/portfolio-context";
import { cn } from "@/lib/utils";

const FIRST_NAME =
  portfolioData.profile.firstName.charAt(0).toUpperCase() +
  portfolioData.profile.firstName.slice(1).toLowerCase();

// Starter questions, shown as quick-reply pills.
const SUGGESTIONS = [
  { label: "Experience", q: `What is ${FIRST_NAME}'s work experience?` },
  { label: "Projects", q: `What projects has ${FIRST_NAME} built?` },
  { label: "Skills", q: `What technologies does ${FIRST_NAME} know?` },
  { label: "Contact", q: `How can I get in touch with ${FIRST_NAME}?` },
];

// Soft rounded bubbles: user = periwinkle (right), assistant = subtle (left).
const BUBBLE =
  "text-sm leading-relaxed " +
  "group-[.is-user]:ml-auto group-[.is-user]:w-fit group-[.is-user]:max-w-[88%] group-[.is-user]:rounded-2xl group-[.is-user]:rounded-tr-md group-[.is-user]:bg-primary group-[.is-user]:px-4 group-[.is-user]:py-2.5 group-[.is-user]:text-primary-foreground " +
  "group-[.is-assistant]:w-fit group-[.is-assistant]:rounded-2xl group-[.is-assistant]:rounded-tl-md group-[.is-assistant]:bg-white/[0.06] group-[.is-assistant]:px-4 group-[.is-assistant]:py-2.5 group-[.is-assistant]:text-foreground/90";

// The AI Elements input box (InputGroup, the form's `> div`) → a single glass
// row: text grows on the left, the send button sits inside on the right.
const PROMPT_GLASS =
  "[&>div]:flex [&>div]:items-center [&>div]:gap-2 [&>div]:rounded-2xl [&>div]:border-white/10 [&>div]:bg-white/[0.03] dark:[&>div]:bg-white/[0.03] [&>div]:py-1 [&>div]:pl-4 [&>div]:pr-1.5 [&>div]:shadow-none";

const PILL =
  "rounded-full border border-white/15 bg-transparent px-3.5 py-1.5 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:bg-primary/10";

function Avatar() {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
      <BotIcon className="size-[18px]" />
    </span>
  );
}

// Assistant turn: robot avatar + bubble. Same row format for the intro greeting,
// every assistant reply, and the typing indicator — so they all align.
function AssistantRow({ children }: { children: ReactNode }) {
  return (
    <Message className="max-w-[90%] flex-row items-start gap-2.5" from="assistant">
      <Avatar />
      <MessageContent className={BUBBLE}>{children}</MessageContent>
    </Message>
  );
}

export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, regenerate } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text?.trim()) {
      return;
    }
    sendMessage({ text: message.text });
    setInput("");
  };

  // Non-modal native <dialog> driven declaratively by `open` (the open attribute
  // *is* non-modal display): the page stays interactive while chatting, with no
  // page-blocking backdrop. .showModal() would trap focus + dim the page, which
  // is wrong for a corner widget.
  return (
    <>
      {!open && (
        <button
          aria-label="Open chat"
          className="fixed bottom-5 right-5 z-[150] flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/30 transition-transform hover:-translate-y-0.5 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={() => setOpen(true)}
          type="button"
        >
          <BotIcon className="size-6" />
        </button>
      )}
      <dialog
        open={open}
        aria-label={`Chat with ${AGENT_NAME}, ${FIRST_NAME}'s assistant`}
        className="fixed inset-auto bottom-5 right-5 z-[150] m-0 hidden h-[min(75vh,36rem)] max-h-none w-[min(92vw,24rem)] max-w-none flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141418]/95 p-0 shadow-2xl shadow-black/60 backdrop-blur-xl open:flex"
        onClose={() => setOpen(false)}
      >
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <Avatar />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold text-foreground">
            {AGENT_NAME}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Ask me anything
          </span>
        </span>
        <button
          aria-label="Close chat"
          className="-mr-1 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline-2"
          onClick={() => setOpen(false)}
          type="button"
        >
          <XIcon className="size-4" />
        </button>
      </header>

      <Conversation className="relative flex-1">
        <ConversationContent className="gap-4">
          {/* Greeting persists as the first message in the thread. */}
          <AssistantRow>
            Hi! 👋 I&apos;m {AGENT_NAME} — ask me anything about {FIRST_NAME}
            &apos;s experience, projects, skills, or how to reach him.
          </AssistantRow>
          {messages.length === 0 && (
            <div className="flex flex-wrap justify-end gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  className={PILL}
                  key={s.label}
                  onClick={() => sendMessage({ text: s.q })}
                  type="button"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
          {messages.map((message) => {
            const text = message.parts.map((part) =>
              part.type === "text" ? (
                // No tools in this chat, so a message has a single text part —
                // a per-message text key is stable and won't churn while it
                // streams (a content-based key would remount on every token).
                <MessageResponse key={`${message.id}-text`}>
                  {part.text}
                </MessageResponse>
              ) : null,
            );
            return message.role === "assistant" ? (
              <AssistantRow key={message.id}>{text}</AssistantRow>
            ) : (
              <Message from={message.role} key={message.id}>
                <MessageContent className={BUBBLE}>{text}</MessageContent>
              </Message>
            );
          })}
          {status === "submitted" && (
            <AssistantRow>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Spinner />
                Thinking…
              </span>
            </AssistantRow>
          )}
        </ConversationContent>
        <ConversationScrollButton className="border-white/10 bg-white/5 text-foreground backdrop-blur-md hover:bg-white/10" />
      </Conversation>

      {error && (
        <div
          className="flex items-center justify-between gap-2 border-t border-white/10 bg-destructive/10 px-4 py-2 text-sm text-destructive"
          role="alert"
        >
          <span>Something went wrong.</span>
          <button
            className="font-medium underline underline-offset-2 hover:opacity-80"
            onClick={() => regenerate()}
            type="button"
          >
            Retry
          </button>
        </div>
      )}

      <div className="border-t border-white/10 p-3">
        <PromptInput className={PROMPT_GLASS} onSubmit={handleSubmit}>
          <PromptInputTextarea
            aria-label="Message"
            className="min-h-9 flex-1 bg-transparent py-2 text-sm leading-5 text-foreground placeholder:text-muted-foreground/60"
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Message…"
            value={input}
          />
          <PromptInputSubmit
            className={cn(
              "shrink-0 self-center rounded-full shadow-none",
              input.trim()
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-white/10 text-muted-foreground hover:bg-white/15",
            )}
            disabled={!input.trim() && status !== "streaming"}
            status={status}
          />
        </PromptInput>
      </div>
      </dialog>
    </>
  );
}
