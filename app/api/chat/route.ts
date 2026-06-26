import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import { chatModel } from "@/lib/chat-model";
import { buildSystemPrompt } from "@/lib/portfolio-context";

// Allow streaming responses up to 30 seconds.
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: chatModel,
      system: buildSystemPrompt(),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    // Never leak secrets or stack traces to the client; log server-side only.
    console.error("[/api/chat] request failed:", error);
    return new Response(
      JSON.stringify({
        error: "The assistant is unavailable right now. Please try again.",
      }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}
