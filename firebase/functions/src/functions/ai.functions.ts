import { createAuthenticatedFunction } from "../utils/creators/auth.creator";
import { AIService } from "../services/ai.service";

const aiService = new AIService();

export const processAIChat = createAuthenticatedFunction(async (data: { message: string }, context) => {
  const userId = context.auth.uid;
  const result = await aiService.processUserMessage(data.message, userId);
  
  return {
    service: result.service,
    summary: result.summary,
    timeSlots: result.timeSlots,
    estimatedPrice: result.estimatedPrice,
  };
});
