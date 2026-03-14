// CONTEXT: Main AI chat processing function. This is the core of SuperHome.
// User sends a message describing their need → AI extracts service type,
// generates summary, suggests time slots, and estimates price.
// TODO: Integrate actual AI (OpenAI/Gemini) - currently returns mock data.

import { createAuthenticatedFunction } from "@utils/creators/auth.creator";
import { AIService } from "@services/ai.service";
import type { ProcessAIChatRequest, ProcessAIChatResponse } from "./processAIChat.dto";

const aiService = new AIService();

export const processAIChat = createAuthenticatedFunction<ProcessAIChatRequest, ProcessAIChatResponse>(
  async (data, context) => {
    const userId = context.auth.uid;
    const result = await aiService.processUserMessage(data.message, userId);
    
    return {
      service: result.service,
      summary: result.summary,
      timeSlots: result.timeSlots,
      estimatedPrice: result.estimatedPrice,
    };
  },
  // CONTEXT: Pass CallableOptions to support secrets for AI API keys
  // Example: { secrets: ["OPENAI_API_KEY"] }
);
