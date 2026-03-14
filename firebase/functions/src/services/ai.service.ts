import { ServiceType } from "../models/provider.model";
import { TimeSlot } from "../models/job.model";

export interface AIProcessResult {
  service: ServiceType;
  summary: string;
  timeSlots: TimeSlot[];
  estimatedPrice?: number;
}

export class AIService {
  async processUserMessage(message: string, userId: string): Promise<AIProcessResult> {
    // TODO: Implement actual AI processing (OpenAI/Gemini)
    // For now, return mock data
    
    return {
      service: "plumbing",
      summary: "Customer needs plumbing service for a leaking sink",
      timeSlots: this.generateTimeSlots(),
      estimatedPrice: 200,
    };
  }

  private generateTimeSlots(): TimeSlot[] {
    const now = new Date();
    
    return [
      {
        start: new Date(now.getTime() + 60 * 60 * 1000), // 1 hour from now
        end: new Date(now.getTime() + 2 * 60 * 60 * 1000),
      },
      {
        start: new Date(now.getTime() + 4 * 60 * 60 * 1000), // 4 hours from now
        end: new Date(now.getTime() + 6 * 60 * 60 * 1000),
      },
      {
        start: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
        end: new Date(now.getTime() + 26 * 60 * 60 * 1000),
      },
    ];
  }
}
